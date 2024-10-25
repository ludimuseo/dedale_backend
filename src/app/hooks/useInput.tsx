import { type ChangeEvent, useState } from 'react'
import { z, type ZodString } from 'zod'

// type initialValueType = string | number | boolean

interface OptionsType {
  name: string
  type: 'text' | 'email' | 'password'
}

const schema: Record<string, ZodString> = {
  email: z.string().trim().toLowerCase().min(1).email(),
  password: z.string().trim().min(6).max(20),
  date: z.string().trim().date(),
}

const useInput = (initialValue: string, options: OptionsType) => {
  const [value, setValue] = useState<string>(initialValue)
  const [errors, errorsSetValue] = useState<string[]>([])
  const inputType: string = options.type

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const zod: ZodString = schema[inputType]
    const data: string = target.value
    setValue(data)
    const result = zod.safeParse(data)
    if (result.success) {
      errorsSetValue([])
      setValue(result.data)
    } else {
      errorsSetValue(result.error.errors.map((v) => v.message))
    }
  }

  return {
    value,
    errors,
    uid: options.name,
    name: options.name,
    onChange: handleChange,
  }
}

export default useInput
