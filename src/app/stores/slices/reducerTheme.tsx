import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useSelector, type TypedUseSelectorHook } from 'react-redux'

enum ThemeProp {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  SYSTEM = 'SYSTEM',
}

interface State {
  isDark: boolean
  currentTheme: ThemeProp
}

const initialState: State = {
  isDark: false,
  currentTheme: ThemeProp.SYSTEM,
}

export const sliceTheme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<State['currentTheme']>) => {
      state.currentTheme = action.payload
    },
  },
})

export const selectorTheme: TypedUseSelectorHook<State> = useSelector
export const { changeTheme } = sliceTheme.actions
export default sliceTheme.reducer
