export type Contact = {
    name: string,
    email: string,
    phone: string,
    address: string,
    birthday: string
};

export type ContactWithIndex = {
    index: number,
    contact: Contact
}