import { combineReducers, type Reducer } from '@reduxjs/toolkit'
import authReducer from '@/app/stores/authReducer'

const combinedReducers = combineReducers({
  auth: authReducer,
})

export const rootReducer: Reducer = () => {
  return combinedReducers
}
