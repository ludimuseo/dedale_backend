import { combineReducers, type Reducer } from '@reduxjs/toolkit'
import reducerAlert from '@service/redux/slices/reducerAlert'
import reducerAuth from '@service/redux/slices/reducerAuth'
import reducerDictionary from '@service/redux/slices/reducerDictionary'
import reducerTheme from '@service/redux/slices/reducerTheme'

const combinedReducers: Reducer = combineReducers({
  auth: reducerAuth,
  theme: reducerTheme,
  alert: reducerAlert,
  dictionary: reducerDictionary,
})

export const reducerRoot: Reducer = combinedReducers
