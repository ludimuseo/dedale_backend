import Input from '@/app/components/input'
import EnvelopeIcon from '@/assets/icons/EnvelopeIcon'
import LockIcon from '@/assets/icons/lockIcon'
import { type FC, FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useInput from '@/app/hooks/useInput'

const AuthSignIn: FC = () => {
  const { t } = useTranslation()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const email = useInput('', { name: 'signin-email', type: 'email' })
  const password = useInput('', { name: 'signin-password', type: 'password' })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.errors.length && !password.errors.length) {
      console.info('CORRECT')
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
        <button type="submit">{t('button.signin')}</button>
      </form>
    </>
  )
}

export default AuthSignIn
