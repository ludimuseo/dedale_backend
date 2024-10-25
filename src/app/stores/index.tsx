import {
  configureStore,
  Tuple,
  type Reducer,
  type Store,
} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { rootReducer } from '@/app/stores/rootReducer'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer: Reducer = persistReducer(persistConfig, rootReducer)

export const store: Store = configureStore({
  reducer: persistedReducer,
  middleware: () => new Tuple(),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {auth: AuthState}
export type AppDispatch = typeof store.dispatch

// export default { store }
