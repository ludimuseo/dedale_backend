import React from 'react'

import { FormDataType } from '@/types'

type SetFormDataType = React.Dispatch<React.SetStateAction<FormDataType>>

export const useSelectHandlers = (
  setFormData: SetFormDataType
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      clientId: selectedValueToNumber,
    }))
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      placeId: selectedValueToNumber,
    }))
  }

  const handleSelectJourney = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedValue = e.target.value
    setFormData((prevFormData) => ({
      ...prevFormData,
      journeyId: selectedValue,
    }))
  }

  return {
    handleSelectClient,
    handleSelectMedal,
    handleSelectPlace,
    handleSelectJourney,
  }
}
