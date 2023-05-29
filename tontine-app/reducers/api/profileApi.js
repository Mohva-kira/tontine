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
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.2.7:1337/api' }),
  endpoints: (builder) => ({
    addProfile: builder.mutation({
        query: (data) => ({
            url: '/profiles',
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.jwt}`
            },
            body: JSON.stringify(data) ,
          }),
    }),

    getProfiles: builder.query({
        query: () => ({
            url: '/profiles?populate=*',
            headers: {
                
                "Authorization": `Bearer ${user.jwt}`
              },
        })
    })
}),
})

export const {useAddProfileMutation, useGetProfilesQuery} = profileApi

const initialState = {
  profiles : undefined,
}

export const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) =>  {
      builder.addMatcher(profileApi.endpoints.getProfiles.matchFulfilled, (state, action)=> {
      
          state.profiles = action.payload.data
      })
  }
})

export default profileSlice.reducer