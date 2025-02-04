import {
  collection,
  getDocs /* query, where */,
  query,
  where,
} from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { db } from '@/firebase/firebase'
import {
  EntityWithId,
  GameType,
  JourneyType,
  PieceType,
  PlaceType,
  StepType,
} from '@/types'

const TextList: FC = () => {
  const [places, setPlaces] = useState<
    (PlaceType & { id: string; collection: string })[]
  >([])
  // const [journeys, setJourneys] = useState<
  //   (JourneyType & { id: string; collection: string })[]
  // >([])
  // const [steps, setSteps] = useState<
  //   (StepType & { id: string; collection: string })[]
  // >([])
  // const [pieces, setPieces] = useState<
  //   (PieceType & { id: string; collection: string })[]
  // >([])
  // const [games, setGames] = useState<
  //   (GameType & { id: string; collection: string })[]
  // >([])
  //const [activePlaceId, setActivePlaceId] = useState<string | null>(null)
  //const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null)
  //const [activeStepId, setActiveStepId] = useState<string | null>(null)
  //const [activePieceId, setActivePieceId] = useState<string | null>(null)
  //const [selectedImage, setSelectedImage] = useState<string | null>(null)
  //const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  // const showTab = false

  const handleNavigate = (
    formData: EntityWithId<
      PlaceType | JourneyType | StepType | PieceType | GameType
    >
  ) => {
    void navigate('/interface', { state: { formData: formData } })
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        // const querySnapshot = await getDocs(collection(db, 'places'))
        const q = query(
          collection(db, 'places'),
          where('place.name.fr', '==', 'On bouge à Limoges !')
        )
        const querySnapshot = await getDocs(q)

        const placeData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          collection: 'places',
          ...(doc.data().place as PlaceType),
        }))
        setPlaces(placeData)
      } catch (error) {
        console.error('Error fetching places:', error)
      }
    }
    void fetchPlaces()
  }, [])

  // const fetchJourneys = async (placeId: string) => {
  //   try {
  //     const q = query(
  //       collection(db, 'journeys'),
  //       where('journey.placeID', '==', placeId)
  //     )
  //     const querySnapshot = await getDocs(q)
  //     const journeyData = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       collection: 'journeys',
  //       ...(doc.data().journey as JourneyType),
  //     }))
  //     setJourneys(journeyData)
  //     setActivePlaceId(placeId)
  //   } catch (error) {
  //     console.error('Error fetching journeys:', error)
  //   }
  // }

  // const fetchSteps = async (journeyId: string) => {
  //   try {
  //     const q = query(
  //       collection(db, 'steps'),
  //       where('step.journeyID', '==', journeyId)
  //     )
  //     const querySnapshot = await getDocs(q)
  //     const stepData = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       collection: 'steps',
  //       ...(doc.data().step as StepType),
  //     }))
  //     setSteps(stepData)
  //     setActiveJourneyId(journeyId)
  //   } catch (error) {
  //     console.error('Error fetching steps:', error)
  //   }
  // }

  // const fetchPieces = async (stepId: string) => {
  //   try {
  //     const q = query(
  //       collection(db, 'pieces'),
  //       where('piece.stepID', '==', stepId)
  //     )
  //     const querySnapshot = await getDocs(q)
  //     const pieceData = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       collection: 'pieces',
  //       ...(doc.data().piece as PieceType),
  //     }))
  //     setPieces(pieceData)
  //     setActiveStepId(stepId)
  //   } catch (error) {
  //     console.error('Error fetching pieces:', error)
  //   }
  // }

  // const fetchGames = async (pieceId: string) => {
  //   try {
  //     const q = query(
  //       collection(db, 'games'),
  //       where('game.pieceID', '==', pieceId)
  //     )
  //     const querySnapshot = await getDocs(q)
  //     const gameData = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       collection: 'games',
  //       ...(doc.data().game as GameType),
  //     }))
  //     setGames(gameData)
  //     setActivePieceId(pieceId)
  //   } catch (error) {
  //     console.error('Error fetching games:', error)
  //   }
  //}

  return (
    <div>
      <div className="navbar mb-6 rounded-xl bg-base-100">
        <span className="ml-2 font-inclusive text-3xl">Liste des textes</span>
      </div>
      <div>
        {/* {showTab && <div className="overflow-x-auto p-4">
        <table className="table">
          <thead>
            <tr>
              <th className="text-2xl">#</th>
              <th className="text-2xl">LIEU</th>
              <th className="text-2xl">COMPLETION</th>
              <th className="text-2xl">ACTIONS</th>
              <th className="flex justify-center text-2xl">MODIFIER</th>
              <th className="text-2xl">ENVOYER</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place, index) => (
              <React.Fragment key={place.id}>
                <tr className="bg-base-300">
                  <th>{index + 1}</th>
                  <td>
                    <h1
                      className="cursor-pointer text-3xl hover:underline"
                      onClick={() => {
                        handleNavigate(place)
                      }}>
                      {`Lieu: `}
                      {place.name.fr}
                    </h1>
                  </td>
                  <td>
                    <progress
                      className="progress progress-success w-56"
                      value="40"
                      max="100"></progress>
                  </td>

                  <td className="group relative">
                    <button
                      className="btn btn-primary"
                      onClick={() => void fetchJourneys(place.id)}>
                      ↓ Voir les parcours
                    </button>
                    <div
                      role="tooltip"
                      aria-label="Afficher les parcours"
                      className="absolute bottom-full left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-yellow-300 px-3 py-1 text-sm text-black shadow-lg group-hover:block">
                      Afficher les parcours
                    </div>
                  </td>

                  <td
                    className="group relative"
                    onClick={() => {
                      handleNavigate(place)
                    }}>
                    <img
                      src="/src/assets/imgs/Talos/crayon.svg"
                      alt="crayon"
                      className="mx-auto h-[60px] w-[200px]"
                    />
                    <div
                      role="tooltip"
                      aria-label="Afficher les parcours"
                      className="absolute bottom-full left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-yellow-300 px-3 py-1 text-sm text-black shadow-lg group-hover:block">
                      Modifier {place.name.fr}
                    </div>
                  </td>
                  <td className="group relative">
                    <img
                      src="/src/assets/imgs/Talos/enveloppe.svg"
                      alt="crayon"
                      className="mx-auto h-[60px] w-[200px]"
                    />
                    <div
                      role="tooltip"
                      aria-label="Afficher les parcours"
                      className="absolute bottom-full left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-yellow-300 px-3 py-1 text-sm text-black shadow-lg group-hover:block">
                      Envoyer le texte {place.name.fr}
                    </div>
                  </td>
                </tr>
                {activePlaceId === place.id &&
                  journeys.map((journey) => (
                    <React.Fragment key={journey.id}>
                      <tr className="bg-base-200">
                        <th>&#12336;</th>
                        <td>
                          <h3
                            className="cursor-pointer text-2xl hover:underline"
                            onClick={() => {
                              handleNavigate(journey)
                            }}>
                            {`Parcours: `}
                            {journey.name.fr}
                          </h3>
                        </td>
                        <td>
                          <progress
                            className="progress progress-success w-56"
                            value="40"
                            max="100"></progress>
                        </td>
                        <td>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => void fetchSteps(journey.id)}>
                            ↓ Voir les indices
                          </button>
                        </td>
                        <td className="">
                          <img
                            src="/src/assets/imgs/Talos/crayon.svg"
                            alt="crayon"
                            className="mx-auto h-[60px] w-[200px]"
                          />
                        </td>
                        <td className="">
                          <img
                            src="/src/assets/imgs/Talos/enveloppe.svg"
                            alt="crayon"
                            className="mx-auto h-[60px] w-[200px]"
                          />
                        </td>
                      </tr>
                      {activeJourneyId === journey.id &&
                        steps.map((step) => (
                          <React.Fragment key={step.id}>
                            <tr className="bg-base-100" key={step.id}>
                              <th>&#128073;</th>
                              <td>
                                <h4
                                  className="cursor-pointer text-xl hover:underline"
                                  onClick={() => {
                                    handleNavigate(journey)
                                  }}>
                                  {`Etape : `}
                                  {step.name.fr}
                                </h4>
                              </td>
                              <td>
                                <progress
                                  className="progress progress-success w-56"
                                  value="40"
                                  max="100"></progress>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm"
                                  onClick={() => void fetchPieces(step.id)}>
                                  ↓ Voir l'oeuvre
                                </button>
                              </td>
                              <td className="">
                                <img
                                  src="/src/assets/imgs/Talos/crayon.svg"
                                  alt="crayon"
                                  className="mx-auto h-[60px] w-[200px]"
                                />
                              </td>
                              <td className="">
                                <img
                                  src="/src/assets/imgs/Talos/enveloppe.svg"
                                  alt="crayon"
                                  className="mx-auto h-[60px] w-[200px]"
                                />
                              </td>
                            </tr>
                            {activeStepId === step.id &&
                              pieces.map((piece) => (
                                <React.Fragment key={piece.id}>
                                  <tr className="bg-base-100" key={step.id}>
                                    <th>&#128444;&#65039;</th>
                                    <td>
                                      <h4
                                        className="cursor-pointer text-xl hover:underline"
                                        onClick={() => {
                                          handleNavigate(piece)
                                        }}>
                                        {`Oeuvre: `}
                                        {piece.name.fr}
                                      </h4>
                                    </td>
                                    <td>
                                      <progress
                                        className="progress progress-success w-56"
                                        value="40"
                                        max="100"></progress>
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-sm"
                                        onClick={() =>
                                          void fetchGames(piece.id)
                                        }>
                                        ↓ Voir le quiz
                                      </button>
                                    </td>
                                    <td className="">
                                      <img
                                        src="/src/assets/imgs/Talos/crayon.svg"
                                        alt="crayon"
                                        className="mx-auto h-[60px] w-[200px]"
                                      />
                                    </td>
                                    <td className="">
                                      <img
                                        src="/src/assets/imgs/Talos/enveloppe.svg"
                                        alt="crayon"
                                        className="mx-auto h-[60px] w-[200px]"
                                      />
                                    </td>
                                  </tr>
                                  {activePieceId === piece.id &&
                                    games.map((game) => (
                                      <React.Fragment key={game.id}>
                                        <tr
                                          className="bg-base-100"
                                          key={game.id}>
                                          <th>;</th>
                                          <td>
                                            <h4
                                              className="cursor-pointer text-xl hover:underline"
                                              onClick={() => {
                                                handleNavigate(game)
                                              }}>
                                              {`Jeu: `}
                                              {game.name.fr}
                                            </h4>
                                          </td>
                                          <td>
                                            <progress
                                              className="progress progress-success w-56"
                                              value="40"
                                              max="100"></progress>
                                          </td>
                                          <td></td>
                                          <td className="">
                                            <img
                                              src="/src/assets/imgs/Talos/crayon.svg"
                                              alt="crayon"
                                              className="mx-auto h-[60px] w-[200px]"
                                            />
                                          </td>
                                          <td className="">
                                            <img
                                              src="/src/assets/imgs/Talos/enveloppe.svg"
                                              alt="crayon"
                                              className="mx-auto h-[60px] w-[200px]"
                                            />
                                          </td>
                                        </tr>
                                      </React.Fragment>
                                    ))}
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ))}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>} */}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
              <th className="text-xl">Texte</th>
              <th className="text-xl">Résumé</th>
              <th className="text-xl">Correcteur</th>
              <th className="text-xl">Modifier</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place) => {
              return (
                <>
                  {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}

                  <tr>
                    <td>
                      <div className="flex items-center gap-3 p-2">
                        <div className="avatar">
                          <div className="mask mask-squircle h-16 w-16">
                            <img
                              src={place.content.image[0]}
                              alt={place.name.fr}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-inclusive text-xl font-bold">
                            {place.name.fr}
                          </div>
                          <div className="font-inclusive text-sm opacity-50">
                            Complet
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-inclusive text-lg">
                        {place.description.falc.fr.length > 20
                          ? place.description.falc.fr.slice(0, 100)
                          : place.description.falc.fr}
                        ...
                      </span>
                    </td>

                    <td className="font-inclusive text-lg">Quentin</td>

                    <th>
                      <button
                        className="btn-xl btn btn-circle btn-ghost font-inclusive text-lg"
                        onClick={() => {
                          handleNavigate(place)
                        }}>
                        {' '}
                        <img
                          src="/src/assets/imgs/talos/crayon.svg"
                          alt="crayon"
                          className="mx-auto h-[40px] w-[80px]"
                        />
                      </button>
                    </th>
                  </tr>

                  <hr className="mt-2 w-full border-gray-300" />
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { TextList }
