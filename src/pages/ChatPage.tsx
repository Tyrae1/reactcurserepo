import {useEffect, useMemo, useRef, useState} from "react";
import {useParams} from 'react-router-dom';
import {Box, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import {useAppDispatch, useAppSelector} from "../app/hooks";
import {setActiveChatId, setDraft} from "../features/ui/uiSlice";
import {makeSelectMessagesByChatId} from "../features/messages/messageSlice";
import {sendMessage} from "../features/messages/messagesThunks";

export default function ChatPage() {
    const {chatId} = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (chatId) dispatch(setActiveChatId(chatId));
    }, [chatId, dispatch]);

    const selectMessages = useMemo(
        () => makeSelectMessagesByChatId(chatId ?? ""),
        [chatId]
    );

    const messages = useAppSelector(selectMessages);
    const draft = useAppSelector((s) => (chatId ? s.ui.inputDraftByChatId[chatId] ?? "" : "" ));
    const isStreaming = useAppSelector((s) => (chatId ? !!s.ui.isStreamingByChatId[chatId] : false));

    const listRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        listRef.current?.scrollTo({top: listRef.current.scrollHeight, behavior: "smooth"});
    }, [messages.length]);

    const onSend = () => {
        if (!chatId) return;
        const text = draft.trim();
        if (!text) return;
        dispatch(setDraft({chatId, draft: ""}));
        dispatch(sendMessage({chatId, text}));
    };

    return (
        <Stack sx={{ height: "100%"}} spacing={2}>
            <Typography variant="h4">Chat: {chatId}</Typography>

            <Paper ref={listRef} sx={{ flex: 1, p: 2, overflow: "auto", minHeight: 200 }}>
                <Stack spacing={1}>
                    {messages.map((m) => (
                        <Box key={m.id} sx={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                            <Paper sx={{ p: 1.5, maxWidth: "75%" }}>
                                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                    {m.content || (m.role === "assistant" && m.status !== "done" ? "..." : "")}
                                </Typography>
                                {m.status === "error" && (
                                    <Typography variant="caption" color="error">
                                        {m.error ?? "Error"}
                                    </Typography>
                                )}
                            </Paper>
                        </Box>
                    ))}
                </Stack>
            </Paper>

            <Paper sx={{ p: 1.5 }}>
                <Stack direction="row" spacing={1} alignItems="flex-end">
                    <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        value={draft}
                        disabled={isStreaming}
                        placeholder="Type a message…"
                        onChange={(e) => chatId && dispatch(setDraft({ chatId, draft: e.target.value }))}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                onSend();
                            }
                        }}
                    />
                    <IconButton onClick={onSend} disabled={isStreaming || !draft.trim()}>
                        <SendIcon />
                    </IconButton>
                </Stack>
            </Paper>

        </Stack>
    );

}