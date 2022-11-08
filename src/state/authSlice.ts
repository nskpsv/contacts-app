import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { AuthState } from '../models/state';
import { User } from '../models/user';
import { LoginData } from '../models/api';

const initialState: AuthState = {
    userName: '',
    userPhoto: '',
    userId: null,
    isLogin: false,
    status: undefined,
    error: null
};

export const checkUser = createAsyncThunk<Array<User>, LoginData> (

        'auth/login', async ({login, password}) => {
            
            const response = await fetch(`http://localhost:4000/user?login=${login}&password=${password}`);
            
            return await response.json()
        }
    );

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {

        builder.addCase(checkUser.pending, (state) => {
            state.status = 'pending';
            state.error = null;
            state.isLogin = false;
        });

        builder.addCase(checkUser.fulfilled, (state, action) => {

            const user = action.payload[0];
            state.error = null;            
            
            if (!user) {
                state.error = 'Невеное имя пользователя или пароль.';
                state.status = 'rejected';

                return;
            }

            state.userName = user.name;
            state.userId = user.id;
            state.userPhoto = user.photo;
            state.isLogin = true;
            state.status = 'fulfilled';
        });

        builder.addCase(checkUser.rejected, (state) => {
            state.error = `Сервер недоступен`
            state.status = 'rejected';
        });
    }
});

export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectError = (state: RootState) => state.auth.error;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectUserPhoto = (state: RootState) => state.auth.userPhoto;
export const selectAuthState = (state: RootState) => state.auth;

export const { clearError } = authSlice.actions;

export default authSlice.reducer;