import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../Store/Slice'

export default configureStore({
  reducer: {
    searches: searchReducer,
  },
})