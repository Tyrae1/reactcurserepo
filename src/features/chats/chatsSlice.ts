import {createEntityAdapter, createSlice, nanoid} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store";

export type Chat = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
};

const chatsAdapter = createEntityAdapter<Chat>({
    sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
});

type ChatsState = ReturnType<typeof chatsAdapter.getInitialState>;

const initialState: ChatsState = chatsAdapter.getInitialState();

export const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        chatCreated: {
            reducer(state, action: PayloadAction<Chat>) {
                chatsAdapter.addOne(state, action.payload);
            },
            prepare(title?:string) {
                const now = new Date().toISOString();
                return {
                    payload: {
                        id: nanoid(),
                        title: title?.trim() || "New chat",
                        createdAt: now,
                        updatedAt: now,
                    } satisfies Chat,
                };
            },
        },
        chatRenamed(state, action: PayloadAction<{ id: string; title: string}>) {
            const {id, title} = action.payload;
            const now = new Date().toISOString();
            chatsAdapter.updateOne(state, {id, changes: {title: title.trim(), updateAt: now}});
        },
        chatTouched(state, action: payloadAction<{id: string}>) {
            const now = new Date().toISOString();
            chatsAdapter.updateOne(state, {id: action.payload.id, changes: {updatedAt: now}});
        },
        chatDeleted(state, action: PayloadAction<{id: string}>) {
            chatsAdapter.removeOne(state, action.payload.id);
        },
        chatsHydrated(state, action: PayloadAction<Chat[]>){
            chatsAdapter.setAll(state, action.payload);
        },
    },
});

export const {
    chatCreated,
    chatRenamed,
    chatTouched,
    chatDeleted,
    chatsHydrated,
} = chatsSlice.actions;

export const chatsSelectors = chatsAdapter.getSelectors<RootState>((s) => s.chats);

export default chatsSlice.reducer;