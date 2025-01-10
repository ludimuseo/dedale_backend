import { type FC } from 'react'
import { useNavigate } from 'react-router'

import DataTable from '@/app/components/ui/dataTable'
import { useFetch } from '@/app/hooks/useFetch'

interface User {
  username: string
  name: string
  email: string
  phone: string
}

const Users: FC = () => {
  const { data, isLoading, error } = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  )
  const navigate = useNavigate()

  if (error) return <p>Erreur : {error}</p>

  const columns = [
    { header: 'Entreprise ou société', accessor: 'username' },
    { header: 'Contact', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Téléphone', accessor: 'phone' },
  ]

  const actions = [
    {
      type: 'edit',
      onClick: async (id: string) => {
        try {
          await navigate(`/users/${id}`)
        } catch (error) {
          console.error('Error during navigation:', error)
        }
      },
    },
    {
      type: 'location',
      onClick: (id: string) => {
        console.log(`location ${id}`)
      },
    },
    {
      type: 'delete',
      onClick: (id: string) => {
        console.log(`Delete ${id}`)
      },
    },
  ]

  return (
    <>
      <div>
        <h2 className="mb-5">Users</h2>
        <DataTable
          columns={columns}
          data={data}
          actions={actions}
          isLoading={isLoading}
        />
      </div>
    </>
  )
}

export { Users }
