import type { User } from "../models/user";
import type { LoginData, AuthResponse } from "../models/api";


const axios = require('axios').default;
const api = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 1000
});

export default {
    login: (login: string): Array<User> => {
        return api.get('user', {
            params: {
                login
            }
        })
            .then(({ data }: AuthResponse) => data);
    }
};