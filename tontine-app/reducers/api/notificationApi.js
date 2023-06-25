// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from "@reduxjs/toolkit";

// Define a service using a base URL and expected endpoints
export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://152.228.174.182:1337/api',
  prepareHeaders: async (headers) => {
    const user = JSON.parse (await AsyncStorage.getItem('@user'))

      console.log('state user', user)
    if (user ) {
        headers.set('Authorization', `Bearer ${user.jwt}`)
        headers.set('Content-Type', `application/json`)
    }
    return headers
},
credentials: 'include',

}),
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (id) => {
        
       
        return {
            url:`/notifications?filters[to][id]=${id}&populate=*`,
           
        }
        },
       
      
    }),

    getNotificationDetails : builder.query({
        query: id => ({
          url: `/notifications/${id}?populate=*`,
         
        })
    }),
    addNotification: builder.mutation({
      query: (data) => ({
        url: '/notifications',
        method: 'POST',
       
        body: JSON.stringify(data) ,
      }),
    }),

    updateNotification: builder.mutation({
      query: (data) => ({
        url: `/notifications/${data?.data.id}`,
        method: 'PUT',
        
        body: JSON.stringify(data) ,
      }),
    }),


  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNotificationsQuery, useAddNotificationMutation, useGetNotificationDetailsQuery, useUpdateNotificationMutation } = notificationApi



const initialState = {
  notifications : undefined,
}

export const notificationSlice = createSlice({
  name: 'Notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) =>  {
      builder.addMatcher(notificationApi.endpoints.getNotifications.matchFulfilled, (state, action)=> {
      
          state.notifications = action.payload.data
      })
  }
})

export default notificationSlice.reducer