import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/interfaces';

interface UserState {
  user: User;
  isLoading: boolean;
  error: string;
}

const initialState:UserState = {
  user: {},
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state) {
      state.isLoading = true;
    },
    loginUserSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.user = action.payload;
      state.error = '';
    },
    loginUserFail(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
});

export const { loginUser, loginUserSuccess, loginUserFail } = userSlice.actions;

export default userSlice.reducer;