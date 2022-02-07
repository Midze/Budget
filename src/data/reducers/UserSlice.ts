import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphQLError } from 'graphql';
import { User } from './../types/interfaces';

interface UserState {
  user: User,
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
    loginUser(state, action: PayloadAction<{ email: string; password: string; }>) {
      state.isLoading = true;
    },
    loginUserSuccess(state, action: PayloadAction<{user: User} & {token: string}>) {
      console.log('action.payload', action.payload);
      const { token, user } = action.payload;
      localStorage.setItem('token', token);
      state.isLoading = false;
      state.user = {...user};
      state.error = '';
    },
    loginUserFail(state, action: PayloadAction<GraphQLError>) {
      state.isLoading = false;
      state.error = action.payload.message;
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
    getUserFail(state, action: PayloadAction<GraphQLError>) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    logoutUser(state) {
      localStorage.clear();
      state.user = initialState.user;
      state.error = initialState.error;
      state.isLoading = false;
    },
  }
});

export const {
  loginUser,
  loginUserSuccess,
  loginUserFail,
  getUser,
  getUserSuccess,
  getUserFail,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;