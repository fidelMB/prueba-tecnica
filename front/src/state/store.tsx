import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './contacts/contactsSlice';

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;