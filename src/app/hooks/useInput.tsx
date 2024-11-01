import { type ChangeEvent, useState } from 'react'
import { z, type ZodString } from 'zod'

interface OptionsProps {
  name: string
  type: 'text' | 'email' | 'password' | 'date' | 'search' | 'tel' | 'url'
}

const schema: Record<string, ZodString> = {
  date: z.string().trim().date(),
  email: z.string().trim().toLowerCase().min(1).email(),
  password: z.string().trim().min(6).max(20),
}

const useInput = (initialValue: string, options: OptionsProps) => {
  const [value, setValue] = useState<string>(initialValue)
  const [errors, errorsSetValue] = useState<string[]>([])
  const inputType: OptionsProps['type'] = options.type

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
    errors,
    name: options.name,
    onChange: handleChange,
    uid: options.name,
    value,
  }
}

export default useInput
