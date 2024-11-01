import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface StateTheme {
  isDark: boolean
  theme: 'DARK' | 'LIGHT' | 'SYSTEM'
}

const initialState: StateTheme = {
  isDark: false,
  theme: 'SYSTEM',
}

export const sliceTheme = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    changeTheme: (state, action: PayloadAction<StateTheme['theme']>) => {
      state.theme = action.payload
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload
      console.info('state.isDark: ', state.isDark)
      document.documentElement.className = state.isDark ? 'dark' : 'light'
    },
  },
})

export const { changeTheme, setDarkMode } = sliceTheme.actions
export default sliceTheme.reducer
