import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Contact } from '../models/contact';
import { ContactsListState } from '../models/state';
import { AppDispatch, RootState } from './store';

const BASE_URL = `http://localhost:4000/contacts`;

const initialState: ContactsListState = {
  status: undefined,
  list: [],
  error: null,
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const getRandomPhoto = (): string => {
  enum gender {
    'men',
    'women',
  }
  const random = (n: number) => Math.round(Math.random() * n);

  return `https://randomuser.me/api/portraits/${gender[random(1)]}/${random(
    90
  )}.jpg`;
};

const toPendingState = (state: ContactsListState) => {
  state.status = 'pending';
  state.error = null;
};

export const getContacts = createAsyncThunk<Contact[], string>(
  'contacts/getContacts',
  async (accessToken) => {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return (await response.json()) as Contact[];
  }
);

export const createContact = createAsyncThunk<
  Contact,
  { contact: Contact; accessToken: string },
  { rejectValue: string }
>('contacts/createContact', async ({ contact, accessToken }, thunkAPI) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(contact),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    thunkAPI.rejectWithValue(await response.json());
  }

  return await response.json();
});

export const editContact = createAsyncThunk<
  Contact,
  { contact: Contact; accessToken: string },
  { rejectValue: string }
>('contacts/editContact', async ({ contact, accessToken }, thunkAPI) => {
  const response = await fetch(BASE_URL + `/${contact.id}`, {
    method: 'PUT',
    body: JSON.stringify(contact),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    thunkAPI.rejectWithValue(await response.json());
  }

  return await response.json();
});

export const deleteContact = createAsyncThunk<
  void,
  { id: number; accessToken: string },
  { rejectValue: string; dispatch: AppDispatch }
>('contacts/deleteContact', async ({ id, accessToken }, thunkAPI) => {
  console.log('thunk');

  const response = await fetch(BASE_URL + `/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    thunkAPI.dispatch(deleteListItem(id));
  } else {
    thunkAPI.rejectWithValue(await response.json());
  }
});

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    deleteListItem: (state, action: PayloadAction<number>) => {
      console.log('reducer');
      console.log(action);

      const index = state.list.findIndex(
        (contact) => contact.id === action.payload
      );
      console.log(index);

      state.list.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContacts.pending, (state) => {
      toPendingState(state);
    });

    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.list = action.payload.map((contact) => {
        contact.photo = contact.photo || getRandomPhoto();
        return contact;
      });
      state.list.sort((a, b) => a.name.localeCompare(b.name));
      state.status = 'fulfilled';
    });

    builder.addCase(createContact.pending, (state) => {
      toPendingState(state);
    });

    builder.addCase(createContact.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.list.sort((a, b) => a.name.localeCompare(b.name));
      state.status = 'fulfilled';
    });

    builder.addCase(editContact.pending, (state) => {
      toPendingState(state);
    });

    builder.addCase(editContact.fulfilled, (state, action) => {
      const index = state.list.findIndex(
        (contact) => contact.id === action.payload.id
      );

      state.list.splice(index, 1, action.payload);
      state.status = 'fulfilled';
    });

    builder.addCase(deleteContact.pending, (state) => {
      toPendingState(state);
    });

    builder.addCase(deleteContact.fulfilled, (state) => {
      state.status = 'fulfilled';
    });

    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'rejected';
    });
  },
});

export const selectList = (state: RootState) => state.contacts.list;
export const selectError = (state: RootState) => state.contacts.error;
export const selectContactsStatus = (state: RootState) => state.contacts.status;
export const selectContactsState = (state: RootState) => state.contacts;

export const { deleteListItem } = contactsSlice.actions;

export default contactsSlice.reducer;
