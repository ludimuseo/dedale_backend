import React, { Dispatch, SetStateAction } from 'react'

import { FormDataType } from '@/types'

export type SetFormDataType = React.Dispatch<React.SetStateAction<FormDataType>>

export const useSelectHandlers = (
  setFormData: Dispatch<SetStateAction<FormDataType>>,
  formData: FormDataType,
  setSelected: Dispatch<SetStateAction<Record<string, number>>>
): {
  handleSelectClient: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSelectMedal: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSelectPlace: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSelectJourney: (e: React.ChangeEvent<HTMLSelectElement>) => void
} => {
  const handleSelectClient = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedValueToNumber = Number(e.target.value)
    if ('clientId' in formData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ['clientId']: selectedValueToNumber,
      }))
    } else {
      setSelected({
        selectedClientId: selectedValueToNumber,
      })
    }
  }

  const handleSelectMedal = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedValueToNumber = Number(e.target.value)
    setFormData((prevFormData) => ({
      ...prevFormData,
      medalId: selectedValueToNumber,
    }))
  }

  const handleSelectPlace = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedValueToNumber = Number(e.target.value)
    if ('placeId' in formData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        placeId: selectedValueToNumber,
      }))
    } else {
      setSelected({
        selectedPlaceId: selectedValueToNumber,
      })
    }
  }

  const handleSelectJourney = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedValueToNumber = Number(e.target.value)
    if ('journeyId' in formData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        journeyId: selectedValueToNumber,
      }))
    } else {
      setSelected({
        selectedJourneyId: selectedValueToNumber,
      })
    }
  }

  return {
    handleSelectClient,
    handleSelectMedal,
    handleSelectPlace,
    handleSelectJourney,
  }
}
