import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    mobileapidata: [],
    acapidata: [],
    furnitureapidata: [],
    watchapidata: []
  },
  reducers: {
    increment: (state, action) => {
      state.value = action.payload
    },
    mobileDataReducer: (state, action) =>{
        state.mobileapidata = action.payload; 
    },
    acDataReducer: (state, action) =>{
        state.acapidata = action.payload; 
    },
    furnitureDataReducer: (state, action) =>{
        state.furnitureapidata = action.payload; 
    },
    watchDataReducer: (state, action) =>{
        state.watchapidata = action.payload; 
    },
  },
})

export const { increment, mobileDataReducer, acDataReducer, furnitureDataReducer, watchDataReducer  } = counterSlice.actions

export default counterSlice.reducer
