import { signIn } from '@service/redux/slices/reducerAuth'
import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { type FC, type FormEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import Input from '@/app/components/ui/input'
import { useAppDispatch } from '@/app/hooks'
import useInput from '@/app/hooks/useInput'
import EnvelopeIcon from '@/app/icons/EnvelopeIcon'
import LockIcon from '@/app/icons/LockIcon'
import SpinIcon from '@/app/icons/SpinIcon'
import { auth, db } from '@/firebase/firebase'
import { type User } from '@/types/user'

const AuthSignIn: FC = () => {
  const { t } = useTranslation()
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useAppDispatch()
  const emailRef = useRef<HTMLInputElement | null>(null)
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
          console.info(customData)
          // Dispatch to User Store
          dispatch(
            signIn({
              displayName: user.displayName,
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
              role: null,
              uid: user.uid,
            } satisfies User)
          )
          navigate('/', { replace: true })
        })
        .catch((err: unknown) => {
          console.error(err)
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
          icon={
            <>
              <EnvelopeIcon />
            </>
          }
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
            <>
              <LockIcon
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
              />
            </>
          }
        />
        {/* Button Submit */}
        <button type="submit" className="btn--primary">
          {t('button.signin')}&nbsp;
          {showLoader && (
            <span className="motion-safe:animate-spin">
              <SpinIcon className="-scale-x-[1]" />
            </span>
          )}
        </button>
      </form>
    </>
  )
}

export default AuthSignIn
