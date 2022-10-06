import { User } from "./user";

type FetchStatus = 'pending' | 'fulfilled' | 'rejected';

export type AuthState = {
    login: string,
    password: string,
    user: User | null | User[],
    userName: string | null,
    isLogin: boolean,
    status: FetchStatus | undefined,
    error: string | null
};