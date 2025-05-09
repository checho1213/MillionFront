import { configureStore } from '@reduxjs/toolkit'
import propertyReducer from '../ui/properties/state/propertySlice'

export const store = configureStore({
  reducer: {
    properties: propertyReducer,
  },
})
