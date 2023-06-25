import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from "@reduxjs/toolkit";

// let user;
// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('@user')
//     console.log('getData', jsonValue)
//     if (jsonValue) {
//       user = JSON.parse(jsonValue)
//     }
//     return jsonValue
//   } catch (e) {
//     // error reading value

//     console.log('error', e)
//   }
// }

// getData() 

// console.log('le user', user)
// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
     baseUrl: 'http://152.228.174.182:1337/api',
     prepareHeaders: async (headers) => {
      const user = JSON.parse (await AsyncStorage.getItem('@user'))

        console.log('state user', user)
      if (user ) {
          headers.set('Authorization', `Bearer ${user.jwt}`)
          headers.set('Content-Type', `application/json`)
      }
      return headers
  },
  credentials: 'include', // This allows server to set cookies
    
    },
     ),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['profile'],
  
  endpoints: (builder) => ({
    addProfile: builder.mutation({
        query: (data) => ({
            url: '/profiles',
            method: 'POST',
       
            body: JSON.stringify(data) ,
          }),
      
    }),

    getProfiles: builder.query({
        query: (id) => ({
            url: `/profiles?filters[user][id]=${id}&populate=*`,
          
        }),
        providesTags: ['profile']
    }),
    getSingleProfile:  builder.query({
      query: (id) => ({
          url: `/profiles/${id}?populate=*`,
        
      }),
      providesTags: ['profile']
  }),
}),
})

export const {useAddProfileMutation, useGetProfilesQuery, useGetSingleProfileQuery} = profileApi

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