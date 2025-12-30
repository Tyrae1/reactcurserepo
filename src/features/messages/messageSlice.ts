import { createEntityAdapter, createSlice, nanoid, createSelector} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
export type MessageRole = "user" | "assistant" | "system";
export type MessageStatus = "draft" | "sending" | "streaming" | "done" | "error";
export type Message = {
    id: string;
    chatId: string;
    role: MessageRole;
    content: string;
    createdAt: string;
    status: MessageStatus;
    error?: string;
};

const messagesAdapter = createEntityAdapter<Message>({
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

type MessagesState = ReturnType<typeof messagesAdapter.getInitialState>;
const initialState: MessagesState = messagesAdapter.getInitialState();

export const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        userMessageAdded: {
            reducer(state, action: PayloadAction<Message>) {
                messagesAdapter.addOne(state, action.payload);
            },
            prepare(chatId: string, content: string) {
                const now = new Date().toISOString();
                return {
                    payload: {
                        id: nanoid(),
                        chatId,
                        role: "user",
                        content,
                        createdAt: now,
                        status: "done",
                    } satisfies Message,
                };
            },
        },
        assistantPlaceholderAdded: {
            reducer(state, action: PayloadAction<Message>) {
                messagesAdapter.addOne(state, action.payload);
            },
            prepare(chatId: string){
                const now = new Date().toISOString();
                return {
                    payload: {
                        id: nanoid(),
                        chatId,
                        role: "assistant",
                        content: "",
                        createdAt: now,
                        status: "sending",
                    } satisfies Message,
                };
            },
        },

        assistantMessagePatched(
            state,
            action: PayloadAction<{id: string, changes: Partial<Message>}>
        ) {
            messagesAdapter.updateOne(state, {id: action.payload.id, changes: action.payload.changes});
        },

        messagesByChatDeleted(state, action: PayloadAction<{chatId: string}>) {
            const ids = Object.values(state.entities)
                .filter((m) => m?.chatId === action.payload.chatId)
                .map((m) => m!.id);
            messagesAdapter.removeMany(state, ids);
        },

        messagesHydrated(state, action: PayloadAction<Message[]>) {
            messagesAdapter.setAll(state, action.payload);
        },
    },
});

export const {
    userMessageAdded,
    assistantPlaceholderAdded,
    assistantMessagePatched,
    messagesByChatDeleted,
    messagesHydrated,
} = messageSlice.actions;

export default messageSlice.reducer;
export const messagesSelectors = messagesAdapter.getSelectors<RootState>((s) => s.messages);
export const makeSelectMessagesByChatId = (chatId: string) =>
    createSelector(
        [(s: RootState) => messagesSelectors.selectAll(s)],
        (all) => all.filter((m) => m.chatId === chatId)
    );
