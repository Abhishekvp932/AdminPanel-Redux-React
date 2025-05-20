import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'


const persistConfig = {
    key:'root',
    storage
}

const rootReducer = combineReducers({
    user:userReducer
})
const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
    reducer:{
        user:persistedReducer,
    }
})

export const persist = persistStore(store)

