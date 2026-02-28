import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'searches',
  initialState: {
    search_options: [],
    loading: true,
  },
  reducers: {
    set_search_opts: (state, action) => {
      state.search_options = action.payload
    },
    set_loading: (state, action) => {
      state.loading = action.payload
    }
  },
})

export const apiSlice = createSlice({
  name: 'apis',
  initialState: {
    // port: 'http://localhost:3000',
    port: 'http://127.0.0.1:8000', // python
  }
})

export const { set_search_opts, set_loading } = searchSlice.actions

export const searchReducer = searchSlice.reducer
export const apiReducer = apiSlice.reducer