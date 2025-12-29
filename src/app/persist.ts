import type {Store} from "@reduxjs/toolkit";
import type {RootState} from "./store";
import { chatsHydrated} from "../features/chats/chatsSlice";
import { uiHydrated} from "../features/ui/uiSlice";

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
            store.dispatch(chatsHydrated(Object.values(parsed.chats.entities)));
        }

        if (parsed.ui) {
            store.dispatch(uiHydrated(parsed.ui));
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
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }, 300);
    });
}