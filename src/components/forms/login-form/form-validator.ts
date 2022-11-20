import { LoginFormState } from '../../../classes/login-form-state';

export const validateForm = (
  formState: LoginFormState,
  setState: React.Dispatch<React.SetStateAction<LoginFormState>>
): boolean => {
  let result = true;
  const state = Object.assign({}, formState);

  Object.keys(state).forEach((key) => {
    switch (key) {
      case 'email': {
        const field = state[key];
        field.error = undefined;

        if (field.value.length < 1) {
          result = false;
          field.error = 'Обязательное поле';
        }

        break;
      }
      case 'password': {
        const field = state[key];
        field.error = undefined;

        if (field.value.length < 1) {
          result = false;
          field.error = 'Обязательное поле';
        }

        break;
      }
      default: {
        state.email.error = undefined;
        state.password.error = undefined;
      }
    }
  });

  setState(state);

  return result;
};
