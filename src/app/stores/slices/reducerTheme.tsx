import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { Theme } from '@/types'

export interface StateTheme {
  isDark: boolean
  theme: Theme
}

const initialState: StateTheme = {
  isDark: false,
  theme: Theme.SYSTEM,
}

export const sliceTheme = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    changeTheme: (state, action: PayloadAction<StateTheme['theme']>) => {
      if (Object.values(Theme).includes(action.payload)) {
        state.theme = Theme[action.payload]
      }
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      switch (state.theme) {
        case Theme.LIGHT:
        case Theme.DARK:
        case Theme.SYSTEM:
          state.isDark = action.payload
          document.documentElement.setAttribute(
            'data-theme',
            state.isDark ? 'dark' : 'light'
          )
          break
        case Theme.CUSTOM:
          state.isDark = false
          // Must get Theme from User
          // Example: user.theme = 'protanopia'
          break
        default:
          break
      }
    },
  },
})

export const { changeTheme, setDarkMode } = sliceTheme.actions
export default sliceTheme.reducer
