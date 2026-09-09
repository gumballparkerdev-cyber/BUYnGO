import { createAsyncThunk} from '@reduxjs/toolkit';
import { login, me } from '@/services/auth';
import type { User } from '@/types';



// check auth thunk to check if user is logged in or not
export const checkAuth = createAsyncThunk<{ user: User; accessToken: string }, string, { rejectValue: string }>(
  'auth/checkAuth',
  async (token: string, { rejectWithValue }) => {
    try {
      const user = await me(token);
      return { user, accessToken: token };
    } catch (err) {
      return rejectWithValue('Session expired or invalid token');
    }
  }
)

// this is thunk to login user and handle async logic
export const loginUser = createAsyncThunk<
  { user: User; accessToken: string },
  { username: string; password: string },
  { rejectValue: string }
>(
  'auth/loginUser',

  async ({ username, password }, { rejectWithValue }) => {
    try {
      const loginData = await login(username, password);

      const user = await me(loginData.accessToken);

     return {
  user,
  accessToken: loginData.accessToken,
};
    } catch (err) {
      return rejectWithValue('Wrong credentials');
    }
  }
);
