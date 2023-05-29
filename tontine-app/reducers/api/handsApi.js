import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
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
// Define a service using a base URL and expected endpoints
export const handsApi = createApi({
  reducerPath: 'handsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.2.7:1337/api' }),
  endpoints: (builder) => ({
    getHands: builder.query({
      query: (data) => {
        
       
        return {
            url:`/hands?populate=*&pagination[page]=1&pagination[pageSize]=100`,
            headers: {
              "Authorization": `Bearer ${user.jwt}`,
              },
        }
        },
       
      
    }),

    getHandsDetails : builder.query({
        query: id => ({
          url: `/hands/${id}?populate=*`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.jwt}`
          },
        })
    }),
    addHands: builder.mutation({
      query: (data) => ({
        url: '/hands',
        method: 'POST',
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
export const { useGetHandsQuery, useAddHandsMutation, useGetHandsDetailsQuery } = handsApi