import { useEffect, useRef, useState } from 'react'

interface UseSpeechToTextProps {
  lang?: string
  continuous?: boolean
}

interface UseSpeechToTextReturn {
  text: string
  isListening: boolean
  startListening: () => void
  stopListening: () => void
  reset: () => void
}
const useSpeechRecognition = ({
  lang = 'fr-FR',
  continuous = false,
}: UseSpeechToTextProps = {}): UseSpeechToTextReturn => {
  const [text, setText] = useState<string>('')
  const [isListening, setIsListening] = useState<boolean>(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      !SpeechRecognition
    ) {
      alert('Speech Recognition API not supported in this browser.')
      return
    }
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.lang = lang
    recognitionRef.current.continuous = continuous
    recognitionRef.current.interimResults = true
    recognitionRef.current.onstart = () => {
      setIsListening(true)
    }
    recognitionRef.current.onend = () => {
      setIsListening(false)
    }
    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = ''
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setText(transcript)
    }

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.log('Speech recognition error', event.error)
    }
  }, [lang, continuous])

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }

  const reset = () => {
    if (recognitionRef.current) {
      setText('') // Clear previous text
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  return { text, isListening, startListening, stopListening, reset }
}

export { useSpeechRecognition }
