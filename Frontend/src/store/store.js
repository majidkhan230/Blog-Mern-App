import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/features/userSlice.js'
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage' // defaults to localStorage for web


const rootReducer  = combineReducers({
    user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>{
        getDefaultMiddleware({serializableCheck:false})
    }

})

export const persistor =  persistStore(store)

export default store;