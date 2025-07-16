import { useState } from 'react'

import { InputValue } from '@/types'

export function useInputChange<
  T extends Record<
    string,
    InputValue | { latitude: number; longitude: number }
  >,
>(initialValues: T) {
  const [formData, setFormData] = useState<T>(initialValues)
  const handleInputChange = (name: keyof T, value: InputValue) => {
    const prevValue = formData[name]

    // Ensure the value matches the expected type
    const newValue =
      typeof prevValue === 'number'
        ? Number(value)
        : typeof prevValue === 'boolean'
          ? value === 'true'
          : value

    // Type assertion to ensure we're updating a valid field
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue as T[keyof T],
    }))
    console.log('USEINPUTCHANGE formData: ', formData)
  }
  return {
    formData,
    setFormData,
    handleInputChange,
  }
}
