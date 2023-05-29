import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.2.7:1337/api' }),
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
          url: '/auth/local',
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: { identifier, password },
        }),
      }),
    }),
  });
  
  export const { useRegisterMutation, useLoginMutation } = authApi;



  
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