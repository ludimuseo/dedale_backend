import {
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router'

import DataTable from '@/app/components/ui/DataTable'
import { db } from '@/firebase/firebase'
import { ClientType } from '@/types'

const Users: FC = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<ClientType[]>([])
  const [filteredUsers, setFilteredUsers] = useState<Record<string, unknown>[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const [pages, setPages] = useState<DocumentSnapshot[]>([])

  const pageSize = 10 // Number of items per page

  const fetchUsers = async (pageIndex: number) => {
    setIsLoading(true)

    try {
      let usersQuery

      // Define the query for the given page
      if (pageIndex === 0) {
        // Initial page
        usersQuery = query(
          collection(db, 'clients'),
          orderBy('client.company.name'),
          limit(pageSize)
        )
      } else {
        // Other pages
        const startPoint = pages[pageIndex - 1]
        usersQuery = query(
          collection(db, 'clients'),
          orderBy('client.company.name'),
          startAfter(startPoint),
          limit(pageSize)
        )
      }

      const querySnapshot = await getDocs(usersQuery)

      // Save the last document for pagination
      if (querySnapshot.docs.length > 0) {
        const newPages = [...pages]
        newPages[pageIndex] = querySnapshot.docs[querySnapshot.docs.length - 1]
        setPages(newPages)
      }

      // Format and set user data
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        collection: 'clients',
        ...(doc.data().client as ClientType),
      }))
      setFilteredUsers(
        usersData.map((user) => ({
          ...user,
        }))
      )
      setUsers(usersData)
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1)
    void fetchUsers(currentPage + 1)
  }

  const previousPage = () => {
    if (currentPage > 0) {
      const prevIndex = currentPage - 1
      setCurrentPage(prevIndex)
      void fetchUsers(prevIndex)
    }
  }

  const search = (searchTerm: string) => {
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
  }

  const handleCreationClick = () => {
    void navigate('/form/client')
  }

  // useEffect(() => {
  //   void fetchUsers(0)
  // }, [fetchUsers])

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

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between align-middle">
        <h2>Users</h2>
        <button
          onClick={handleCreationClick}
          className="btn btn-outline btn-primary">
          Nouveau
        </button>
      </div>
      <DataTable
        columns={columns}
        data={filteredUsers}
        actions={actions as []}
        isLoading={isLoading}
        nextPage={nextPage}
        previousPage={previousPage}
        disableNext={users.length < pageSize} // Disable "Next" if fewer items than pageSize
        disablePrevious={currentPage === 0}
        currentPage={currentPage} // Disable "Previous" on the first page
        search={void search}
      />
    </div>
  )
}

export { Users }
