import { createSlice} from '@reduxjs/toolkit';
import type { AuthState } from '@/types';
import { loginUser, checkAuth } from './authThunk';


// initial state for the auth slice
export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  role: null,
  authInitialized: false, // check if the auth state has been initialized
};

 // this is slice to handle auth state and actions
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  setToken: (state, action) => { // this is used to set the token in the state when the user is logged in
    state.token = action.payload
  },

  setAuthInitialized: (state) => { // We've finished checking whether an existing session exists
    state.authInitialized = true // mark the auth state as initialized
  },

  logout: (state) => {
    state.user = null
    state.token = null
    state.role = null
  },
},


// builder inside the authSlice to handle async thunk state
   extraReducers: (builder) => {
    builder
    // handle loginUser thunk state
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.accessToken;
          state.role = action.payload.user.role === 'admin' ? 'admin' : 'user';
          state.authInitialized = true;
        })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'An unknown error occurred in loginUser';
      state.authInitialized = true; // mark the auth state as initialized even if loginUser fails
    })

    
    // handle checkAuth thunk state
    .addCase(checkAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(checkAuth.fulfilled, (state , action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      state.role = action.payload.user.role === 'admin' ? 'admin' : 'user';
      state.authInitialized = true; // mark the auth state as initialized after successful checkAuth
    })
    .addCase(checkAuth.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.role = null;
      state.error = action.payload ?? 'Session expired';
      state.authInitialized = true; // mark the auth state as initialized even if checkAuth fails

    })
   }

})




export const { logout, setAuthInitialized , setToken } = authSlice.actions
export default authSlice.reducer;