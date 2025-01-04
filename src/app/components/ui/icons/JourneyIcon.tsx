import React from 'react'

const JourneyIcon = (): React.JSX.Element => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className={`fill-current`}>
        <path
          fill="#000"
          d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm6.93 8.36c-.53-.53-1.33-.8-2.13-.6-1.42.36-3.37 1.3-5.53 3.14-1.37 1.18-2.34 2.48-2.95 3.62-.4.75-.6 1.45-.62 2.14a2 2 0 1 0 3.87-.64c.15-.64.6-1.36 1.34-2.12 1.28-1.3 3.09-2.26 4.35-2.56a2 2 0 0 1 2.67 1.53 2 2 0 0 0 3.87-.64c-.08-.84-.45-1.65-1.07-2.27zM4 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
        />
        <circle cx="4" cy="20" r="2" fill="#000" />
      </svg>
    </>
  )
}

export { JourneyIcon }
