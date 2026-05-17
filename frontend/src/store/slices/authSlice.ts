import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

interface User { id: string; name: string; email: string; role: string }

export const login = createAsyncThunk('auth/login', async (payload: { email: string; password: string }) => {
  const { data } = await api.post('/auth/login', payload);
  localStorage.setItem('token', data.token);
  return data.user as User;
});

export const fetchMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const { data } = await api.get('/auth/me');
    return data.user as User;
  } catch (err) {
    localStorage.removeItem('token');
    return null;
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: null as User | null, status: 'idle' as string, loading: true },
  reducers: { 
    logout(state) { 
      state.user = null; 
      localStorage.removeItem('token'); 
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => { 
        state.user = action.payload; 
        state.status = 'succeeded'; 
        state.loading = false;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
