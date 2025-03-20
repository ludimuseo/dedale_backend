import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import Alert from '@/app/components/ui/Alert'
import { FormEdit } from '@/app/components/ui/FormEdit'
import { PlaceType } from '@/types'

import { getInputPlaceConfig } from '../forms/FormPlace/configPlace/getInputPlaceConfig'

const getInput = getInputPlaceConfig

const PLacesEdit: FC = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState<PlaceType | null>(null)
  const [errors] = useState<Record<string, string[] | undefined>>({})
  const [isModified] = useState(false)

  useEffect(() => {
    setFormData({
      id: 'e976b47a-4b65-4b82-986f-21c965c5f521',
      clientId: 'client_001',
      medalId: 'medal_001',
      content: {
        image: ['https://example.com/louvre.jpg'],
        type: 'museum',
      },
      address: {
        address: 'Rue de Rivoli',
        postal: '75001',
        city: 'Paris',
        country: 'France',
      },
      name: {
        fr: 'Musée du Louvre',
        en: 'Louvre Museum',
      },
      coords: {
        lat: 48.8606,
        lon: 2.3376,
        isLocationRequired: true,
      },
      description: {
        standard: {
          fr: "Le musée du Louvre est le plus grand musée d'art du monde.",
          en: "The Louvre Museum is the world's largest art museum.",
        },
        falc: {
          fr: "Le Louvre est un grand musée avec beaucoup d'art.",
          en: 'The Louvre is a big museum with lots of art.',
          falcCertified: 'certified_user_001',
          userId: 'user_001',
          status: {
            isValidate: true,
            isCertified: true,
            certifiedDate: '2023-01-15',
            isCorrected: false,
          },
        },
      },
      audio: {
        standard: {
          fr: 'audio/louvre_fr.mp3',
          en: 'audio/louvre_en.mp3',
        },
        falc: {
          fr: 'audio/louvre_falc_fr.mp3',
          en: 'audio/louvre_falc_en.mp3',
        },
      },
      status: {
        isActive: false,
        isPublished: true,
      },
    })
  }, [id])

  const handleSubmit = () => {
    console.log('handleSubmit')
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleChange', e.target.value)
  }
  const resetForm = () => {
    console.log('resetForm')
  }
  return (
    <>
      {formData && (
        <div className="container relative mx-auto">
          <Alert />
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href="/">Accueil</a>
              </li>
              <li>
                <a href="/places">Lieux</a>
              </li>
            </ul>
          </div>

          <FormEdit
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            isModified={isModified}
            handleChange={handleChange}
            errors={errors}
            inputs={getInput}
            datas={formData}
          />
        </div>
      )}
    </>
  )
}

export { PLacesEdit }
