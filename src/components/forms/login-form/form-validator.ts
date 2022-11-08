import { LoginFormState } from "./login-form";

export const validateForm = (formState: LoginFormState, setState: React.Dispatch<React.SetStateAction<LoginFormState>>): boolean => {

    let result = true;
    const state = Object.assign({}, formState);

    Object.keys(state).forEach(key => {
        switch (key) {
            case 'login': {
                const field = state[key];
                field.error = null;

                if (field.value.length < 1) {

                    result = false;
                    field.error = 'Обязательное поле';
                }                
                
                break;
            };
            case 'password': {
                const field = state[key];
                field.error = null;

                if (field.value.length < 1) {

                    result = false;
                    field.error = 'Обязательное поле';
                }

                break;
            };
            default: {
                state.login.error = null;
                state.password.error = null;
            };
        };
    });
       
    setState(state);

    return result;
};