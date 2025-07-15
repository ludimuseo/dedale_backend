import { GameType, JourneyType, PieceType, PlaceType, StepType } from './types'

export function isPlaceType(data: unknown): data is PlaceType {
  return (
    typeof data === 'object' &&
    data !== null &&
    'clientID' in data &&
    'coords' in data &&
    'address' in data
  )
}

export function isJourneyType(data: unknown): data is JourneyType {
  return (
    typeof data === 'object' &&
    data !== null &&
    'placeId' in data &&
    'content' in data &&
    'coords' in data
  )
}

export function isStepType(data: unknown): data is StepType {
  return (
    typeof data === 'object' &&
    data !== null &&
    'journeyId' in data &&
    'stage' in data
  )
}

export function isPieceType(data: unknown): data is PieceType {
  return (
    typeof data === 'object' &&
    data !== null &&
    'stepId' in data &&
    'content' in data
  )
}

export function isGameType(data: unknown): data is GameType {
  return (
    typeof data === 'object' &&
    data !== null &&
    'pieceId' in data &&
    'question' in data &&
    'response' in data
  )
}
