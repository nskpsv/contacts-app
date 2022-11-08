import { Contact } from "../models/contact";
import { ContactObj } from "./contact";
import type { Field, FormState } from '../models/state';


export class ContactFormState implements FormState {

    [key: string]: Field;

    constructor(contact: Contact = new ContactObj()) {
        Object.keys(contact)
            .forEach(key => {
                this[key] = {
                    value: contact[key as keyof Contact],
                    error: null
                }
            });
    };
};

export default ContactFormState;