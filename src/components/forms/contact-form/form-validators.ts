import { ContactFormState } from '../../../classes/contact-form-state';

const validateForm = (
  state: ContactFormState,
  setState: React.Dispatch<React.SetStateAction<ContactFormState>>
): boolean => {
  let result = true;

  const fState = Object.assign({}, state) as ContactFormState;

  Object.keys(state).forEach((key) => {
    switch (key) {
      case 'name': {
        if (!fState.name.value.length) {
          fState.name.error = 'Обязательное поле';
          result = false;
          break;
        }
      }
    }
  });

  setState(fState);
  return result;
};

export default validateForm;
