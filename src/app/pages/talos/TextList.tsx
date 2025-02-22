import { collection, getDocs, query, where } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { CheckIcon } from '@/app/components/ui/icons/CheckIcon'
import { PencilIcon } from '@/app/components/ui/icons/PencilIcon' // Import de l'icône
import { db } from '@/firebase/firebase'
import {
  EntityWithId,
  JourneyType,
  PieceType,
  PlaceType,
  StepType,
} from '@/types'

const TextList: FC = () => {
  const [places, setPlaces] = useState<
    (PlaceType & { id: string; collection: string })[]
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
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null)
  const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null)
  const [activeStepId, setActiveStepId] = useState<string | null>(null)
  const navigate = useNavigate()

  // Fetch places on component mount
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const q = query(
          collection(db, 'places'),
          where('clientId', '==', 'rHkYsm0B5EKnI9H8gC3y')
        )
        const querySnapshot = await getDocs(q)
        const placeData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
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

  // Fetch journeys for a specific place
  const fetchJourneys = async (placeId: string) => {
    try {
      const q = query(
        collection(db, 'journeys'),
        where('placeId', '==', placeId)
      )
      const querySnapshot = await getDocs(q)
      const journeyData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        collection: 'journeys',
        ...(doc.data() as JourneyType),
      }))
      setJourneys(journeyData)
      setActivePlaceId(placeId)
    } catch (error) {
      console.error('Error fetching journeys:', error)
    }
  }

  // Fetch steps for a specific journey
  const fetchSteps = async (journeyId: string) => {
    try {
      const q = query(
        collection(db, 'steps'),
        where('journeyId', '==', journeyId)
      )
      const querySnapshot = await getDocs(q)
      const stepData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        collection: 'steps',
        ...(doc.data() as StepType),
      }))
      setSteps(stepData.sort((a, b) => a.stage.stepNumber - b.stage.stepNumber))
      setActiveJourneyId(journeyId)
    } catch (error) {
      console.error('Error fetching steps:', error)
    }
  }

  // Fetch pieces for a specific step
  const fetchPieces = async (stepId: string) => {
    try {
      const q = query(collection(db, 'pieces'), where('stepId', '==', stepId))
      const querySnapshot = await getDocs(q)
      const pieceData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        collection: 'pieces',
        ...(doc.data() as PieceType),
      }))
      setPieces(pieceData)
      setActiveStepId(stepId)
    } catch (error) {
      console.error('Error fetching pieces:', error)
    }
  }

  // Navigate to the edit page
  const handleNavigate = (
    formData: EntityWithId<PlaceType | JourneyType | StepType | PieceType>
  ) => {
    void navigate('/interface', { state: { formData } })
  }

  return (
    <div className="bg-white p-6 text-gray-900">
      <h1 className="mb-8 text-4xl font-bold">Liste des Textes</h1>

      {/* Liste des Lieux */}
      <section aria-labelledby="places-heading">
        <h2
          id="places-heading"
          className="mb-6 font-inclusive text-3xl font-semibold">
          Lieux
        </h2>
        <div className="space-y-4">
          {places.map((place) => (
            <article
              key={place.id}
              className={`rounded-lg bg-gray-50 p-4 shadow-sm`}>
              <h3 className="mb-2 font-inclusive text-2xl font-medium">
                {place.name.fr}
              </h3>

              <p className="mb-4 text-gray-700">
                {place.description.falc.fr.length > 100
                  ? `${place.description.falc.fr.slice(0, 150)}...`
                  : place.description.falc.fr}
              </p>

              {/* IMAGE */}
              <div className="flex gap-4">
                <div className="avatar">
                  <div className="w-14 rounded-xl font-inclusive">
                    <img src={place.content.image[0]} />
                  </div>
                </div>

                <button
                  onClick={() => void fetchJourneys(place.id)}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-inclusive text-white hover:bg-blue-700"
                  aria-label={`Voir les parcours pour ${place.name.fr}`}>
                  Voir les Parcours
                </button>
                {place.description.falc.status.isCertified ? (
                  <button
                    className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white"
                    aria-label={`Texte validé pour ${place.name.fr}`}>
                    <CheckIcon className="h-8 w-8" />
                    <span className="font-inclusive">Texte validé</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleNavigate(place)
                    }}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-inclusive text-white hover:bg-green-700"
                    aria-label={`Corriger ${place.name.fr}`}>
                    <PencilIcon />
                    <span>Corriger</span>
                  </button>
                )}
                {/* <button
                  className="btn-disabled flex items-center">
                  <img className="rounded-lg" src={place.content.image[0]} alt={place.name.fr} />

                </button> */}
              </div>

              {/* Liste des Parcours */}
              {activePlaceId === place.id && (
                <section
                  aria-labelledby={`journeys-${place.id}-heading`}
                  className="mt-4">
                  <h4
                    id={`journeys-${place.id}-heading`}
                    className="mb-4 font-inclusive text-xl font-semibold">
                    Parcours
                  </h4>
                  <div className="space-y-4">
                    {journeys.map((journey) => (
                      <article
                        key={journey.id}
                        className="rounded-lg bg-white p-4 shadow-sm">
                        <h5 className="mb-2 font-inclusive text-lg font-medium">
                          {journey.name.fr}
                        </h5>
                        {/* IMAGE */}
                        <div className="flex gap-4">
                          <div className="avatar">
                            <div className="w-14 rounded-xl">
                              <img src={journey.content.image[0]} />
                            </div>
                          </div>
                          <button
                            onClick={() => void fetchSteps(journey.id)}
                            className="rounded-lg bg-blue-600 px-4 py-2 font-inclusive text-white hover:bg-blue-700"
                            aria-label={`Voir les étapes pour ${journey.name.fr}`}>
                            Voir les Étapes
                          </button>
                          {journey.description.falc.status.isCertified ? (
                            <button
                              className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white"
                              aria-label={`Texte validé pour ${journey.name.fr}`}>
                              <CheckIcon className="h-8 w-8" />
                              <span className="font-inclusive">
                                Texte validé
                              </span>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                handleNavigate(journey)
                              }}
                              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-inclusive text-white hover:bg-green-700"
                              aria-label={`Corriger ${journey.name.fr}`}>
                              <PencilIcon />
                              <span className="font-inclusive">Corriger</span>
                            </button>
                          )}
                        </div>

                        {/* Liste des Étapes */}
                        {activeJourneyId === journey.id && (
                          <section
                            aria-labelledby={`steps-${journey.id}-heading`}
                            className="mt-4">
                            <h6
                              id={`steps-${journey.id}-heading`}
                              className="mb-4 font-inclusive text-lg font-semibold">
                              Étapes
                            </h6>
                            <div className="space-y-4">
                              {steps.map((step) => (
                                <article
                                  key={step.id}
                                  className="rounded-lg bg-gray-50 p-4 shadow-sm">
                                  <h6 className="text-md mb-2 font-inclusive font-medium">
                                    Etape n° {step.stage.stepNumber} :{' '}
                                    {step.name.fr}
                                  </h6>
                                  <div className="flex gap-4">
                                    <div className="avatar">
                                      <div className="w-14 rounded-xl">
                                        <img src={step.content.image[0]} />
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => void fetchPieces(step.id)}
                                      className="rounded-lg bg-blue-600 px-4 py-2 font-inclusive text-white hover:bg-blue-700"
                                      aria-label={`Voir les œuvres pour ${step.name.fr}`}>
                                      Voir les Œuvres
                                    </button>
                                    {step.description.falc.status
                                      .isCertified ? (
                                      <button
                                        className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white"
                                        aria-label={`Texte validé pour ${step.name.fr}`}>
                                        <CheckIcon className="h-8 w-8" />
                                        <span className="font-inclusive">
                                          Texte validé
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          handleNavigate(step)
                                        }}
                                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                        aria-label={`Corriger ${step.name.fr}`}>
                                        <PencilIcon />
                                        <span className="font-inclusive">
                                          Corriger
                                        </span>
                                      </button>
                                    )}
                                  </div>

                                  {/* Liste des Œuvres */}
                                  {activeStepId === step.id && (
                                    <section
                                      aria-labelledby={`pieces-${step.id}-heading`}
                                      className="mt-4">
                                      <h6
                                        id={`pieces-${step.id}-heading`}
                                        className="text-md mb-4 font-inclusive font-semibold">
                                        Œuvres
                                      </h6>
                                      <div className="space-y-4">
                                        {pieces.map((piece) => (
                                          <article
                                            key={piece.id}
                                            className="rounded-lg bg-white p-4 shadow-sm">
                                            <h6 className="mb-2 font-inclusive text-sm font-medium">
                                              {piece.name.fr}
                                            </h6>
                                            {/* IMAGE */}
                                            <div className="flex gap-4">
                                              <div className="avatar">
                                                <div className="w-14 rounded-xl">
                                                  <img
                                                    src={
                                                      journey.content.image[0]
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              {piece.description.falc.status
                                                .isCertified ? (
                                                <button
                                                  className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white"
                                                  aria-label={`Texte validé pour ${piece.name.fr}`}>
                                                  <CheckIcon className="h-8 w-8" />
                                                  <span className="font-inclusive">
                                                    Texte validé
                                                  </span>
                                                </button>
                                              ) : (
                                                <button
                                                  onClick={() => {
                                                    handleNavigate(piece)
                                                  }}
                                                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                                  aria-label={`Corriger ${place.name.fr}`}>
                                                  <PencilIcon />
                                                  <span className="font-inclusive">
                                                    Corriger
                                                  </span>
                                                </button>
                                              )}
                                            </div>
                                          </article>
                                        ))}
                                      </div>
                                    </section>
                                  )}
                                </article>
                              ))}
                            </div>
                          </section>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export { TextList }
