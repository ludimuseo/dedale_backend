import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { FC, useEffect, useState } from 'react'

import { Envelope } from '@/app/components/ui/icons/Envelope'
import { Pencil } from '@/app/components/ui/icons/Pencil'
import { db } from '@/firebase/firebase'
import { JourneyType, PieceType, PlaceType, StepType } from '@/types'

const TextList: FC = () => {
  const [places, setPlaces] = useState<(PlaceType & { id: string })[]>([])
  const [journeys, setJourneys] = useState<(JourneyType & { id: string })[]>([])
  const [steps, setSteps] = useState<(StepType & { id: string })[]>([])
  const [pieces, setPieces] = useState<(PieceType & { id: string })[]>([])
  //const [games, setGames] = useState<any[]>([])
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null)
  const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null)
  const [activeStepId, setActiveStepId] = useState<string | null>(null)

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

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>LIEU</th>
              <th>ACTIONS</th>
              <th>MODIFIER</th>
              <th>ENVOYER</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place, index) => (
              <React.Fragment key={place.id}>
                <tr className="bg-base-200">
                  <th>{index + 1}</th>
                  <td>
                    <h2>
                      {`Lieu: `}
                      {place.name.fr}
                    </h2>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => void fetchJourneys(place.id)}>
                      Voir les parcours
                    </button>
                  </td>
                  <td>
                    <Pencil />
                  </td>
                  <td>
                    <Envelope />
                  </td>
                </tr>
                {activePlaceId === place.id &&
                  journeys.map((journey) => (
                    <React.Fragment key={journey.id}>
                      <tr className="bg-base-100">
                        <th></th>
                        <td>
                          <h3>
                            {`Parcours: `}
                            {journey.name.fr}
                          </h3>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm"
                            onClick={() => void fetchSteps(journey.id)}>
                            Voir les indices
                          </button>
                        </td>
                        <td>
                          <Pencil />
                        </td>
                        <td>
                          <Envelope />
                        </td>
                      </tr>
                      {activeJourneyId === journey.id &&
                        steps.map((step) => (
                          <React.Fragment key={step.id}>
                            <tr className="bg-base-100" key={step.id}>
                              <th></th>
                              <td>
                                <h4>
                                  {`Etape: `}
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
                              <td>
                                <Pencil />
                              </td>
                              <td>
                                <Envelope />
                              </td>
                            </tr>
                            {activeStepId === step.id &&
                              pieces.map((piece) => (
                                <React.Fragment key={piece.id}>
                                  <tr className="bg-base-100" key={step.id}>
                                    <th></th>
                                    <td>
                                      <h5>
                                        {`Oeuvre: `}
                                        {piece.name.fr}
                                      </h5>
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-sm"
                                        //onClick={() => fetchSteps(journey.id)}
                                      >
                                        Voir le quiz
                                      </button>
                                    </td>
                                    <td>
                                      <Pencil />
                                    </td>
                                    <td>
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
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TextList
