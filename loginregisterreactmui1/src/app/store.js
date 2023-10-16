import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
 
import { UserAuthApi } from '../services/UserAuthApi'
import  authReducer   from '../features/AuthSlice'
import {composeWithDevTools} from 'redux-devtools-extension';

import UserReducer from '../features/UserSlice';

export const store = configureStore({
  reducer: {
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    auth: authReducer ,
    user:UserReducer 
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAuthApi.middleware),
})

setupListeners(store.dispatch)