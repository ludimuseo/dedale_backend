import Input from '@/app/components/input'
import EnvelopeIcon from '@/assets/icons/EnvelopeIcon'
import LockIcon from '@/assets/icons/LockIcon'
import { type FC, type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useInput from '@/app/hooks/useInput'
import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth'
import { auth, db } from '@/firebase/firebase'
import { useAppDispatch } from '@/app/hooks'
import { signIn } from '@/app/stores/authReducer'
import { type User } from '@/types/user'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import SpinIcon from '@/assets/icons/SpinIcon'

const AuthSignIn: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const email = useInput('', { name: 'signin-email', type: 'email' })
  const password = useInput('', { name: 'signin-password', type: 'password' })

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
          // const userData:
          //   | DocumentData
          //   | { pseudo: string; profile: string; isAdmin: boolean }
          //   | undefined = docSnapshot.data()
          console.info(docSnapshot.data())

          dispatch(
            signIn({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,

              // // Firestore remote database infos
              // // username: userData?.pseudo,
              // // role: userData?.profile,
              // // isAdmin: userData?.isAdmin,
            } satisfies User)
          )
          navigate('/', { viewTransition: true })
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
          {...email}>
          {{
            icon: (
              <>
                <EnvelopeIcon />
              </>
            ),
          }}
        </Input>

        {/* Input Password */}
        <Input
          label={t('label.password')}
          placeholder={t('input.placeholder.password')}
          type={showPassword ? 'text' : 'password'}
          {...password}>
          {{
            icon: (
              <>
                <LockIcon
                  className="cursor-pointer hover:animate-pulse"
                  onClick={() => {
                    setShowPassword(!showPassword)
                  }}
                />
              </>
            ),
          }}
        </Input>

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
