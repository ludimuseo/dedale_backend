import { type Reducer, type Store, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { reducerRoot } from '@/app/stores/reducerRoot'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer: Reducer = persistReducer(persistConfig, reducerRoot)

export const store: Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
  },
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducerRoot>
// Inferred type: {auth: AuthState}
export type AppDispatch = typeof store.dispatch
