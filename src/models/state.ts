import { Contact } from "./contact";

type FetchStatus = 'pending' | 'fulfilled' | 'rejected';

export type AuthState = {
    login: string,
    password: string,
    userName: string | null,
    userId: number | null,
    isLogin: boolean,
    status: FetchStatus | undefined,
    error: string | null
};

export type ContactsListState ={
    status: FetchStatus | undefined,
    list: Contact[],
    error: string | null
}