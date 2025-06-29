import { useState } from 'react'

import { MessageType } from '@/types'

export const useFormMessage = () => {
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  return {
    message,
    setMessage,
  }
}
