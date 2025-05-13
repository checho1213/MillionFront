import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProperties, fetchPropertiesByFilters } from '../../../app/properties/useCases/fetchProperties'

export const fetchPropertiesThunk = createAsyncThunk(
  'properties/fetch',
  async () => await fetchProperties()
)

export const fetchFilteredPropertiesThunk = createAsyncThunk(
  'properties/fetchFiltered',
  async (filters) => {    
    debugger
    const params = new URLSearchParams(filters);
     const data = await fetchPropertiesByFilters(`${params.toString()}`);
     return data;
    ;
  }
);

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

      .addCase(fetchFilteredPropertiesThunk.pending, state => {
        
        state.loading = true;
      })
      .addCase(fetchFilteredPropertiesThunk.fulfilled, (state, action) => {        
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFilteredPropertiesThunk.rejected, (state, action) => {
        
        state.loading = false;
        state.error = action.error.message;
      });
  },
})

export default propertySlice.reducer
