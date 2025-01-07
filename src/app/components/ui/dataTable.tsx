import '@/assets/styles/root.scss'

import React from 'react'

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
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  isLoading,
  actions,
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
    height: 'calc(100vh - var(--headerHeight) - 130px)',
  }
  const tableHeadStyle = {
    boxShadow: '0 0px 2px 0 rgb(0 0 0 / 0.05)',
  }
  return (
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
                  <td key={colIndex}>{row[col.accessor]}</td>
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
                              className="h-5 w-5 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                fillRule="evenodd"
                                d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          {action.type === 'location' && (
                            <svg
                              className="h-5 w-5 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                fillRule="evenodd"
                                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
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
  )
}

export default DataTable
