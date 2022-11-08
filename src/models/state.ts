import { Contact } from "./contact";

type FetchStatus = 'pending' | 'fulfilled' | 'rejected';

export type Field = { value: string, error: string | null };

export type AuthState = {
    userName: string | null,
    userPhoto: string,
    userId: number | null,
    isLogin: boolean,
    status: FetchStatus | undefined,
    error: string | null
};

export type ContactsListState = {
    status: FetchStatus | undefined,
    list: Contact[],
    error: string | null
};

export interface FormState {
    [key: string]: Field
};