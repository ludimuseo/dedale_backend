import { useEffect, useState } from 'react'

interface ApiResponse<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

export function useFetch<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error | Status: ${String(response.status)}`)
        }
        const jsonData = (await response.json()) as T
        setData(jsonData)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [url])

  return { data, isLoading, error }
}
