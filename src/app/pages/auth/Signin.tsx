import { EnvelopeIcon, Input, LockIcon } from '@component/index'
import { useFetch, useInput } from '@hook'
import { useAppDispatch, useNotification } from '@hook/index'
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
import { type NavigateFunction, useNavigate } from 'react-router'

import type { User } from '@/types'

const AuthSignIn: FC = () => {
  const { t } = useTranslation()
  const navigate: NavigateFunction = useNavigate()
  const { push } = useNotification()
  const dispatch = useAppDispatch()
  const emailRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const email = useInput('', { name: 'signin-email', type: 'email' })
  const password = useInput('', { name: 'signin-password', type: 'password' })
  const { data, isLoading, error, setHandleRequest } = useFetch<unknown>(
    '/auth/login',
    'POST',
    {
      email: email.value,
      password: password.value,
    },
    false
  )

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const callback = useCallback(() => {
    return {
      loginSuccess: () => {
        dispatch(signIn(data as User))
        push(t('success.signin'), { type: 'success' })
        void navigate('/', { replace: true })
      },
      loginFailure: (error: unknown) => {
        push(typeof error == 'string' ? error : t('error.4XX'), {
          type: 'error',
        })
      },
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data && !error) callback().loginSuccess()
    if (error) callback().loginFailure(error)
  }, [callback, data, error])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.errors.length && !password.errors.length) {
      setHandleRequest(true)
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
