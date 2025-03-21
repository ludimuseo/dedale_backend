import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { User } from '@/types'

export interface StateAuth {
  isLogged: boolean
  token: string | null
  user: User | null
}

const initialState = (): StateAuth => {
  return {
    isLogged: false,
    token: null,
    user: null,
  }
}

export const sliceAuth = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    signIn: (state, action: PayloadAction<User>) => {
      state.isLogged = true
      // #! TODO: Generate a token and sync it with session
      state.token = ''
      state.user = action.payload
    },
    signOut: (state) => {
      state.isLogged = false
      state.token = null
      state.user = null
    },
  },
})

export const { signIn, signOut } = sliceAuth.actions
export default sliceAuth.reducer
