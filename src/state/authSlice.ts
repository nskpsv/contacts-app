import { createAsyncThunk, createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { AuthState } from '../models/state';
import { User } from '../models/user';
import { LoginData } from '../models/api';
import { checkResponseError } from '../api/utils';

const initialState: AuthState = { 
    login: '',
    password: '',
    userName: 'Пользователь Тестович',
    userPhoto: 'https://randomuser.me/api/portraits/men/50.jpg',
    userId: 1,
    isLogin: true,
    status: undefined,
    error: null
};

export const checkUser = createAsyncThunk<User, LoginData>(
    'auth/login',
    async ({login, password}, { rejectWithValue }) => {
        const response = await fetch(`http://localhost:4000/user?login=${login}&password=${password}`);

       checkResponseError(response, rejectWithValue);
            
        const data = await response.json() as User[];
        console.log(data[0]);
        
        return data[0] ;
    }
);

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
};

export const authSlice = createSlice({
    name: 'auth',

    initialState,

    reducers: {
        updateLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload;
        },

        updatePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    },

    extraReducers: (builder) => {
        
        builder.addCase(checkUser.pending, (state) => {
            state.status = 'pending';
            state.error = null;
        });

        builder.addCase(checkUser.fulfilled, (state, action) => {
            const user = action.payload;
            state.error = null;

            if (!user) {
                state.error = 'Невеное имя пользователя или пароль.';
                state.password = '';
                state.status = 'rejected';
                
                return;
            }

            state.userName = user.name;
            state.userId = user.id;
            state.userPhoto = user.photo;
            state.isLogin = true;
            state.login = '';
            state.password = '';
            state.status = 'fulfilled';                      
        });

        builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.status = 'rejected';
        });
    }
});

export const { updateLogin, updatePassword} = authSlice.actions;

export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectError = (state: RootState) => state.auth.error;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectLogin = (state: RootState) => state.auth.login;
export const selectPassword = (state: RootState) => state.auth.password;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectUserPhoto = (state: RootState) => state.auth.userPhoto;
export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;