// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsearch.p.rapidapi.com/' }),
  endpoints: (builder) => ({
    getJobByName: builder.query({
      query: (args) => {
        const {search, query} = args;
        console.log('args:', args)
        return {
            url:`${search}`,
            params: {...query },
            headers: {
                'X-RapidAPI-Key': 'db32da7259mshb66e686406577eep148e74jsn09492d7d853e',
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
              },
        }
        }
        ,
     
      
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetJobByNameQuery } = jobApi