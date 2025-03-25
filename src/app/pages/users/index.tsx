import { useFetch } from '@hook'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import DataTable from '@/app/components/ui/DataTable'
import { ClientType } from '@/types'

interface FetchResponse {
  page: number
  totalPages: number
  data: ClientType[]
}

const Users: FC = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<ClientType[]>([])

  /* const [filteredUsers, setFilteredUsers] = useState<Record<string, unknown>[]>(
    []
  ) */
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, error } = useFetch<FetchResponse>(
    `/fakeDatas/users/page_${currentPage.toString()}.json`
  )
  console.log(data, isLoading, error)

  useEffect(() => {
    if (data?.data) {
      setUsers(data.data)
    }
  }, [data])

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const previousPage = () => {
    if (currentPage > 0) {
      const prevIndex = currentPage - 1
      setCurrentPage(prevIndex)
    }
  }

  /* const search = (searchTerm: string) => {
    const tempUsers = users.map((user) => ({ ...user }))
    if (!searchTerm.trim()) {
      setFilteredUsers(tempUsers)
      return
    }
    const lowerCasedTerm = searchTerm.toLowerCase()

    const filteredData = tempUsers.filter((user: ClientType) => {
      return (
        user.company.name.toLowerCase().includes(lowerCasedTerm) ||
        user.contact.email.toLowerCase().includes(lowerCasedTerm)
      )
    })
    setFilteredUsers(filteredData)
  } */

  const handleCreationClick = () => {
    void navigate('/form/client')
  }

  const columns = [
    { header: '', accessor: 'isActive' },
    { header: 'Entreprise ou société', accessor: 'company.name' },
    { header: 'Contact', accessor: 'contact.name' },
    { header: 'Email', accessor: 'contact.email' },
    { header: 'Téléphone', accessor: 'contact.tel' },
  ]

  const actions = [
    {
      type: 'edit',
      onClick: async (el: ClientType) => {
        try {
          await navigate(`/users/${el.id}`)
        } catch (error) {
          console.error('Error during navigation:', error)
        }
      },
    },
    {
      type: 'location',
      onClick: (id: string) => {
        console.log(`Location: ${id}`)
      },
    },
    {
      type: 'delete',
      onClick: (id: string) => {
        console.log(`Delete: ${id}`)
      },
    },
  ]
  console.log(users)

  return (
    <div className="container mx-auto mt-5">
      <div className="mb-5 flex justify-between align-middle">
        <h2>Users</h2>
        <button
          onClick={handleCreationClick}
          className="btn btn-outline btn-primary">
          Nouveau
        </button>
      </div>
      {data && (
        <DataTable
          columns={columns}
          nextPage={nextPage}
          previousPage={previousPage}
          disableNext={data.page === data.totalPages}
          //data={users}
          disablePrevious={data.page === 1}
          currentPage={data.page}
          actions={actions as []}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export { Users }
