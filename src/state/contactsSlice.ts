import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../models/contact";
import { ContactsListState } from "../models/state";
import { selectUserId } from "./authSlice";
import { useAppSelector } from "./hooks";
import { RootState } from "./store";

const initialState: ContactsListState = {
    status: undefined,
    list: [],
    error: null
};

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
};

const getRandomPhoto = (): string => {
    enum gender {'men', 'women'};
    const random = (n: number) => Math.round(Math.random() * n);
    
    return `https://randomuser.me/api/portraits/${gender[random(1)]}/${random(90)}.jpg` ;
};

export const getContacts = createAsyncThunk<Contact[], string>(
    'contacts/getContacts',
    async (token) => {
        const response = await fetch(`http://localhost:4000/contacts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const contacts = await response.json() as Contact[];
        
        return contacts ;
    }
); 

export const updateContact = createAsyncThunk<Contact, Contact>(
    'contacts/updateContact',
    async (contact) => {
        const id = useAppSelector(selectUserId);

        const response = await fetch(`http://localhost:4000/contacts/${id}/`)
    }
) 

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getContacts.pending, (state) => {
            state.status = "pending";
            state.error = null;

        });

        builder.addCase(getContacts.fulfilled, (state, action) => {

            state.list = action.payload.map(contact => {
                contact.photo = contact.photo || getRandomPhoto();
                return contact;
            });

            state.status = "fulfilled";
        });

        builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.status = 'rejected';
            state.list = [];
        });
    }
});

export const selectList = (state: RootState) => state.contacts.list;
export const selectError = (state: RootState) => state.contacts.error;
export const selectStatus = (state: RootState) => state.contacts.status;
export const selectContactsState = (state: RootState) => state.contacts;

export default contactsSlice.reducer;