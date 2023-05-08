import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer  from './authReducer'
import farmReducer  from './farmReducer'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['farm']
}
const rootReducer = combineReducers({ 
  auth:authReducer,
  farm:farmReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch