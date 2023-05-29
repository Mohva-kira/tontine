// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from "@reduxjs/toolkit";

let user;
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user')
    console.log('getData', jsonValue)
    if (jsonValue) {
      user = JSON.parse(jsonValue)
    }
    return jsonValue
  } catch (e) {
    // error reading value

    console.log('error', e)
  }
}

getData()
// Define a service using a base URL and expected endpoints
export const tontineApi = createApi({
  reducerPath: 'tontineApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.2.7:1337/api' }),
  endpoints: (builder) => ({
    getTontine: builder.query({
      query: (data) => {
        
       
        return {
            url:`/tontines?populate=*`,
            headers: {
              "Authorization": `Bearer ${user.jwt}`,
              },
        }
        },
       
      
    }),

    getTontineDetails : builder.query({
        query: id => ({
          url: `/tontines/${id}?populate=*`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.jwt}`
          },
        })
    }),
    addTontine: builder.mutation({
      query: (data) => ({
        url: '/tontines',
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.jwt}`
        },
        body: JSON.stringify(data) ,
      }),
    }),

    updateTontine: builder.mutation({
      query: (data) => ({
        url: `/tontines/${data?.data.id}`,
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.jwt}`
        },
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