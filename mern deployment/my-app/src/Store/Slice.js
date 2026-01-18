import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'searches',
  initialState: {
    search_options: [],
  },
  reducers: {
    set_search_opts: (state, action) => {
      state.search_options = action.payload
    },
  },
})

export const { set_search_opts } = searchSlice.actions

export default searchSlice.reducer