import { createAsyncThunk, createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { AuthState } from '../models/state';
import { User } from '../models/user';

const initialState: AuthState = { 
    login: '',
    password: '', 
    user: null,
    userName: null, 
    isLogin: false,
    status: undefined,
    error: null
};

export const checkUser = createAsyncThunk<User[], string>(
    'auth/login',
    async (login, { rejectWithValue }) => {
        const response = await fetch(`http://localhost:4000/user?login=${login}`);
        const data = await response.json();
        
        if (!response.ok || response.status < 200 || response.status >= 300) {
            rejectWithValue('Ошибка сервера');
        }
        return data as User[];
    }
);

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
}

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
        })

        builder.addCase(checkUser.fulfilled, (state, action) => {
            const [ user ] = action.payload;
            state.user = action.payload;
            state.error = null;
            if (!user || user.password !== state.password) {
                console.log(user);
                console.log(state.user);
                
                console.log(user.password);
                console.log(state.password);                
                
                state.error = 'Невеное имя пользователя или пароль.';
                state.password = '';
                state.status = 'rejected';
                
                return;
            }

            state.userName = user.name;
            state.status = 'fulfilled';  
            console.log(state);
                      
        })

        builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.status = 'rejected';
        })
    }
});

export const { updateLogin, updatePassword} = authSlice.actions;

export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectError = (state: RootState) => state.auth.error;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectLogin = (state: RootState) => state.auth.login;
export const selectPassword = (state: RootState) => state.auth.password;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;