import { Contact } from '../models/contact';

export class ContactObj implements Contact {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  photo: string;
  id: number | undefined;
  userId: number | null;

  constructor(
    name = '',
    email = '',
    phone = '',
    address = '',
    birthday = '',
    photo = '',
    userId: number | null = null,
    id?: number | undefined
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.birthday = birthday;
    this.photo = photo;
    this.userId = userId;
    this.id = id;
  }
}
