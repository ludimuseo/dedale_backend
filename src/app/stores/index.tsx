import { configureStore, type Store } from '@reduxjs/toolkit'
import authReducer from '@/app/stores/authReducer'

const store: Store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {auth: AuthState}
export type AppDispatch = typeof store.dispatch

export default store
