import { LoginData } from '../models/api';
import type { Field } from '../models/form';

export class LoginFormState {

    email: Field
    password: Field

    constructor(loginData?: LoginData) {
        this.email = {
            value: loginData?.login?.email || '',
            error: null
        };
        this.password = {
            value: loginData?.login?.password || '',
            error: null
        };
    };
};