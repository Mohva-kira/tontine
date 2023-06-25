import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@user', jsonValue)
    router.push('/dashboard'); 
  } catch (e) {
    // saving error
    console.log('error', e)
  }
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://152.228.174.182:1337/api' }),
    endpoints: (builder) => ({
      // Endpoint pour l'inscription
      register: builder.mutation({
        query: (body) => ({
          url: '/auth/local/register',
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body,
        }),
      }),
      // Endpoint pour la connexion
      login: builder.mutation({
        query: ({ identifier, password }) => ({
          url: '/auth/local/?populate=*',
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: { identifier, password },
        }),
      }),
      forgetPassword: builder.mutation({
        query: (val) => ({
          url: '/auth/forgot-password',
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body:  val,
        }),
      }),
      getMe: builder.query({
        query: id => ({
          url: `/users/me`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.jwt}`
          },
        }),
      }),
    }),
  });
  
  export const { useRegisterMutation, useLoginMutation, useGetMeQuery, useForgetPasswordMutation } = authApi;



  
const initialState = {
  auth : undefined,
}
 
export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {},
    extraReducers: (builder) =>  {
        builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, action)=> {

            console.log('youhou', action.payload)
            
        })

        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action)=> {
          state.user = action.payload
          console.log('youhou', action.payload)
          
      })
    }
})

export default authSlice.reducer