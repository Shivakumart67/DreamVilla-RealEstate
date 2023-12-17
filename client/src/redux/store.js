import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({ user: userReducer })

const presistConfig = {
    key: 'root',
    storage,
    version: 1
}

const presistedReducre = persistReducer(presistConfig, rootReducer)
export const store = configureStore({
    reducer: presistedReducre
})

export const presistor = persistStore(store)