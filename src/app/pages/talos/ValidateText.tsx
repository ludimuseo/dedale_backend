import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'

import { TextValidation } from '@/app/components/talos/textValidation'
import { db } from '@/firebase/firebase'
import { JourneyType, PieceType, PlaceType, StepType } from '@/types'

type CollectionType = PlaceType | JourneyType | StepType | PieceType

const ValidateText: FC = () => {
  const [places, setPlaces] = useState<
    (PlaceType & { docId: string; collection: string })[]
  >([])
  const [journeys, setJourneys] = useState<
    (JourneyType & { id: string; collection: string })[]
  >([])
  const [steps, setSteps] = useState<
    (StepType & { id: string; collection: string })[]
  >([])
  const [pieces, setPieces] = useState<
    (PieceType & { id: string; collection: string })[]
  >([])
  const [preview, setPreview] = useState(false)
  const [falcTextPreview, setFalcTextPreview] = useState<string[]>([])
  const [standardTextPreview, setStandardTextPreview] = useState<string[]>([])
  const [previuosFalctextPreview, setPreviousFalcTextPreview] = useState<
    string[]
  >([])

  //TODO use redux store

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const q = query(
          collection(db, 'places'),
          where('clientId', '==', 'rHkYsm0B5EKnI9H8gC3y'),
          where('description.falc.status.isCertified', '==', true)
        )
        const querySnapshot = await getDocs(q)
        const placeData = querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          collection: 'places',
          ...(doc.data() as PlaceType),
        }))
        setPlaces(placeData)
      } catch (error) {
        console.error('Error fetching places:', error)
      }
    }
    void fetchPlaces()
  }, [])

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const q = query(
          collection(db, 'journeys'),
          where('placeId', '==', 'RJ7rPw80tgvj4gtGtglI'),
          where('description.falc.status.isCertified', '==', true)
        )
        const querySnapshot = await getDocs(q)
        const journeyData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          collection: 'journeys',
          ...(doc.data() as JourneyType),
        }))
        setJourneys(journeyData)
      } catch (error) {
        console.error('Error fetching journeys:', error)
      }
    }
    void fetchJourneys()
  }, [])

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const q = query(
          collection(db, 'steps'),
          where('journeyId', '==', 'emOHYhNiAgLvIYPLj4UA')
        )
        const querySnapshot = await getDocs(q)
        const stepData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          collection: 'steps',
          ...(doc.data() as StepType),
        }))
        setSteps(
          stepData.sort((a, b) => a.stage.stepNumber - b.stage.stepNumber)
        )
      } catch (error) {
        console.error('Error fetching steps:', error)
      }
    }
    void fetchSteps()
  }, [])

  useEffect(() => {
    const fetchPieces = async () => {
      const stepIds = [
        'nQtvfh14GuuYnWt9X0Dm',
        'XiVzuYfLRgKYOs0wHx21',
        'r933BUeocAFIIuByqfWl',
        'ne4rHG8atOiDNtvXRh2S',
        '0aitLsTLusg7yzY17g8s',
        'VG2x5gNhrNcyLLgToWs6',
        '0B8KfwFNE0BkAxrt0KSa',
        'tXsxk6xW6b6puf20O2tY',
        'r933BUeocAFIIuByqfWl',
        'ZByEOcft1JijHEMsy0y9',
        'V7cPJf2pPnxNDacVHZDF',
        '6ZM1K5TpbR8BNtGASOXA',
        'DkunHVFtdmSNhlVLuudq',
        'E1aUyQhttQyO4oavhwBa',
      ]
      try {
        const q = query(
          collection(db, 'pieces'),
          where('stepId', 'in', stepIds)
        )
        const querySnapshot = await getDocs(q)
        const pieceData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          collection: 'pieces',
          ...(doc.data() as PieceType),
        }))
        setPieces(pieceData)
      } catch (error) {
        console.error('Error fetching pieces:', error)
      }
    }
    void fetchPieces()
  }, [])

  //convertir la date
  const formatDate = (timestamp: Timestamp) => {
    // Convertir Timestamp en Date
    const date = timestamp.toDate()

    // Formater la date (exemple : "dd/MM/yyyy")
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const handleTextPreview = (collection: CollectionType) => {
    setPreview(true)
    const splitStandardText =
      collection.description.standard.fr.split(/(?<=[.!?:])\s+/)
    const splitPreviousFalcText =
      collection.description.falc.fr.split(/(?<=[.!?:])\s+/)
    const splitFalcText =
      collection.description.falc.falcCertified.split(/(?<=[.!?:])\s+/)
    setFalcTextPreview(splitFalcText)
    setPreviousFalcTextPreview(splitPreviousFalcText)
    setStandardTextPreview(splitStandardText)
  }

  return (
    <>
      {!preview ? (
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th className="font-inclusive text-2xl">Catégorie</th>
                <th className="font-inclusive text-2xl">Lieu</th>
                <th className="font-inclusive text-2xl">Titre</th>
                <th className="font-inclusive text-2xl">Validé le</th>
                <th className="font-inclusive text-2xl">Apreçu</th>
              </tr>
            </thead>
            <tbody>
              {places.map((place) => (
                <tr key={place.docId}>
                  <td>
                    <span className="font-inclusive text-xl">Lieu</span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl">
                      {place.name.fr}
                    </span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl">
                      {place.name.fr}
                    </span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl">
                      {place.description.falc.status.certifiedDate
                        ? formatDate(
                            place.description.falc.status.certifiedDate
                          )
                        : 'Non disponible'}
                    </span>
                  </td>
                  <td>
                    <span
                      className="cursor-pointer font-inclusive text-xl hover:underline"
                      onClick={() => {
                        handleTextPreview(place)
                      }}>
                      Accéder
                    </span>
                  </td>
                </tr>
              ))}
              {journeys.map((journey) => (
                <tr key={journey.id}>
                  <td>
                    <span className="font-inclusive text-xl">Parcours</span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl"></span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl">
                      {journey.name.fr}
                    </span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl">
                      {journey.description.falc.status.certifiedDate
                        ? formatDate(
                            journey.description.falc.status.certifiedDate
                          )
                        : 'Non disponible'}
                    </span>
                  </td>
                  <td>
                    <span
                      className="cursor-pointer font-inclusive text-xl hover:underline"
                      onClick={() => {
                        handleTextPreview(journey)
                      }}>
                      Accéder
                    </span>
                  </td>
                </tr>
              ))}
              {steps.map((step) => (
                <tr key={step.id}>
                  <td>
                    <span className="font-inclusive text-xl">
                      Etape n° {step.stage.stepNumber}
                    </span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl"></span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl">
                      {step.name.fr}
                    </span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl">
                      {step.description.falc.status.certifiedDate
                        ? formatDate(step.description.falc.status.certifiedDate)
                        : 'Non validé'}
                    </span>
                  </td>
                  <td>
                    <span
                      className="cursor-pointer font-inclusive text-xl hover:underline"
                      onClick={() => {
                        handleTextPreview(step)
                      }}>
                      Accéder
                    </span>
                  </td>
                </tr>
              ))}
              {pieces.map((piece) => (
                <tr key={piece.id}>
                  <td>
                    <span className="font-inclusive text-xl">
                      Indice {pieces.indexOf(piece) + 1}
                    </span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl"></span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl">
                      {piece.name.fr}
                    </span>
                  </td>
                  <td>
                    <span className="font-inclusive text-xl">
                      {piece.description.falc.status.certifiedDate
                        ? formatDate(
                            piece.description.falc.status.certifiedDate
                          )
                        : 'Non validé'}
                    </span>
                  </td>
                  <td>
                    <span
                      className="cursor-pointer font-inclusive text-xl hover:underline"
                      onClick={() => {
                        handleTextPreview(piece)
                      }}>
                      Accéder
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="">
          <button
            className="btn btn-primary mb-4 ml-10 mt-4"
            onClick={() => {
              setPreview(false)
            }}>
            Retour
          </button>
          {/* <div className="hero bg-base-100">
            <div className="max-w-xl">
              <p className="select-text py-4 font-inclusive">
                <h1 className="mb-4">Texte Certifié FALC</h1>
                {falcTextPreview.map((sentence) => {
                  return (
                    <p className="font-inclusive text-xl leading-[2]">
                      {sentence}
                    </p>
                  )
                })}
              </p>
            </div>
          </div>
          <div className="hero bg-base-200">
            <div className="max-w-xl">
              <p className="select-text py-4 font-inclusive">
                <h1 className="mb-4">Texte Facile a lire</h1>
                {previuosFalctextPreview.map((sentence) => {
                  return (
                    <p className="font-inclusive text-xl leading-[2]">
                      {sentence}
                    </p>
                  )
                })}
              </p>
            </div>
          </div>

          <div className="hero bg-base-300">
            <div className="max-w-xl">
              <p className="select-text py-4 font-inclusive">
                <h1 className="mb-4">Texte Standard</h1>
                {standardTextPreview.map((sentence) => {
                  return <p className="text-xl leading-[2]">{sentence}</p>
                })}
              </p>
            </div>
          </div> */}
          <div className="grid grid-cols-3 justify-center gap-2">
            <TextValidation
              title="Texte Certifié FALC"
              sentence={falcTextPreview}
              version="falcCertified"
              onValidationClick={() => {
                'hey'
              }}
            />
            <TextValidation
              title="Texte Facile a lire"
              sentence={previuosFalctextPreview}
              version="falc"
              onValidationClick={() => {
                'hey'
              }}
            />
            <TextValidation
              title="Texte Standard"
              sentence={standardTextPreview}
              version="standard"
              onValidationClick={() => {
                'hey'
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export { ValidateText }
