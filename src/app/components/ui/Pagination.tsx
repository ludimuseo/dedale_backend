import '@style/root.scss'

import React from 'react'

interface PaginationProps {
  onPreviousPageEvent: () => void
  onNextPageEvent: () => void
  disablePrevious: boolean
  disableNext: boolean
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({
  onPreviousPageEvent,
  onNextPageEvent,
  disablePrevious,
  disableNext,
  currentPage,
}) => {
  const handlePreviousClick = () => {
    if (!disablePrevious) {
      onPreviousPageEvent()
    }
  }

  const handleNextClick = () => {
    if (!disableNext) {
      onNextPageEvent()
    }
  }

  return (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div className="flex flex-1 justify-between sm:justify-end">
        <span className="isolate inline-flex rounded-md shadow-sm">
          <button
            disabled={disablePrevious}
            type="button"
            onClick={handlePreviousClick}
            className={`${disablePrevious ? 'cursor-not-allowed opacity-40' : 'hover:bg-gray-50'} relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-10`}>
            <span className="sr-only">Previous</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <div className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300">
            {currentPage + 1}
          </div>
          <button
            type="button"
            disabled={disableNext}
            onClick={handleNextClick}
            className={`${disableNext ? 'cursor-not-allowed opacity-40' : 'hover:bg-gray-50'} relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10`}>
            <span className="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </span>
      </div>
    </div>
  )
}

export default Pagination
