import { Contact } from './contact';
import { User } from './user';

export type LoginData = {
    login?: {
        email: string,
        password: string
    }
    grantAccess?: {
       accessToken: string,
        id: number
    }
};

export type LoginResponse = {
   accessToken: string,
    user: User
};

export type APIError = {
    message: string
};