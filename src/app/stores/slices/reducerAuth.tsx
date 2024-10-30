import { type User } from '@/types/user'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface State {
  user: User | null
  isLogged: boolean
}

const initialState: State = {
  user: null,
  isLogged: false,
}

export const sliceAuth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isLogged = true
    },
    signOut: (state) => {
      state.user = null
      state.isLogged = false
    },
  },
})

export const { signIn, signOut } = sliceAuth.actions
export default sliceAuth.reducer
