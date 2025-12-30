import {configureStore} from "@reduxjs/toolkit";
import chatsReducer from "../features/chats/chatsSlice";
import uiReducer from "../features/ui/uiSlice";
import messagesReducer from "../features/messages/messageSlice";
import settingsReducer from "../features/settings/settingSlice";

export const store = configureStore({
    reducer: {
        chats: chatsReducer,
        ui: uiReducer,
        messages: messagesReducer,
        settings: settingsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;