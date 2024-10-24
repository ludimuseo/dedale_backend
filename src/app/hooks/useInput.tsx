import { type ChangeEvent, useState } from 'react'
import { z, type ZodString } from 'zod'

type initialValueType = string | number | boolean

interface optionsType {
  name: string
  type: string
}

const schema: Record<string, ZodString> = {
  email: z.string().trim().toLowerCase().min(1).email(),
  password: z.string().trim().min(6).max(20),
  date: z.string().trim().date(),
}

const useInput = (initialValue: initialValueType, options: optionsType) => {
  const [value, setValue] = useState<typeof initialValue>(initialValue)
  const [errors, errorsSetValue] = useState<string[]>([])
  const currentType: string = options.type

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const zod: ZodString = schema[currentType]
    const data: string = target.value
    setValue(data)
    const result = zod.safeParse(data)
    if (result.success) {
      errorsSetValue([])
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
