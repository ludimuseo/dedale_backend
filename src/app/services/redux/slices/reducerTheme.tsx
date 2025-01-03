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
        if ('documentElement' in document) {
          document.documentElement.setAttribute(
            'data-theme',
            String(action.payload).toLowerCase()
          )
        }
      }
    },
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload
      if ('documentElement' in document) {
        document.documentElement.setAttribute(
          'data-is-dark',
          String(action.payload)
        )
      }
    },
  },
})

export const { changeTheme, setIsDark } = sliceTheme.actions
export default sliceTheme.reducer
