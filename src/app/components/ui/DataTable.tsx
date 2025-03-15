import '@style/root.scss'

import React from 'react'

import { PlaceIcon } from './icons/PlaceIcon'
import Pagination from './Pagination'
import SearchInput from './SearchInput'

interface Column<T> {
  header: string
  accessor: keyof T
  isLink?: boolean
  link?: string
}

type ActionType = 'edit' | 'location' | 'delete'

interface Action<T> {
  type: ActionType
  onClick: (row: T) => Promise<void> | void
}

interface DataTableProps<T> {
  columns: Column<T>[] | null
  data: T[] | null
  isLoading: boolean
  actions?: Action<T>[]
  previousPage: () => void
  nextPage: () => void
  disablePrevious: boolean
  disableNext: boolean
  currentPage: number
  search?: () => void
}

function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  isLoading,
  actions,
  nextPage,
  previousPage,
  disablePrevious,
  disableNext,
  currentPage,
  search,
}: DataTableProps<T>) {
  if (!columns || !data) {
    return <div>Invalid data or columns</div>
  }

  const actionColumn: Column<T> = {
    header: 'Actions',
    accessor: 'actions' as keyof T,
  }

  const columnsWithActions = actions ? [...columns, actionColumn] : columns

  const getNestedValue = (obj: T, path: string): unknown => {
    return path
      .toString()
      .split('.')
      .reduce((acc: unknown, key: string) => {
        if (acc && typeof acc === 'object' && key in acc) {
          return (acc as Record<string, unknown>)[key]
        }
        return ''
      }, obj)
  }

  const tableContainerStyle = {
    maxHeight: 'calc(77vh - var(--headerHeight))',
  }
  const tableHeadStyle = {
    boxShadow: '0 0px 2px 0 rgb(0 0 0 / 0.05)',
  }

  const getLink = (row: T, linkTemplate: string): string => {
    return linkTemplate.replace(/{{(.*?)}}/g, (_, path) => {
      return String(getNestedValue(row, String(path)))
    })
  }

  return (
    <div className="relative">
      {search && (
        <div className="mb-5 flex">
          <SearchInput onSearch={search} />
        </div>
      )}
      <div
        style={tableContainerStyle}
        className="w-100 select-text overflow-auto">
        <table className="table rounded-none bg-base-100 shadow-md">
          <thead
            style={tableHeadStyle}
            className="sticky top-0 z-10 bg-gray-200 dark:bg-slate-700 dark:text-slate-200">
            <tr>
              {columnsWithActions.map((col, index: number) => (
                <th
                  key={index}
                  className={
                    col.header === 'Actions'
                      ? 'sticky right-0 z-10 bg-gray-300 text-center'
                      : ''
                  }>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              data.map((row, rowIndex) => (
                <tr key={typeof row.id === 'string' ? row.id : rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex}>
                      {col.isLink && col.link ? (
                        <a href={getLink(row, col.link)}>
                          {
                            getNestedValue(
                              row,
                              col.accessor.toString()
                            ) as React.ReactNode
                          }
                        </a>
                      ) : (
                        <>
                          {col.header !== 'status' &&
                            (getNestedValue(
                              row,
                              col.accessor.toString()
                            ) as React.ReactNode)}
                          {col.header === 'status' &&
                          getNestedValue(row, col.accessor.toString()) ===
                            true ? (
                            <div className="rounded-full p-1 text-green-400">
                              <div className="size-2 rounded-full bg-current"></div>
                            </div>
                          ) : (
                            ''
                          )}
                          {col.header === 'status' &&
                          getNestedValue(row, col.accessor.toString()) ===
                            false ? (
                            <div className="rounded-full p-1 text-gray-500">
                              <div className="size-2 rounded-full bg-current"></div>
                            </div>
                          ) : (
                            ''
                          )}
                        </>
                      )}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className="sticky right-0 flex min-w-40 border-l-2 border-gray-100 bg-white">
                      <div className="m-auto">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => {
                              void action.onClick(row)
                            }}
                            className="focus:shadow-outline group mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 transition-colors duration-150 hover:bg-gray-200">
                            {action.type === 'edit' && (
                              <svg
                                className="h-6 w-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                                />
                              </svg>
                            )}
                            {action.type === 'location' && <PlaceIcon />}
                            {action.type === 'delete' && (
                              <svg
                                className="h-5 w-5 text-gray-800 group-hover:text-red-500 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <span className="loading loading-ring loading-lg m-auto flex"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className="absolute"
        style={{ bottom: '-60px', left: '0', right: '0', width: '100%' }}>
        <Pagination
          onPreviousPageEvent={previousPage}
          onNextPageEvent={nextPage}
          disablePrevious={disablePrevious}
          disableNext={disableNext}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default DataTable
