import { createContext, type ReactNode, useState } from 'react'

const LoaderContext = createContext({})

const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <LoaderContext.Provider value={{ loading, setLoading }}>
        {children}
      </LoaderContext.Provider>
    </>
  )
}

export { LoaderContext, LoaderProvider }
