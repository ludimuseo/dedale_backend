import { useAppDispatch, useAppSelector } from '@hook'
import React from 'react'

import {
  closeAlert,
  StateAlert,
} from '@/app/services/redux/slices/reducerAlert'
import { State } from '@/types'

const Alert: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(closeAlert())
  }

  const { isActive, message, type }: StateAlert = useAppSelector(
    (state: State) => state.alert
  )

  return (
    <>
      {isActive && (
        <div role="alert" className={`alert alert-${type} sticky top-0 z-50`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
          <div>
            <button onClick={handleClick} className="btn btn-ghost btn-sm">
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
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Alert
