import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { User } from '@/types'

export interface StateAuth {
  isLogged: boolean
  token: string
  user: User | null
}

const initialState = (): StateAuth => {
  return {
    isLogged: false,
    token: '',
    user: null,
  }
}

export const sliceAuth = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    signIn: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isLogged = true
    },
    signOut: (state) => {
      state.token = ''
      state.user = null
      state.isLogged = false
    },
  },
})

export const { signIn, signOut } = sliceAuth.actions
export default sliceAuth.reducer
