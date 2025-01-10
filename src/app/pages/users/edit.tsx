import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { useFetch } from '@/app/hooks/useFetch'

interface User {
  username: string
  name: string
  email: string
  phone: string
}

const UsersEdit: FC = () => {
  const { id } = useParams()
  const { data, isLoading } = useFetch<User>(
    id ? `https://jsonplaceholder.typicode.com/users/${id}` : ''
  )

  const [formData, setFormData] = useState<User | null>(null)
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, value } = e.target
      const updatedFormData = { ...formData, [name]: value }
      setFormData(updatedFormData)

      const isFormModified = Object.keys(updatedFormData).some(
        (key) => updatedFormData[key as keyof User] !== data[key as keyof User]
      )
      setIsModified(isFormModified)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted!')
  }

  const resetForm = () => {
    setFormData(data)
    setIsModified(false)
  }

  return (
    <>
      {!isLoading ? (
        <div>
          <div className="breadcrumbs mb-5 text-sm">
            <ul>
              <li>
                <a href="/">Accueil</a>
              </li>
              <li>
                <a href="/users">Utilisateurs</a>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  Nom de l'entreprise ou société
                </span>
              </div>
              <input
                type="text"
                name="name"
                id="companyName"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
                value={formData?.name}
                onChange={handleChange}
                aria-describedby="companyNameHelp"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Contact</span>
              </div>
              <input
                type="text"
                name="username"
                id="contact"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
                value={formData?.username}
                onChange={handleChange}
                aria-describedby="contactHelp"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@domain.com"
                className="input input-bordered w-full"
                required
                value={formData?.email}
                onChange={handleChange}
                aria-describedby="emailHelp"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Téléphone</span>
              </div>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="0123456789"
                className="input input-bordered w-full"
                required
                value={formData?.phone}
                onChange={handleChange}
                aria-describedby="phoneHelp"
              />
            </label>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={resetForm}
                disabled={!isModified}
                type="button"
                className="btn btn-outline">
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isModified}>
                Valider
              </button>
            </div>
          </form>
        </div>
      ) : (
        <span className="loading loading-spinner loading-lg"></span>
      )}
    </>
  )
}

export { UsersEdit }
