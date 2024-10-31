import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface StateTheme {
  isDark: boolean
  currentTheme: 'DARK' | 'LIGHT' | 'SYSTEM'
}

const initialState: StateTheme = {
  isDark: false,
  currentTheme: 'SYSTEM',
}

export const sliceTheme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<StateTheme['currentTheme']>) => {
      document.documentElement.className = String(action.payload).toLowerCase()
      state.currentTheme = action.payload
      state.isDark = state.currentTheme === 'DARK'
    },
  },
})

export const { changeTheme } = sliceTheme.actions
export default sliceTheme.reducer
