// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from "@reduxjs/toolkit";

// Define a service using a base URL and expected endpoints
export const tontineApi = createApi({
  reducerPath: 'tontineApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://152.228.174.182:1337/api',
  prepareHeaders: async (headers) => {
    const user = JSON.parse (await AsyncStorage.getItem('@user'))


    if (user ) {
        headers.set('Authorization', `Bearer ${user.jwt}`)
        headers.set('Content-Type', `application/json`)
    }
    return headers
},
credentials: 'include',

}),
  endpoints: (builder) => ({
    getTontine: builder.query({
      query: (data) => {
        
       
        return {
            url:`/tontines?populate=*`,
           
        }
        },
       
      
    }),

    getTontineDetails : builder.query({
        query: id => ({
          url: `/tontines/${id}?populate=*`,
         
        })
    }),
    addTontine: builder.mutation({
      query: (data) => ({
        url: '/tontines',
        method: 'POST',
       
        body: JSON.stringify(data) ,
      }),
    }),

    updateTontine: builder.mutation({
      query: (data) => ({
        url: `/tontines/${data?.data.id}`,
        method: 'PUT',
        
        body: JSON.stringify(data) ,
      }),
    }),


  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTontineQuery, useAddTontineMutation, useGetTontineDetailsQuery, useUpdateTontineMutation } = tontineApi



const initialState = {
  tontines : undefined,
}

export const tontineSlice = createSlice({
  name: 'Tontines',
  initialState,
  reducers: {},
  extraReducers: (builder) =>  {
      builder.addMatcher(tontineApi.endpoints.getTontine.matchFulfilled, (state, action)=> {
      
          state.tontines = action.payload.data
      })
  }
})

export default tontineSlice.reducer