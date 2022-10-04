import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { AuthState } from '../models/state';

const initialState: AuthState = {   
    isLogin: false,
    isFetching: false,
    error: ''
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateLoginStatus: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
        updateError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        updateFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        }
    }
});

export const { updateLoginStatus, updateError, updateFetching } = authSlice.actions;
export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;