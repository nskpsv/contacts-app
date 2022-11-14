import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { AuthState } from '../models/state';
import { LoginData, LoginResponse } from '../models/api';


const initialState: AuthState = {
    userName: '',
    userPhoto: '',
    id: null,
    isLogin: false,
    status: undefined,
    error: null,
    accessToken: null,
    remember: false
};

export const loginUser = createAsyncThunk<LoginResponse, LoginData, {rejectValue: string}>(

    'auth/loginUser', async (data, thunkAPI) => {

        if (data.login) {
            const response = await fetch(`http://localhost:4000/login`, {
                method: 'POST',
                body: JSON.stringify({ email: data.login.email, password: data.login.password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                return thunkAPI.rejectWithValue(await response.json());
            }
            return await response.json();
        }

        if (data.grantAccess) {

            const response = await fetch(`http://localhost:4000/users/${data.grantAccess.id}`, {
                headers: {
                    Authorization: `Bearer ${data.grantAccess.accessToken}`
                }
            });
            if (response.ok) {
                
                const user = await response.json();
                return {accessToken: data.grantAccess.accessToken, user };
            }
            else {
                localStorage.clear();
                return thunkAPI.rejectWithValue(response.statusText);
            }
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        clearError: (state) => {
            state.error = null;
        },

        setRemember: (state, action: PayloadAction<boolean>) => {
            state.remember = action.payload
        },

        logOut: (state) => {
            state.userName = '',
            state.userPhoto = '',
            state.id = null,
            state.isLogin = false,
            state.status = undefined,
            state.error = null,
            state.accessToken = null,
            state.remember = false

            localStorage.clear();
            sessionStorage.clear();
        }
    },

    extraReducers: (builder) => {

        builder.addCase(loginUser.pending, (state) => {
            
            state.status = 'pending';
            state.error = null;
            state.isLogin = false;
        });

        builder.addCase(loginUser.fulfilled, (state, action) => {
            
            const user = action.payload.user;
            
            state.userName = user.name;
            state.id = user.id;
            state.userPhoto = user.photo;
            state.isLogin = true;
            state.accessToken = action.payload.accessToken;
            state.status = 'fulfilled';

            if (state.remember) {
                localStorage.setItem('user', JSON.stringify(
                    {
                        id: state.id,
                       accessToken: action.payload.accessToken
                    }
                ))
            } else {                
                sessionStorage.setItem('user', JSON.stringify(
                    {
                        id: state.id,
                       accessToken: action.payload.accessToken
                    }
                ))
            }
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            

            state.accessToken = null;
            state.remember = false;
            state.id = null;

            switch(action.payload) {

                case 'Unauthorized' :
                    state.error = `Время сессии истекло`;
                    state.status = 'rejected';
                    break;
        
                case 'Cannot find user' :
                case 'Incorrect password' :
                    state.error = `Неверный email или пароль`;
                    state.status = 'rejected';
                    break;

                default:
                    state.error = `Сервер недоступен`;
                    state.status = 'rejected';
            }
        });
    }
});

export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectError = (state: RootState) => state.auth.error;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectUserId = (state: RootState) => state.auth.id;
export const selectUserPhoto = (state: RootState) => state.auth.userPhoto;
export const selectToken = (state: RootState) => state.auth.accessToken;
export const selectRemember = (state: RootState) => state.auth.remember;
export const selectAuthState = (state: RootState) => state.auth;

export const { clearError, setRemember, logOut } = authSlice.actions;

export default authSlice.reducer;