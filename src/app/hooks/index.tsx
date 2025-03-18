import type { AppDispatch, RootState } from '@service/redux'
import { useDispatch, useSelector } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export { useFetch } from '@hook/useFetch'
export { useInput } from '@hook/useInput'
export { useNotification } from '@hook/useNotification'
