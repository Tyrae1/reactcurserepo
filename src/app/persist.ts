import type {Store} from "@reduxjs/toolkit";
import type {RootState} from "../app/store";
import { chatsHydrated} from "../features/chats/chatsSlice";
import { uiHydrated} from "../features/ui/uiSlice";
import {messagesHydrated} from "../features/messages/messageSlice";
import {settingsHydrated} from "../features/settings/settingSlice";

const STORAGE_KEY = "gpt-chat";

export function hydrateStore(store: Store) {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        const parsed = JSON.parse(raw) as Partial<RootState>;

        if (parsed.chats?.entities) {
            store.dispatch(chatsHydrated(Object.values(parsed.chats.entities)));
        }

        if (parsed.ui) {
            store.dispatch(uiHydrated(parsed.ui));
        }

        if (parsed.messages?.entities) {
            const arr = Object.values(parsed.messages.entities).filter(Boolean);
            store.dispatch(messagesHydrated(arr as any));
        }

        if (parsed.settings) {
            store.dispatch(settingsHydrated(parsed.settings));
        }

    } catch {

    }
}

export function persistStore(store: Store) {
    let timeout: number | undefined;

    store.subscribe(() => {
        window.clearTimeout(timeout);

        timeout = window.setTimeout(() => {
            const state = store.getState();
            const data: Partial<RootState> = {
                chats: state.chats,
                ui: state.ui,
                messages: state.messages,
                settings: state.settings,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }, 300);
    });
}