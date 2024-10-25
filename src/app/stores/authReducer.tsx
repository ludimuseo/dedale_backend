import { type User } from '@/types/user'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface State {
  user: User | null
  loggedAt: number | null
}

const initialState: State = {
  user: null,
  loggedAt: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.loggedAt = new Date().getTime()
    },
    signOut: (state) => {
      state.user = null
      state.loggedAt = null
    },
  },
})

export const { signIn, signOut } = authSlice.actions

export default authSlice.reducer
