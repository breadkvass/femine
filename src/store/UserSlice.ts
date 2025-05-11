import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, registerUserThunk, loginUserThunk, logoutUserThunk } from '../utils/api';
import { User } from '../utils/types';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean;
}
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(registerUserThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(registerUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(loginUserThunk.pending, state => {
      state.loading = true;
    })
    .addCase(loginUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('accessToken', action.payload.accessToken); // ← добавить это
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      state.isAuth = true;
    })
    .addCase(loginUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(logoutUserThunk.fulfilled, state => {
      state.user = null;
      state.loading = false;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken'); // ← добавить
      localStorage.removeItem('refreshToken');
      state.isAuth = false; // ← обязательно
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuth = true;
    })
    .addCase(checkAuth.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload as string;
      state.isAuth = false; // ← обязательно
    })
  },
});

export default userSlice.reducer;
