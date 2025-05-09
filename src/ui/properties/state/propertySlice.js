import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProperties } from '../../../app/properties/useCases/fetchProperties'

export const fetchPropertiesThunk = createAsyncThunk(
  'properties/fetch',
  async () => await fetchProperties()
)

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPropertiesThunk.pending, state => {
        state.loading = true
      })
      .addCase(fetchPropertiesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchPropertiesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default propertySlice.reducer
