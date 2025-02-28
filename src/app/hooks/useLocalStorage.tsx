import { useEffect, useState } from 'react'

const useLocalStorage = (key: string, initialValue: unknown) => {
  const [value, setValue] = useState<unknown>(() => {
    try {
      const storedValue = localStorage.getItem(key)
      if (storedValue) {
        return JSON.parse(storedValue) as unknown
      } else {
        return initialValue
      }
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    // storing element
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

export { useLocalStorage }
