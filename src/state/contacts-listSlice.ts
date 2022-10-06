import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { checkResponseError } from "../api/utils";
import { Contact, ContactWithIndex } from "../models/contact";
import { ContactsListState } from "../models/state";

const initialState: ContactsListState = {
    status: undefined,
    list: null,
    error: null
};

export const getContacts = createAsyncThunk<Contact[], number>(
    'contacts/getContacts',
    async (id, { rejectWithValue }) => {
        const response = await fetch(`http://localhost:4000/contacts?id=${id}`);

        checkResponseError(response, rejectWithValue);

        const contacts = await response.json();
        return contacts as Contact[];
    }
);

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
};

export const contactsListSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getContacts.pending, (state) => {
            state.status = "pending";
            state.error = null;
        });

        builder.addCase(getContacts.fulfilled, (state, action) => {
            state.list = action.payload;
            state.status = "fulfilled";
        });

        builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.status = 'rejected';
        });
    }
})