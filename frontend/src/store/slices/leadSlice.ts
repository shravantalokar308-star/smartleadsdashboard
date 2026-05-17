import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchLeads = createAsyncThunk('leads/fetch', async (params: any, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/leads', { params });
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch leads');
  }
});

const slice = createSlice({
  name: 'leads',
  initialState: { 
    items: [], 
    meta: null as any, 
    status: 'idle' as string,
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.items = action.payload.data || [];
        state.meta = action.payload.meta || null;
        state.status = 'succeeded';
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.items = [];
      });
  }
});

export default slice.reducer;
