import '@/assets/styles/root.scss'

import React from 'react'

interface Column {
  header: string
  accessor: string
}

interface DataTableProps {
  columns: Column[] | null
  data: Record<string, unknown>[] | null
  isLoading: boolean
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, isLoading }) => {
  if (!columns || !data) {
    return <div>Invalid data or columns</div>
  }

  const tableContainerStyle = {
    height: `calc(100vh - var(--headerHeight) - 130px)`,
  }
  const tableHeadStyle = {
    boxShadow: `0 0px 2px 0 rgb(0 0 0 / 0.05)`,
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
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
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
