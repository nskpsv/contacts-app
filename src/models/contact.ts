export type Contact = {
    name: string,
    email: string,
    phone: string,
    address: string,
    birthday: string,
    photo: string
};

export type ContactWithId = {
    id: number,
    contact: Contact
}