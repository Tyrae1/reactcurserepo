import {configureStore} from "@reduxjs/toolkit";
import chatsReducer from "../features/chats/chatsSlice"
import uiReducer from "../features/ui/uiSlice"

export const store = configureStore({
    reducer: {
        chats: chatsReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;