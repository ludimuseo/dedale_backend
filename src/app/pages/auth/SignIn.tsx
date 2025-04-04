import { EnvelopeIcon, Input, LockIcon } from '@component/index'
import { useAppDispatch, useInput, useNotification } from '@hook'
import { signIn } from '@service/redux/slices/reducerAuth'
import { type FC, type FormEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { User } from '@/types'

type AuthUserType = User & { token: string }

const AuthSignIn: FC = () => {
  const { t } = useTranslation()
  const { push } = useNotification()
  const dispatch = useAppDispatch()

  const emailRef = useRef<HTMLInputElement>(null)
  const email = useInput('', { name: 'signin-email', type: 'email' })

  const password = useInput('', { name: 'signin-password', type: 'password' })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // After the page loads, have the Email input focused for immediate typing
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const executeSignIn = async () => {
    setIsLoading(true)

    const url: string = [import.meta.env.VITE_API_BASE_URL, '/auth/login'].join(
      ''
    )
    const requestOptions: RequestInit = {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    try {
      const response: Response = await fetch(url, requestOptions)
      if (!response.ok) {
        await response.json().then(({ message }: { message?: string }) => {
          throw new Error(
            message ?? `HTTP error | Status: ${String(response.status)}`
          )
        })
      }
      const jsonData = (await response.json()) as AuthUserType
      dispatch(
        signIn({
          token: jsonData.token,
          user: jsonData,
        })
      )
      push(t('success.signin'))
    } catch (err: unknown) {
      const errorMessage: string = err instanceof Error ? err.message : '404'
      push(t(`error.${errorMessage}`), { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      !isLoading &&
      email.value.length &&
      password.value.length &&
      !email.errors.length &&
      !password.errors.length
    ) {
      void executeSignIn()
    }
  }

  return (
    <>
      <form id="form-signin" onSubmit={handleSubmit}>
        {/* Input Email */}
        <Input
          insideForm={true}
          className="form--input"
          label={t('label.email')}
          placeholder={t('input.placeholder.email')}
          type="email"
          ref={emailRef}
          {...email}
          icon={<EnvelopeIcon />}
        />
        {/* Input Password */}
        <Input
          insideForm={true}
          className="form--input"
          label={t('label.password')}
          placeholder={t('input.placeholder.password')}
          type={showPassword ? 'text' : 'password'}
          {...password}
          icon={
            <LockIcon
              onClick={() => {
                setShowPassword(!showPassword)
              }}
            />
          }
        />
        {/* Button Submit */}
        <button type="submit" className="btn btn-primary mt-8">
          {t('button.signin')}&nbsp;
          {isLoading && <span className="loading loading-spinner"></span>}
        </button>
      </form>
    </>
  )
}

export { AuthSignIn }
