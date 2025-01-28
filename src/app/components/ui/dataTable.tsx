import '@/assets/styles/root.scss'

import React from 'react'

import { PlaceIcon } from './icons/PlaceIcon'
import Pagination from './pagination'
import SearchInput from './searchInput'

interface Column {
  header: string
  accessor: string
}

type ActionType = 'edit' | 'location' | 'delete'

interface Action {
  type: ActionType
  onClick: (id: string | number) => void
}

interface DataTableProps {
  columns: Column[] | null
  data: Record<string, unknown>[] | null
  isLoading: boolean
  actions?: Action[]
  previousPage?: () => void
  nextPage?: () => void
  disablePrevious: boolean
  disableNext: boolean
  currentPage: number
  search?: () => void
}

const DataTable: React.FC<DataTableProps> = ({
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
}) => {
  if (!columns || !data) {
    return <div>Invalid data or columns</div>
  }

  const actionColumn: Column = {
    header: 'Actions',
    accessor: 'actions',
  }

  const columnsWithActions = actions ? [...columns, actionColumn] : columns

  const tableContainerStyle = {
    maxHeight: 'calc(80vh - var(--headerHeight))',
  }
  const tableHeadStyle = {
    boxShadow: '0 0px 2px 0 rgb(0 0 0 / 0.05)',
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
              {columnsWithActions.map((col, index) => (
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
                <tr key={row.id || rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex}>
                      {col.accessor !== 'isActive' && row[col.accessor]}
                      {col.accessor === 'isActive' && row[col.accessor] ? (
                        <div className="rounded-full p-1 text-green-400">
                          <div className="size-2 rounded-full bg-current"></div>
                        </div>
                      ) : (
                        ''
                      )}
                      {col.accessor === 'isActive' && !row[col.accessor] ? (
                        <div className="rounded-full p-1 text-gray-500">
                          <div className="size-2 rounded-full bg-current"></div>
                        </div>
                      ) : (
                        ''
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
                              action.onClick(row.id)
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
