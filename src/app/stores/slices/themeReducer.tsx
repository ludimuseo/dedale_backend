import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface State {
  isDarkTheme: boolean
  currentType: 'dark' | 'light' | 'system'
}

const initialState: State = {
  isDarkTheme: false,
  currentType: 'system',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<State>) => {
      state.isDarkTheme = action.payload.isDarkTheme
      state.currentType = action.payload.currentType
    },
  },
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
