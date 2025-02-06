import { doc, getDoc } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { z } from 'zod'

import { Input } from '@/app/components'
import Alert from '@/app/components/ui/alert'
import { db } from '@/firebase/firebase'
import { ClientType } from '@/types'

const ClientSchema = z.object({
  isActive: z.boolean(),
  company: z.object({
    name: z.string().min(1, "Le nom de l'entreprise est requis."),
    siret: z
      .string()
      .regex(/^\d+$/, 'Le SIRET doit contenir uniquement des chiffres.'),
    tva: z.string().optional(),
  }),
  contact: z.object({
    name: z.string().min(1, 'Le nom du contact est requis.'),
    email: z.string().email('Email invalide.'),
    tel: z.string().min(10, 'Numéro de téléphone invalide.'),
    note: z.string().optional(),
  }),
  address: z.object({
    address: z.string().min(1, "L'adresse est requise."),
    postal: z.string().regex(/^\d{5}$/, 'Code postal invalide.'),
    city: z.string().min(1, 'La ville est requise.'),
    country: z.string().min(1, 'Le pays est requis.'),
  }),
})

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

interface AlertProps {
  isActive: boolean
  message: string
  type?: Alert
  close?: () => void
}

const UsersEdit: FC = () => {
  const { id, type } = useParams()
  const [data, setData] = useState<ClientType | null>(null)
  const [formData, setFormData] = useState<ClientType | null>(null)
  const [isModified, setIsModified] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({})
  const [alert, setAlert] = useState<AlertProps>({
    isActive: false,
    message: '',
  })

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const user = await fetchUserById(id)
        setData(user)
        setFormData(JSON.parse(JSON.stringify(user)) as ClientType)
      }

      void fetchUser()
    }
  }, [id, type])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target

    const newValue = type === 'checkbox' ? checked : value

    const keys = name.split('.')

    const updatedData = { ...formData }
    let temp: Record<string, unknown> = updatedData

    for (let i = 0; i < keys.length - 1; i++) {
      temp = temp[keys[i]] as Record<string, unknown>
    }
    temp[keys[keys.length - 1]] = newValue

    setFormData(updatedData as ClientType)

    setIsModified(JSON.stringify(updatedData) !== JSON.stringify(data))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!id) return
    e.preventDefault()
    if (!formData) return

    const result = ClientSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {}
      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.')
        fieldErrors[path] = [issue.message]
      })
      setErrors(fieldErrors)
    }
    editUser(id)
  }

  const editUser = (userId: string) => {
    console.log('todo', userId)
    /* try {
      const userRef = doc(db, 'clients', userId)
      await updateDoc(userRef, formData)

      setAlert({
        isActive: true,
        message: 'Le client a été mis à jour',
        type: 'success',
      })

      console.log('doc updated => ', userRef)
    } catch (error) {
      setAlert({
        isActive: true,
        message: 'Erreur lors de la mise à jour du client',
        type: 'error',
      })

      console.error(error)
    } */
  }

  const resetForm = () => {
    setFormData(data)
    setIsModified(false)
  }

  return (
    <>
      {formData && (
        <div className="container relative mx-auto">
          <Alert
            close={() => {
              setAlert((prev) => ({ ...prev, isActive: false }))
            }}
            isActive={alert.isActive}
            message={alert.message}
            type={alert.type}
          />
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
                      errors={errors['company.name'] ?? []}
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
                      errors={errors['company.siret'] ?? []}
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
                      errors={errors['company.tva'] ?? []}
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
                      errors={errors['company.name'] ?? []}
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
                      errors={errors['contact.email'] ?? []}
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
                      errors={errors['contact.tel'] ?? []}
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
                      errors={errors['contact.note'] ?? []}
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
                      errors={errors['address.address'] ?? []}
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
                      errors={errors['address.postal'] ?? []}
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
                      errors={errors['address.city'] ?? []}
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
                      errors={errors['address.country'] ?? []}
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
