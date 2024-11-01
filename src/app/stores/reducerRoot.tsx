import { combineReducers, type Reducer } from '@reduxjs/toolkit'

import reducerAuth from '@/app/stores/slices/reducerAuth'
import reducerTheme from '@/app/stores/slices/reducerTheme'

const combinedReducers = combineReducers({
  auth: reducerAuth,
  theme: reducerTheme,
})

export const reducerRoot: Reducer = combinedReducers
