import { EnvelopeIcon, Input, LockIcon } from '@component/index'
import { useAppDispatch, useInput, useNotification } from '@hook/index'
import { signIn } from '@service/redux/slices/reducerAuth'
import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { type FC, type FormEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type NavigateFunction, useNavigate } from 'react-router'

import { auth, db } from '@/firebase/firebase'
import type { UserRole } from '@/types'

const AuthSignIn: FC = () => {
  const { t } = useTranslation()
  const navigate: NavigateFunction = useNavigate()
  const { push } = useNotification()
  const dispatch = useAppDispatch()
  const emailRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const email = useInput('', { name: 'signin-email', type: 'email' })
  const password = useInput('', { name: 'signin-password', type: 'password' })

  // After the page loads, have the Email input focused for immediate typing
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.errors.length && !password.errors.length) {
      const execute = async () => {
        setShowLoader(true)
        // FIREBASE LOGIN ATTEMPT
        return await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        )
      }
      execute()
        .then(async ({ user }: UserCredential) => {
          // Firestore database
          const docRef = doc(db, 'users', user.uid)
          const docSnapshot = await getDoc(docRef)
          const customData = docSnapshot.data()
          console.info('CUSTOMDATA', customData)

          // Dispatch to User Store
          dispatch(
            signIn({
              email: user.email ?? 'NoEmail',
              // photoURL: user.photoURL,
              pseudo: String(customData?.pseudo),
              role: customData?.role as UserRole,
              token: '',
            })
          )
          void navigate('/', { replace: true })
        })
        .catch(() => {
          push(t('error.4XX'), { type: 'error' })
        })
        .finally(() => {
          setShowLoader(false)
        })
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
          {showLoader && <span className="loading loading-spinner"></span>}
        </button>
      </form>
    </>
  )
}

export { AuthSignIn }
