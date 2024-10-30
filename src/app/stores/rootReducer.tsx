import { combineReducers, type Reducer } from '@reduxjs/toolkit'
import authReducer from '@/app/stores/slices/authReducer'
import themeReducer from '@/app/stores/slices/themeReducer'

const combinedReducers = combineReducers({
  auth: authReducer,
  theme: themeReducer,
})

export const rootReducer: Reducer = combinedReducers
