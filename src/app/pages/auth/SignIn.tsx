import { EnvelopeIcon, Input, LockIcon } from '@component/index'
import { useAppDispatch, useFetch, useInput, useNotification } from '@hook'
import { signIn } from '@service/redux/slices/reducerAuth'
import {
  type FC,
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
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

  const { data, isLoading, error, isSuccess, setRequestHandle } =
    useFetch<AuthUserType>(
      '/auth/login',
      'POST',
      { email: email.value, password: password.value },
      false
    )

  const callback = useCallback(() => {
    if (isSuccess && !!data) {
      dispatch(
        signIn({
          token: data.token,
          user: data,
        })
      )
      push(t('success.signin'))
    } else if (!isSuccess && !data) {
      push(t(`error.${error ?? '4XX'}`), { type: 'error' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data])

  // After the page loads, have the Email input focused for immediate typing
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  useEffect(() => {
    if (isSuccess == null) return
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      !isLoading &&
      !!setRequestHandle &&
      !email.errors.length &&
      !password.errors.length
    ) {
      setRequestHandle(true)
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
