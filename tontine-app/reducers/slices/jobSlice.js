import { createSlice } from "@reduxjs/toolkit";
import { jobApi } from "../api/jobApi";

const initialState = {
    jobs : undefined,
}

export const jobSlice = createSlice({
    name: 'Job',
    initialState,
    reducers: {},
    extraReducers: (builder) =>  {
        builder.addMatcher(jobApi.endpoints.getJobByName.matchFulfilled, (state, action)=> {
        
            state.jobs = action.payload.data
        })
    }
})

export default jobSlice.reducer