import Input from '@/app/components/input'
import EnvelopeIcon from '@/assets/icons/EnvelopeIcon'
import LockIcon from '@/assets/icons/LockIcon'
import { type FC, type FormEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useInput from '@/app/hooks/useInput'
import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth'
import { auth, db } from '@/firebase/firebase'
import { useAppDispatch } from '@/app/hooks'
import { signIn } from '@/app/stores/slices/reducerAuth'
import { type User } from '@/types/user'
import { doc, getDoc } from 'firebase/firestore'
// import { type Location, type NavigateFunction, useLocation, useNavigate } from 'react-router-dom'
import SpinIcon from '@/assets/icons/SpinIcon'
import { type AppDispatch } from '@/app/stores'
import {
  // type Location,
  type NavigateFunction,
  // useLocation,
  useNavigate,
} from 'react-router-dom'

const AuthSignIn: FC = () => {
  const { t } = useTranslation()
  // const location: Location = useLocation()
  const navigate: NavigateFunction = useNavigate()
  const dispatch: AppDispatch = useAppDispatch()
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
              uid: user.uid,
              role: null,
              email: user.email,
              displayName: user.displayName,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
            } satisfies User)
          )
          // console.info('state: ', location)
          // const test = () => navigate(state)
          // test()
          // navigate('/auth/signin', { replace: true, state: { from: location } })
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
          label={t('label.password')}
          placeholder={t('input.placeholder.password')}
          type={showPassword ? 'text' : 'password'}
          {...password}
          icon={
            <>
              <LockIcon
                className="cursor-pointer hover:animate-pulse"
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
              />
            </>
          }
        />

        {/* Button Submit */}
        <button type="submit" className="flex justify-center gap-x-2">
          {t('button.signin')}
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
