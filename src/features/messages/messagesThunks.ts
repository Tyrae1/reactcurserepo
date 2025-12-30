import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockChatCompletionStream} from "../../api/mockProvider";
import {
    assistantMessagePatched,
    assistantPlaceholderAdded,
    userMessageAdded,
} from "./messageSlice";
import {setStreaming, showToast} from "../ui/uiSlice";
import {chatTouched} from "../chats/chatsSlice";
import type {RootState} from "../../app/store";

export const sendMessage = createAsyncThunk<
    void,
    {chatId: string; text: string},
    {state: RootState}
>("messages/sendMessage", async ({chatId, text}, {dispatch}) => {
    dispatch(userMessageAdded(chatId, text));
    dispatch(chatTouched({id: chatId}));

    const placeholder = assistantPlaceholderAdded(chatId);
    dispatch(placeholder);

    const assistantId = placeholder.payload.id;
    dispatch(setStreaming({chatId, isStreaming: true}));
    dispatch(assistantMessagePatched({id: assistantId, changes: {status: "streaming"}}));

    try {
        let full = "";
        await mockChatCompletionStream(
            text,
            (chunk) => {
                full += chunk;
                dispatch(assistantMessagePatched({id: assistantId, changes: {content: full}}));
            }
        );

        dispatch(assistantMessagePatched({id: assistantId, changes: { status: "done" }}));
        dispatch(chatTouched({id: chatId}));
    } catch (e: any) {
        dispatch(
            assistantMessagePatched({
                id: assistantId,
                changes: {status: "error", error: e?.message ?? "Unknown error"},
            })
        );
        dispatch(showToast({type: "error", message: "Error assistant message"}));
    } finally {
        dispatch(setStreaming({chatId, isStreaming: false}));
    }
});
