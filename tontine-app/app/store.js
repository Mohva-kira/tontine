import { configureStore } from '@reduxjs/toolkit'
import jobSlice from '../reducers/slices/jobSlice'
import { jobApi } from '../reducers/api/jobApi'
import { tontineApi } from '../reducers/api/tontineApi'
import { authApi } from '../reducers/api/authApi'
import { paymentApi } from '../reducers/api/paymentApi'
import { handsApi } from '../reducers/api/handsApi'
import tontineSlice from '../reducers/api/tontineApi'
import authSlice from '../reducers/api/authApi'
import { profileApi } from '../reducers/api/profileApi'
import profileSlice from '../reducers/api/profileApi'
import {notificationApi} from '../reducers/api/notificationApi'
import  notificationSlice  from '../reducers/api/notificationApi'

export const store = configureStore({
  reducer: {
    jobs: jobSlice,
    tontines: tontineSlice,
    profiles: profileSlice,
    user: authSlice,
    notification: notificationSlice,
    [jobApi.reducerPath]: jobApi.reducer,
    [tontineApi.reducerPath]: tontineApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [handsApi.reducerPath]: handsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,


  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jobApi.middleware,
    tontineApi.middleware, 
    authApi.middleware, 
    paymentApi.middleware, 
    handsApi.middleware, 
    profileApi.middleware,
    notificationApi.middleware,
    )
})