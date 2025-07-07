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

  const clearValue = () => {
    setValue(initialValue) // Reset state to initial value
    localStorage.removeItem(key) // Remove from localStorage
  }

  return [value, setValue, clearValue] as const
}

export { useLocalStorage }
