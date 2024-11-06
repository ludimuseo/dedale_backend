import { combineReducers, type Reducer } from '@reduxjs/toolkit'
import reducerAuth from '@service/redux/slices/reducerAuth'
import reducerTheme from '@service/redux/slices/reducerTheme'

const combinedReducers: Reducer = combineReducers({
  auth: reducerAuth,
  theme: reducerTheme,
})

export const reducerRoot: Reducer = combinedReducers
