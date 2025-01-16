import {
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import DataTable from '@/app/components/ui/dataTable'
import { db } from '@/firebase/firebase'
import { ClientType } from '@/types'

const Users: FC = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<ClientType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const [pages, setPages] = useState<DocumentSnapshot[]>([])

  const pageSize = 10 // Number of items per page

  const formatData = (data: ClientType[]) => {
    return data.map((el) => ({
      id: el.id,
      name: el.company.name || 'Nom non défini',
      contact: el.contact.name || 'Non spécifié',
      email: el.contact.email || 'Non spécifié',
      phone: el.contact.tel || 'Non spécifié',
    }))
  }

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
      setUsers(formatData(usersData))
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

  useEffect(() => {
    void fetchUsers(0)
  }, [])

  const columns = [
    { header: 'Entreprise ou société', accessor: 'name' },
    { header: 'Contact', accessor: 'contact' },
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
    <div>
      <h2 className="mb-5">Users</h2>
      <DataTable
        columns={columns}
        data={users}
        actions={actions}
        isLoading={isLoading}
        nextPage={nextPage}
        previousPage={previousPage}
        disableNext={users.length < pageSize} // Disable "Next" if fewer items than pageSize
        disablePrevious={currentPage === 0}
        currentPage={currentPage} // Disable "Previous" on the first page
      />
    </div>
  )
}

export { Users }
