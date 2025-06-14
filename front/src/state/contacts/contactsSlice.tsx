import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const back_url = import.meta.env.VITE_BACK_URL

interface Contact {
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
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
        })
    }
});

export const fetchContacts = createAsyncThunk<Contact[]>(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get<Contact[]>(back_url + '/api/contacts');
    return response.data;
  }
);

export const { addContact } = contactsSlice.actions;

export default contactsSlice.reducer;