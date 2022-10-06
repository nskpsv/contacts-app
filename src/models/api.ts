import type { User } from "../models/user";

export type LoginData = {
    login: string,
    password: string
};

export type Response = {
    data: Array<User>
    [prop: string]: any
}