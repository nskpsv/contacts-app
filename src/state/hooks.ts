import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import type { LoginData } from '../models/api';
import {
  selectError,
  selectIsLogin,
  selectAuthStatus,
  loginUser,
} from './authSlice';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
