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
export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.2.7:1337/api' }),
  endpoints: (builder) => ({
    addPayment: builder.mutation({
        query: (data) => ({
            url: '/payments',
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.jwt}`
            },
            body: JSON.stringify(data) ,
          }),
    }),

    getPayment: builder.query({
        query: () => ({
            url: '/payments?populate=*',
            headers: {
                
                "Authorization": `Bearer ${user.jwt}`
              },
        })
    })
}),
})

export const {useAddPaymentMutation, useGetPaymentQuery} = paymentApi

const initialState = {
  payments : undefined,
}

export const tontineSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) =>  {
      builder.addMatcher(paymentApi.endpoints.getPayment.matchFulfilled, (state, action)=> {
      
          state.payments = action.payload.data
      })
  }
})

export default tontineSlice.reducer