import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage';


// Define a service using a base URL and expected endpoints
export const handsApi = createApi({
  reducerPath: 'handsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://152.228.174.182:1337/api',
    prepareHeaders: async (headers) => {
      const user = JSON.parse(await AsyncStorage.getItem('@user'))

    
      if (user) {
        headers.set('Authorization', `Bearer ${user.jwt}`)
        headers.set('Content-Type', `application/json`)
      }
      return headers
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getHands: builder.query({
      query: (data) => {


        return {
          url: `/hands?populate=*&pagination[page]=1&pagination[pageSize]=100`,
         
        }
      },


    }),

    getHandsDetails: builder.query({
      query: id => ({
        url: `/hands/${id}?populate=*`,
       
      })
    }),
    addHands: builder.mutation({
      query: (data) => ({
        url: '/hands',
        method: 'POST',
       
        body: JSON.stringify(data),
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetHandsQuery, useAddHandsMutation, useGetHandsDetailsQuery } = handsApi