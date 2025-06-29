import { useEffect, useState } from 'react'

interface ApiResponse<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

export function useDataFetch<T>(fetchFn: () => Promise<T>): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetchFn()
        setData(result)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [fetchFn])

  return { data, isLoading, error }
}
