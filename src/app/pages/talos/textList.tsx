import { Envelope, PencilIcon } from '@component/index'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { db } from '@/firebase/firebase'
import { GameType, JourneyType, PieceType, PlaceType, StepType } from '@/types'

const TextList: FC = () => {
  const [places, setPlaces] = useState<(PlaceType & { id: string })[]>([])
  const [journeys, setJourneys] = useState<(JourneyType & { id: string })[]>([])
  const [steps, setSteps] = useState<(StepType & { id: string })[]>([])
  const [pieces, setPieces] = useState<(PieceType & { id: string })[]>([])
  const [games, setGames] = useState<(GameType & { id: string })[]>([])
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null)
  const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null)
  const [activeStepId, setActiveStepId] = useState<string | null>(null)
  const [activePieceId, setActivePieceId] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleNavigate = (
    formData: PlaceType | JourneyType | StepType | PieceType | GameType
  ) => {
    void navigate('/interface', { state: { formData: formData } })
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'places'))
        const placeData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data().place as PlaceType),
        }))
        setPlaces(placeData)
      } catch (error) {
        console.error('Error fetching places:', error)
      }
    }
    void fetchPlaces()
  }, [])

  const fetchJourneys = async (placeId: string) => {
    try {
      const q = query(
        collection(db, 'journeys'),
        where('journey.placeID', '==', placeId)
      )
      const querySnapshot = await getDocs(q)
      const journeyData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data().journey as JourneyType),
      }))
      setJourneys(journeyData)
      setActivePlaceId(placeId)
    } catch (error) {
      console.error('Error fetching journeys:', error)
    }
  }

  const fetchSteps = async (journeyId: string) => {
    try {
      const q = query(
        collection(db, 'steps'),
        where('step.journeyID', '==', journeyId)
      )
      const querySnapshot = await getDocs(q)
      const stepData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data().step as StepType),
      }))
      setSteps(stepData)
      setActiveJourneyId(journeyId)
    } catch (error) {
      console.error('Error fetching journeys:', error)
    }
  }

  const fetchPieces = async (stepId: string) => {
    try {
      const q = query(
        collection(db, 'pieces'),
        where('piece.stepID', '==', stepId)
      )
      const querySnapshot = await getDocs(q)
      const pieceData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data().piece as PieceType),
      }))
      setPieces(pieceData)
      setActiveStepId(stepId)
    } catch (error) {
      console.error('Error fetching journeys:', error)
    }
  }

  const fetchGames = async (pieceId: string) => {
    try {
      const q = query(
        collection(db, 'games'),
        where('game.pieceID', '==', pieceId)
      )
      const querySnapshot = await getDocs(q)
      const gameData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data().game as GameType),
      }))
      setGames(gameData)
      setActivePieceId(pieceId)
    } catch (error) {
      console.error('Error fetching journeys:', error)
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="text-xl">#</th>
              <th className="text-xl">LIEU</th>
              <th className="text-xl">ACTIONS</th>
              <th className="text-xl">MODIFIER</th>
              <th className="text-xl">ENVOYER</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place, index) => (
              <React.Fragment key={place.id}>
                <tr className="bg-base-300">
                  <th>{index + 1}</th>
                  <td>
                    <h2
                      className="cursor-pointer hover:underline"
                      onClick={() => {
                        handleNavigate(place)
                      }}>
                      {`Lieu: `}
                      {place.name.fr}
                    </h2>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => void fetchJourneys(place.id)}>
                      Voir les parcours
                    </button>
                  </td>

                  <td className="">
                    <PencilIcon />
                  </td>
                  <td className="">
                    <Envelope />
                  </td>
                </tr>
                {activePlaceId === place.id &&
                  journeys.map((journey) => (
                    <React.Fragment key={journey.id}>
                      <tr className="bg-base-200">
                        <th>&#12336;</th>
                        <td>
                          <h3
                            className="cursor-pointer hover:underline"
                            onClick={() => {
                              alert(journey.name.fr)
                            }}>
                            {`Parcours: `}
                            {journey.name.fr}
                          </h3>
                        </td>
                        <td>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => void fetchSteps(journey.id)}>
                            Voir les indices
                          </button>
                        </td>
                        <td className="">
                          <PencilIcon />
                        </td>
                        <td className="">
                          <Envelope />
                        </td>
                      </tr>
                      {activeJourneyId === journey.id &&
                        steps.map((step) => (
                          <React.Fragment key={step.id}>
                            <tr className="bg-base-100" key={step.id}>
                              <th>&#128073;</th>
                              <td>
                                <h4
                                  className="cursor-pointer hover:underline"
                                  onClick={() => {
                                    alert(step.name.fr)
                                  }}>
                                  {`Etape : `}
                                  {step.name.fr}
                                </h4>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm"
                                  onClick={() => void fetchPieces(step.id)}>
                                  Voir l'oeuvre
                                </button>
                              </td>
                              <td className="">
                                <PencilIcon />
                              </td>
                              <td className="">
                                <Envelope />
                              </td>
                            </tr>
                            {activeStepId === step.id &&
                              pieces.map((piece) => (
                                <React.Fragment key={piece.id}>
                                  <tr className="bg-base-100" key={step.id}>
                                    <th>&#128444;&#65039;</th>
                                    <td>
                                      <h4
                                        className="cursor-pointer hover:underline"
                                        onClick={() => {
                                          alert(piece.name.fr)
                                        }}>
                                        {`Oeuvre: `}
                                        {piece.name.fr}
                                      </h4>
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-sm"
                                        onClick={() =>
                                          void fetchGames(piece.id)
                                        }>
                                        Voir le quiz
                                      </button>
                                    </td>
                                    <td className="">
                                      <PencilIcon />
                                    </td>
                                    <td className="">
                                      <Envelope />
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
                                              className="cursor-pointer hover:underline"
                                              onClick={() => {
                                                alert(game.name.fr)
                                              }}>
                                              {`Jeu: `}
                                              {game.name.fr}
                                            </h4>
                                          </td>
                                          <td></td>
                                          <td className="">
                                            <PencilIcon />
                                          </td>
                                          <td className="">
                                            <Envelope />
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
      </div>
    </div>
  )
}

export { TextList }
