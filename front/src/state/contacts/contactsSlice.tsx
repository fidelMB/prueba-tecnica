import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { FormFields } from "../../components/FormDialog";

const back_url = import.meta.env.VITE_BACK_URL

export interface Contact {
    birthday: string;
    city: string;
    company: string;
    email: string;
    id: string;
    last_name: string;
    name: string;
    notes: string;
    phone: string;
    position: string;
    state: string;
    street: string;
    favorite: string;
}

interface ContactsState {
    contacts: Contact[];
}

const initialState: ContactsState = {
    contacts: [],
}

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
                state.contacts = action.payload;
            })
            .addCase(addContact.fulfilled, (state, action: PayloadAction<Contact>) => {
                state.contacts.push(action.payload)
            })
            .addCase(editContact.fulfilled, (state, action: PayloadAction<Contact>) => {
                const index = state.contacts.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
            })
            .addCase(deleteContact.fulfilled, (state, action: PayloadAction<string>) => {
                const index = state.contacts.findIndex(c => c.id === action.payload);
                if (index !== -1) {
                    state.contacts.splice(index, 1);
                }
            })
            .addCase(favoriteContact.fulfilled, (state, action: PayloadAction<Contact>) => {
                const index = state.contacts.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
            });
    }
});

export const fetchContacts = createAsyncThunk<Contact[]>(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get<Contact[]>(back_url + '/api/contacts');
    return response.data;
  }
);

export const addContact = createAsyncThunk<Contact, {newContact: FormFields}>(
  'contacts/addContact',
  async ( {newContact} ) => {
    const response = await axios.post<Contact>(back_url + '/api/contacts/', newContact);
    return response.data;
  }
);

export const editContact = createAsyncThunk<Contact, {updatedContact: FormFields, id: string}>(
  'contacts/editContact',
  async ( {updatedContact, id} ) => {
    const response = await axios.patch<Contact>(back_url + '/api/contacts/' + id, updatedContact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk<string, {id: string}>(
  'contacts/deleteContact',
  async ( {id} ) => {
    await axios.delete(back_url + '/api/contacts/' + id);
    return id;
  }
);

export const favoriteContact = createAsyncThunk<Contact, {contact: Contact}>(
  'contacts/favoriteContact',
  async ( {contact} ) => {
    const response = await axios.patch(back_url + '/api/contacts/favorite/' + contact.id, contact);
    return response.data;
  }
);

export default contactsSlice.reducer;