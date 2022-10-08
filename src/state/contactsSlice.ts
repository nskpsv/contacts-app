import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkResponseError } from "../api/utils";
import { ContactsResponse } from "../models/api";
import { Contact } from "../models/contact";
import { ContactsListState } from "../models/state";
import { RootState } from "./store";

const initialState: ContactsListState = {
    status: undefined,
    list: [],
    error: null
};

export const getContacts = createAsyncThunk<Contact[], number>(
    'contacts/getContacts',
    async (id, { rejectWithValue }) => {
        const response = await fetch(`http://localhost:4000/contacts?id=${id}`);

        checkResponseError(response, rejectWithValue);

        const contacts = await response.json() as ContactsResponse[];
        return contacts[0].contacts ;
    }
); 

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
};

const getRandomPhoto = (): string => {
    enum gender {'men', 'women'};
    const random = (n: number) => Math.round(Math.random() * n);
    
    return `https://randomuser.me/api/portraits/${gender[random(1)]}/${random(90)}.jpg` ;
};

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
                contact.photo = getRandomPhoto();
                return contact;
            });
            state.status = "fulfilled";
        });

        builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.status = 'rejected';
        });
    }
});

export const selectList = (state: RootState) => state.contacts.list;
export const selectError = (state: RootState) => state.contacts.error;
export const selectStatus = (state: RootState) => state.contacts.status;
export const selectContactsState = (state: RootState) => state.contacts;

export default contactsSlice.reducer;