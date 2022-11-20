import { Contact } from '../models/contact';
import { ContactObj } from './contact';
import type { Field } from '../models/form';

export class ContactFormState {
  address: Field;
  birthday: Field;
  email: Field;
  name: Field;
  phone: Field;
  photo: Field;

  constructor(contact: Contact = new ContactObj()) {
    this.address = { value: contact.address, error: undefined };
    this.birthday = { value: contact.birthday, error: undefined };
    this.email = { value: contact.email, error: undefined };
    this.name = { value: contact.name, error: undefined };
    this.phone = { value: contact.phone, error: undefined };
    this.photo = { value: contact.photo, error: undefined };
  }
}
