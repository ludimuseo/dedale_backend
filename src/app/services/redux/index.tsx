import { configureStore, type Reducer, type Store } from '@reduxjs/toolkit'
import { reducerRoot } from '@service/redux/reducerRoot'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer: Reducer = persistReducer(persistConfig, reducerRoot)

export const store: Store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  reducer: persistedReducer,
})

// Inferred type: {auth: AuthState}
export type AppDispatch = typeof store.dispatch
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducerRoot>

export const persistor = persistStore(store)
