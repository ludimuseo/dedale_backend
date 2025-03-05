import { EnvelopeIcon, Input, LockIcon } from '@component'
import { useInput, useNotification } from '@hook'
import { type FC, type FormEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'


const AuthSignIn: FC = () => {
    const { t } = useTranslation()
    // const navigate = useNavigate()
    const { notify } = useNotification()
    // const dispatch = useAppDispatch()
    const emailRef = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showLoader,] = useState<boolean>(false)
    const email = useInput('', { name: 'signin-email', type: 'email' })
    const password = useInput('', { name: 'signin-password', type: 'password' })

    // After the page loads, have the Email input focused for immediate typing
    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    // const execute = async () => {
    //     setShowLoader(true)
    //     // FIREBASE LOGIN ATTEMPT
    //     return await signInWithEmailAndPassword(auth, email.value, password.value)
    // }

    //   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     if (!email.errors.length && !password.errors.length) {
    //       execute()
    //         .then(async ({ user }: UserCredential) => {
    //           // Firestore database
    //           const docRef = doc(db, 'users', user.uid)
    //           const docSnapshot = await getDoc(docRef)
    //           const customData = docSnapshot.data()

    //           // Dispatch to User Store
    //           dispatch(
    //             signIn({
    //               email: user.email,
    //               emailVerified: user.emailVerified,
    //               photoURL: user.photoURL,
    //               pseudo: String(customData?.pseudo),
    //               role: String(customData?.role),
    //               uid: user.uid,
    //             } satisfies User)
    //           )
    //           void navigate('/', { replace: true })
    //           notify(t('success.signin'), { type: 'success' })
    //         })
    //         .catch(() => {
    //           notify(t('error.4XX'), { type: 'error' })
    //         })
    //         .finally(() => {
    //           setShowLoader(false)
    //         })
    //     }
    //   }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!email.errors.length && !password.errors.length) {

            fetch('https://dev.ludimuseo.fr:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            }).then((res) => res.json())
                .then((data) => {
                    if (data) {
                        console.log("FETCH:", data)
                        notify(t('success.signin'), { type: 'success' })
                    } else {
                        console.log("Erreur de connexion!")
                        notify(t('error.4XX'), { type: 'error' })

                    }
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