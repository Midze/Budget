import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/interfaces';

interface UserState {
  user: {
    login: string,
    _id: string,
    email: string,
  },
  isLoading: boolean;
  error: string;
}

const initialState:UserState = {
  user: {
    login: '',
    _id: '',
    email: '',
  },
  isLoading: true,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<User>) {
      state.isLoading = true;
    },
    loginUserSuccess(state, action: PayloadAction<User>) {
      console.log('action.payload', action.payload);
      const { token, user } = action.payload;
      localStorage.setItem('token', token);
      state.isLoading = false;
      state.user = {...user};
      state.error = '';
    },
    loginUserFail(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUser(state, action: PayloadAction<{id: string}>) {
      state.isLoading = true;
    },
    getUserSuccess(state, action: PayloadAction<User>) {
      console.log('action.payload', action.payload);
      state.isLoading = false;
      state.user = action.payload;
      state.error = '';
    },
    getUserFail(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
});

export const { loginUser, loginUserSuccess, loginUserFail, getUser, getUserSuccess, getUserFail } = userSlice.actions;

export default userSlice.reducer;