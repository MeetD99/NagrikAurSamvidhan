import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

import userReducer from './user/userSlice'



const rootreducer = combineReducers({
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1
}
const persistedReducer = persistReducer(persistConfig, rootreducer)

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck : false
    })

})

export const persistor = persistStore(store)