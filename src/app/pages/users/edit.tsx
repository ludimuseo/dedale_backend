import { doc, getDoc } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Input } from '@/app/components'
import { db } from '@/firebase/firebase'
import { ClientType } from '@/types'

const fetchUserById = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'clients', userId)
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists()) {
      const userData = userDoc.data().client as ClientType
      return userData
    } else {
      console.warn(`Le document avec l'ID ${userId} n'existe pas.`)
      return null
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

const UsersEdit: FC = () => {
  const { id } = useParams()
  const [data, setData] = useState<ClientType | null>(null)
  const [formData, setFormData] = useState<ClientType | null>(null)
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserById(id)
      setData(user)
      setFormData(JSON.parse(JSON.stringify(user)) as ClientType)
    }

    void fetchUser()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target
    console.log(name, type, value, checked)

    const newValue = type === 'checkbox' ? checked : value

    const keys = name.split('.')

    const updatedData = { ...formData }
    let temp: Record<string, unknown> = updatedData

    for (let i = 0; i < keys.length - 1; i++) {
      temp = temp[keys[i]]
    }
    temp[keys[keys.length - 1]] = newValue

    setFormData(updatedData)

    const isEqual = (a: string, b: string) =>
      JSON.stringify(a) === JSON.stringify(b)
    setIsModified(!isEqual(updatedData, data))
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
      {formData && (
        <div className="container mx-auto">
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
            <div className="flex justify-between">
              <h2 className="mb-5">{formData.company.name}</h2>
              <input
                type="checkbox"
                name="isActive"
                onChange={handleChange}
                checked={formData.isActive || false}
                className="toggle toggle-success ml-auto"
              />
            </div>

            <div className="card mx-0 bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Entreprise</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <Input
                      insideForm
                      uid="companyName"
                      name="company.name"
                      placeholder=""
                      label="Nom"
                      errors={[]}
                      value={formData.company.name || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      insideForm
                      uid="siret"
                      name="company.siret"
                      placeholder=""
                      label="Siret"
                      errors={[]}
                      value={formData.company.siret || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      insideForm
                      uid="siret"
                      name="company.tva"
                      placeholder=""
                      label="Tva"
                      errors={[]}
                      value={formData.company.tva || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mx-0 bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">Contact</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <Input
                      insideForm
                      uid="contactName"
                      name="contact.name"
                      placeholder=""
                      label="Nom"
                      errors={[]}
                      value={formData.contact.name || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      insideForm
                      uid="contactEmail"
                      name="contact.email"
                      placeholder=""
                      label="Email"
                      errors={[]}
                      value={formData.contact.email || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      insideForm
                      uid="contactEmail"
                      name="contact.email"
                      placeholder=""
                      label="Téléphone"
                      errors={[]}
                      value={formData.contact.tel || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      insideForm
                      uid="contactNote"
                      name="contact.note"
                      placeholder=""
                      label="Note"
                      errors={[]}
                      value={formData.contact.note || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mx-0 bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">Adresse</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <Input
                      insideForm
                      uid="addressAddress"
                      name="address.address"
                      placeholder=""
                      label="Adresse"
                      errors={[]}
                      value={formData.address.address || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      insideForm
                      uid="addressPostal"
                      name="address.postal"
                      placeholder=""
                      label="Code Postal"
                      errors={[]}
                      value={formData.address.postal || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      insideForm
                      uid="addressCity"
                      name="address.city"
                      placeholder=""
                      label="Ville"
                      errors={[]}
                      value={formData.address.city || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      insideForm
                      uid="addressCountry"
                      name="address.country"
                      placeholder=""
                      label="Pays"
                      errors={[]}
                      value={formData.address.country || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

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
      )}
    </>
  )
}

export { UsersEdit }
