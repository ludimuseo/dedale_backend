import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ApiResponse<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  isSuccess: boolean | null
  setRequestHandle: Dispatch<SetStateAction<boolean>> | null
}

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

function useFetch<T>(
  path: string,
  method: MethodType = 'GET',
  body: object = {},
  immediate: boolean = true
): ApiResponse<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [isRequestHandled, setRequestHandle] = useState<boolean>(immediate)
  const [controller] = useState<AbortController>(new AbortController())

  useEffect(() => {
    if (isRequestHandled) setRequestHandle(false)
  }, [isRequestHandled])

  useEffect(() => {
    if (!isRequestHandled) return

    const url = [import.meta.env.VITE_API_BASE_URL, path].join('')

    const requestData: RequestInit = {
      signal:
        import.meta.env.NODE_ENV === 'production' ? controller.signal : null,
      body: JSON.stringify(body),
      method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    const fetchData = async () => {
      setIsLoading(true)
      setData(null)

      try {
        const response: Response = await fetch(url, requestData)
        if (!response.ok) {
          // const json: Response = await response.json()
          await response.json().then(({ message }: { message?: string }) => {
            throw new Error(
              message ?? `HTTP error | Status: ${String(response.status)}`
            )
          })
        }
        setError(null)
        const jsonData = (await response.json()) as T
        setData(jsonData)
        setIsSuccess(true)
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred'
        setError(errorMessage)
        setIsSuccess(false)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()

    return () => {
      controller.abort()
      setIsSuccess(null)
      setIsLoading(false)
      setData(null)
      setError(null)
    }
  }, [body, controller, isRequestHandled, method, path])

  return { data, isLoading, error, isSuccess, setRequestHandle }
}

export { useFetch }
