import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import DataTable from '@/app/components/ui/DataTable'
import { useFetch } from '@/app/hooks/useFetch'
import { PlaceType } from '@/types'

interface FetchResponse {
  page: number
  totalPages: number
  data: PlaceType[]
}

const Places: FC = () => {
  const navigate = useNavigate()
  const [place, setPlace] = useState<PlaceType[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, error } = useFetch<FetchResponse>(
    `/fakeDatas/places/page_${currentPage.toString()}.json`
  )
  console.log(data, isLoading, error)

  useEffect(() => {
    if (data?.data) {
      setPlace(data.data)
    }
  }, [data])

  const columns = [
    { header: 'status', accessor: 'status.isActive' },
    { header: 'Nom', accessor: 'name.fr' },
    { header: 'Client', accessor: 'clientId' },
    { header: 'Nombre de parcours', accessor: 'clientId' },
    { header: 'Medaille', accessor: 'medalId' },
  ]

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const previousPage = () => {
    if (currentPage > 0) {
      const prevIndex = currentPage - 1
      setCurrentPage(prevIndex)
    }
  }

  const actions = [
    {
      type: 'edit',
      onClick: async (/* el: PlaceType */) => {
        try {
          // await navigate(`/places/${el.id}`)
          await navigate(`/`)
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

  const handleCreationClick = () => {
    void navigate('/form/place')
  }

  console.log(place)

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between align-middle">
        <h2>Places</h2>
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
          //data={place}
          disablePrevious={data.page === 1}
          currentPage={data.page}
          actions={actions as []}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export { Places }
