import { createSlice } from '@reduxjs/toolkit'

type Alert = 'info' | 'success' | 'warning' | 'error'

interface OpenAlertPayload {
  message: string
  type: Alert
}

export interface StateAlert {
  isActive: boolean
  message: string
  type: Alert
}

const initialState: StateAlert = {
  isActive: false,
  message: '',
  type: 'info',
}

export const sliceAlert = createSlice({
  initialState,
  name: 'alert',
  reducers: {
    openAlert: (state, action: { payload: OpenAlertPayload }) => {
      state.isActive = true
      state.message = action.payload.message
      state.type = action.payload.type
    },
    closeAlert: (state) => {
      state.isActive = false
    },
  },
})

export const { openAlert, closeAlert } = sliceAlert.actions
export default sliceAlert.reducer
