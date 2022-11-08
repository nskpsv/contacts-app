import { Contact } from "./contact";

export type LoginData = {
    login: string,
    password: string
};

export type ContactsResponse = {
    id: number,
    contacts: Contact[]
};