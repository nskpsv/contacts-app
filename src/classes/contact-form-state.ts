import { Contact } from "../models/contact";
import { ContactObj } from "./contact";
import type { Field } from '../models/form';

export class ContactFormState {
   
    address: Field
    birthday: Field
    email: Field
    name: Field
    phone: Field
    photo: Field

    constructor(contact: Contact = new ContactObj()) {
        console.log('ContactObj constructor');        
        console.log(contact);
        
        this.address = {value: contact.address, error: null};
        this.birthday = {value: contact.birthday, error: null};
        this.email = {value: contact.email, error: null};
        this.name = {value: contact.name, error: null};
        this.phone = {value: contact.phone, error: null};
        this.photo = {value: contact.photo, error: null};
    };
};