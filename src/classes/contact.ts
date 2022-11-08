import { Contact } from '../models/contact';

export class ContactObj implements Contact {

    name: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    photo: string;

    constructor(name = '', email = '', phone = '', address = '', birthday = '', photo = '') {
        
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.birthday = birthday;
    this.photo = photo;
    }
};