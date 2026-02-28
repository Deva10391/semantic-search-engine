import { configureStore } from '@reduxjs/toolkit'
import { searchReducer, apiReducer } from '../Store/Slice'

export default configureStore({
  reducer: {
    searches: searchReducer,
    api: apiReducer,
  },
})