import { User } from "../models/user";
import { updateError, updateFetching } from "../state/authSlice";
import { useAppDispatch } from "../state/hooks";

type LoginData = {
    login: string,
    password: string
};

type Response = {
    data: Array<User>
    [prop: string]: any
}

const dispatch = useAppDispatch();

const axios = require('axios').default;
const api = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 1000
});

export default {
    login: ({login, password}: LoginData) => {
        dispatch(updateFetching(true));
        
        api.get('user', {
            params: {
                login
            }
        })
        .then(({ data }: Response) => {
            if (!data.length) {
                dispatch(updateError('Пользователя с таким именем не существует'));
                return;
            }


        });
    }
};