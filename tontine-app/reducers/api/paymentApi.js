import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from "@reduxjs/toolkit";


// Define a service using a base URL and expected endpoints
export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://152.228.174.182:1337/api',
    prepareHeaders: async (headers) => {
      const user = JSON.parse(await AsyncStorage.getItem('@user'))

      console.log('state user', user)
      if (user) {
        headers.set('Authorization', `Bearer ${user.jwt}`)
        headers.set('Content-Type', `application/json`)
      }
      return headers
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addPayment: builder.mutation({
      query: (data) => ({
        url: '/payments',
        method: 'POST',
       
        body: JSON.stringify(data),
      }),
    }),

    getPayment: builder.query({
      query: () => ({
        url: '/payments?populate=*',
       
      })
    }),

    getPaymentDetails: builder.query({
      query: (id) => ({
        url: `/payments/${id}?populate=*`,
       
      })
    }),
  }),
})

export const { useAddPaymentMutation, useGetPaymentQuery, useGetPaymentDetailsQuery } = paymentApi

const initialState = {
  payments: undefined,
}

export const tontineSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(paymentApi.endpoints.getPayment.matchFulfilled, (state, action) => {

      state.payments = action.payload.data
    })
  }
})

export default tontineSlice.reducer