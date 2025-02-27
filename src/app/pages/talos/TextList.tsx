import { collection, getDocs, query, where } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { ArrowIcon } from '@/app/components/ui/icons/ArrowIcon'
import { CheckIcon } from '@/app/components/ui/icons/CheckIcon'
import { PencilIcon } from '@/app/components/ui/icons/PencilIcon'
import { db } from '@/firebase/firebase'
import {
  EntityWithId,
  JourneyType,
  PieceType,
  PlaceType,
  StepType,
} from '@/types'

const TextList: FC = () => {
  const [isPlacesOpen, setIsPlacesOpen] = useState(true)
  const [isJourneysOpen, setIsJourneysOpen] = useState(true)
  const [isStepsOpen, setIsStepsOpen] = useState(true)
  const [isPiecesOpen, setIsPiecesOpen] = useState(true)

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
    <div className="bg-white p-6 font-sans text-[#0A184D]">
      <h1 className="mb-8 text-4xl font-bold">Liste des Textes</h1>

      {/* Liste des Lieux */}
      <section aria-labelledby="places-heading">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2
              id="places-heading"
              className="flex-grow rounded-md bg-[#0A184D] pl-3 text-3xl font-semibold leading-relaxed text-white">
              Lieux
            </h2>
            <button
              onClick={() => {
                setIsPlacesOpen(!isPlacesOpen)
              }}
              className="bg-transparent px-4 py-2 text-white"
              aria-label={
                isPlacesOpen ? 'Masquer les lieux' : 'Afficher les lieux'
              }>
              <ArrowIcon isOpen={isPlacesOpen} />
            </button>
          </div>
          {isPlacesOpen &&
            places.map((place) => (
              <article
                key={place.id}
                className="rounded-md border-2 border-[#0A184D] bg-[#F4FDFF] px-6 py-4 text-[#0A184D] shadow-lg">
                <h3 className="my-1 text-3xl font-bold">{place.name.fr}</h3>

                <p className="mb-5">
                  {place.description.falc.fr.length > 100
                    ? `${place.description.falc.fr.slice(0, 150)}...`
                    : place.description.falc.fr}
                </p>
                {/* IMAGE */}
                <div className="mb-2 flex gap-5">
                  <div className="avatar">
                    <div className="w-16 cursor-pointer rounded-xl">
                      <img src={place.content.image[0]} alt={place.name.fr} />
                    </div>
                  </div>

                  <button
                    onClick={() => void fetchJourneys(place.id)}
                    className="duration-5 rounded-xl border-2 border-[#0A184D] bg-[#0A184D] px-6 py-4 text-xl text-white transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#ffffff] hover:text-[#0A184D]"
                    aria-label={`Voir les parcours pour ${place.name.fr}`}>
                    Voir les parcours
                  </button>
                  {place.description.falc.status.isCertified ? (
                    <button
                      className="flex items-center gap-3 rounded-xl border-2 border-[#22891F] bg-[#22891F] px-6 py-2 text-xl text-white"
                      aria-label={`Texte validé pour ${place.name.fr}`}>
                      <CheckIcon className="h-8 w-8" />
                      <span>Texte validé</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleNavigate(place)
                      }}
                      className="duration-5 flex items-center gap-3 rounded-xl border-2 border-[#0A184D] bg-[#bfdcfe] px-6 py-2 text-xl text-[#0A184D] transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#F4FDFF] hover:text-[#0A184D]"
                      aria-label={`Corriger ${place.name.fr}`}>
                      <PencilIcon />
                      <span>Corriger</span>
                    </button>
                  )}
                </div>
                {/* Liste des Parcours */}
                {activePlaceId === place.id && (
                  <section
                    aria-labelledby={`journeys-${place.id}-heading`}
                    className="mt-7 rounded-lg border-2 bg-[#ffffff] px-2 py-3">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <h4
                          id={`journeys-${place.id}-heading`}
                          className="flex-grow rounded-md bg-[#0A184D] pl-3 text-3xl font-semibold leading-relaxed text-white">
                          Parcours
                        </h4>
                        <button
                          onClick={() => {
                            setIsJourneysOpen(!isJourneysOpen)
                          }}
                          className="bg-transparent px-4 py-2 text-white"
                          aria-label={
                            isJourneysOpen
                              ? 'Masquer les parcours'
                              : 'Afficher les parcours'
                          }>
                          <ArrowIcon isOpen={isJourneysOpen} />
                        </button>
                      </div>
                      {isJourneysOpen &&
                        journeys.map((journey) => (
                          <article
                            key={journey.id}
                            className="m-4 rounded-xl border-2 border-[#0A184D] bg-[#F4FDFF] px-4 py-3 text-[#0A184D] shadow-md">
                            <h5 className="mb-3 text-2xl font-medium">
                              {journey.name.fr}
                            </h5>

                            {/* IMAGE */}
                            <div className="mb-2 flex gap-5">
                              <div className="avatar">
                                <div className="w-16 rounded-xl">
                                  <img src={journey.content.image[0]} />
                                </div>
                              </div>
                              <button
                                onClick={() => void fetchSteps(journey.id)}
                                className="duration-5 rounded-xl border-2 border-[#0A184D] bg-[#0A184D] px-6 py-4 text-xl text-white transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#ffffff] hover:text-[#0A184D]"
                                aria-label={`Voir les étapes pour ${journey.name.fr}`}>
                                Voir les étapes
                              </button>
                              {journey.description.falc.status.isCertified ? (
                                <button
                                  className="flex items-center gap-3 rounded-xl border-2 border-[#22891F] bg-[#22891F] px-6 py-2 text-xl text-white"
                                  aria-label={`Texte validé pour ${journey.name.fr}`}>
                                  <CheckIcon className="h-8 w-8" />
                                  <span>Texte validé</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    handleNavigate(journey)
                                  }}
                                  className="duration-5 flex items-center gap-3 rounded-xl border-2 border-[#0A184D] bg-[#bfdcfe] px-6 py-2 text-xl text-[#0A184D] transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#F4FDFF] hover:text-[#0A184D]"
                                  aria-label={`Corriger ${journey.name.fr}`}>
                                  <PencilIcon />
                                  <span>Corriger</span>
                                </button>
                              )}
                            </div>

                            {/* Liste des Étapes */}
                            {activeJourneyId === journey.id && (
                              <section
                                aria-labelledby={`steps-${journey.id}-heading`}
                                className="mt-7 rounded-lg border-2 bg-[#ffffff] px-2 py-3">
                                <div className="space-y-5">
                                  <div className="flex items-center justify-between">
                                    <h6
                                      id={`steps-${journey.id}-heading`}
                                      className="flex-grow rounded-md bg-[#0A184D] pl-3 text-3xl font-semibold leading-relaxed text-white">
                                      Étapes
                                    </h6>
                                    <button
                                      onClick={() => {
                                        setIsStepsOpen(!isStepsOpen)
                                      }}
                                      className="bg-transparent px-4 py-2 text-white"
                                      aria-label={
                                        isStepsOpen
                                          ? 'Masquer les étapes'
                                          : 'Afficher les étapes'
                                      }>
                                      <ArrowIcon isOpen={isStepsOpen} />
                                    </button>
                                  </div>
                                  {isStepsOpen &&
                                    steps.map((step) => (
                                      <article
                                        key={step.id}
                                        className="m-4 rounded-lg border-2 border-[#0A184D] bg-[#F4FDFF] p-4 shadow-lg">
                                        <h6 className="pb-4 text-2xl font-medium">
                                          Étape n° {step.stage.stepNumber} :{' '}
                                          {step.name.fr}
                                        </h6>
                                        {/* IMAGE */}
                                        <div className="flex gap-4">
                                          <div className="avatar">
                                            <div className="w-16 rounded-xl">
                                              <img
                                                src={step.content.image[0]}
                                              />
                                            </div>
                                          </div>
                                          <button
                                            onClick={() =>
                                              void fetchPieces(step.id)
                                            }
                                            className="duration-5 rounded-xl border-2 border-[#0A184D] bg-[#0A184D] px-6 py-4 text-xl text-white transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#FFFFFF] hover:text-[#0A184D]"
                                            aria-label={`Voir les œuvres pour ${step.name.fr}`}>
                                            Voir l'indice de l'Etape
                                          </button>
                                          {step.description.falc.status
                                            .isCertified ? (
                                            <button
                                              className="flex items-center gap-3 rounded-xl border-2 border-[#22891F] bg-[#22891F] px-6 py-2 text-xl text-white"
                                              aria-label={`Texte validé pour ${step.name.fr}`}>
                                              <CheckIcon className="h-8 w-8" />
                                              <span>Texte validé</span>
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() => {
                                                handleNavigate(step)
                                              }}
                                              className="duration-5 flex items-center gap-3 rounded-xl border-2 border-[#0A184D] bg-[#bfdcfe] px-6 py-2 text-xl text-[#0A184D] transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#F4FDFF] hover:text-[#0A184D]"
                                              aria-label={`Corriger ${step.name.fr}`}>
                                              <PencilIcon />
                                              <span>Corriger</span>
                                            </button>
                                          )}
                                        </div>

                                        {/* Liste des Œuvres */}
                                        {activeStepId === step.id && (
                                          <section
                                            aria-labelledby={`pieces-${step.id}-heading`}
                                            className="mt-7 rounded-lg border-2 bg-[#ffffff] px-2 py-3">
                                            <div className="space-y-5">
                                              <div className="flex items-center justify-between">
                                                <h6
                                                  id={`pieces-${step.id}-heading`}
                                                  className="flex-grow rounded-md bg-[#0A184D] pl-3 text-3xl font-semibold leading-relaxed text-white">
                                                  œuvres
                                                </h6>

                                                <button
                                                  onClick={() => {
                                                    setIsPiecesOpen(
                                                      !isPiecesOpen
                                                    )
                                                  }}
                                                  className="bg-transparent px-4 py-2 text-white"
                                                  aria-label={
                                                    isPiecesOpen
                                                      ? 'Masquer les étapes'
                                                      : 'Afficher les étapes'
                                                  }>
                                                  <ArrowIcon
                                                    isOpen={isPiecesOpen}
                                                  />
                                                </button>
                                              </div>
                                              {isPiecesOpen &&
                                                pieces.map((piece) => (
                                                  <article
                                                    key={piece.id}
                                                    className="m-4 rounded-lg border-2 border-[#0A184D] bg-[#F4FDFF] p-4 shadow-lg">
                                                    <h6 className="mb-2 text-xl font-medium">
                                                      {piece.name.fr}
                                                    </h6>
                                                    {/* IMAGE */}
                                                    <div className="flex gap-4">
                                                      <div className="avatar">
                                                        <div className="w-16 rounded-xl">
                                                          <img
                                                            src={
                                                              piece.content
                                                                .image[0]
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                      {piece.description.falc
                                                        .status.isCertified ? (
                                                        <button
                                                          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                                          aria-label={`Texte validé pour ${piece.name.fr}`}>
                                                          <CheckIcon className="h-8 w-8" />
                                                          <span>
                                                            Texte validé
                                                          </span>
                                                        </button>
                                                      ) : (
                                                        <button
                                                          onClick={() => {
                                                            handleNavigate(
                                                              piece
                                                            )
                                                          }}
                                                          className="duration-5 flex items-center gap-3 rounded-xl border-2 border-[#0A184D] bg-[#bfdcfe] px-6 py-2 text-xl text-[#0A184D] transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#F4FDFF] hover:text-[#0A184D]"
                                                          aria-label={`Corriger ${place.name.fr}`}>
                                                          <PencilIcon />
                                                          <span>Corriger</span>
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
