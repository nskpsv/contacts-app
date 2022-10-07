import type { User } from "../models/user";
import { Contact } from "./contact";

export type LoginData = {
    login: string,
    password: string
};

export type AuthResponse = {
    data: Array<User>
    [prop: string]: any
};

export type ContactsResponse = {
    id: number,
    contacts: Contact[]
}