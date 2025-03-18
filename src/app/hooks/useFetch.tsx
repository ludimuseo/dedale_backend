import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ApiResponse<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  setHandleRequest: Dispatch<SetStateAction<boolean>>
}

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

function useFetch<T>(
  path: string,
  method: MethodType = 'GET',
  body: object = {},
  immediate = true
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [handleRequest, setHandleRequest] = useState<boolean>(immediate)
  const [controller] = useState<AbortController>(new AbortController())

  useEffect(() => {
    if (handleRequest) setHandleRequest(false)
  }, [handleRequest])

  useEffect(() => {
    if (!handleRequest) return

    const url = [import.meta.env.VITE_API_BASE_URL, path].join('')
    console.info('useFetch -> fetchData: ', url)

    const requestData: RequestInit = {
      signal:
        import.meta.env.NODE_ENV === 'production' ? controller.signal : null,
      body: JSON.stringify(body),
      method,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      setData(null)

      try {
        const response = await fetch(url, requestData)
        if (!response.ok) {
          await response.json().then(({ message }: { message?: string }) => {
            throw new Error(
              message ?? `HTTP error | Status: ${String(response.status)}`
            )
          })
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

    return () => {
      // Abort connection if still in progress
      controller.abort()
      setError(null)
      setIsLoading(false)
    }
  }, [body, handleRequest, controller, method, path])

  return { data, isLoading, error, setHandleRequest }
}

export { useFetch }
