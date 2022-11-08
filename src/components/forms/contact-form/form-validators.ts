import ContactFormState from "../../../classes/contact-form-state";

const validateForm = (state: ContactFormState): boolean => {

    let result = true;

    Object.keys(state).forEach(key => {
        switch(key) {
            case 'name' : {

            }
        }
    })

    return result;
};

export default validateForm;