import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store";

export type Toast = {type: "error" | "success" | "info"; message: string};

export type UIState = {
    activeChatId: string | null;
    inputDraftByChatId: Record<string, string>;
    isStreamingByChatId: Record<string, boolean>;
    toast?: Toast;
};

const initialState: UIState = {
    activeChatId: null,
    inputDraftByChatId: {},
    isStreamingByChatId: {},
    toast: undefined,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setActiveChatId(state, action: PayloadAction<string | null>) {
            state.activeChatId = action.payload;
        },
        setDraft(state, action: PayloadAction<{chatId: string; draft: string}>) {
            state.inputDraftByChatId[action.payload.chatId] = action.payload.draft;
        },
        setStreaming(state, action: PayloadAction<{chatId: string; isStreaming: boolean}>) {
            state.isStreamingByChatId[action.payload.chatId] = action.payload.isStreaming;
        },
        showToast(state, action: PayloadAction<Toast>) {
            state.toast = action.payload;
        },
        clearToast(state) {
            state.toast = undefined;
        },
        uiHydrated(state, action: PayloadAction<Partial<UIState>>) {
            return {...state, ...action.payload};
        },
    },
});

export const { setActiveChatId, setDraft, setStreaming, showToast, clearToast, uiHydrated } = uiSlice.actions;

export default uiSlice.reducer;

export const selectActiveChatId = (s: RootState) => s.ui.activeChatId;