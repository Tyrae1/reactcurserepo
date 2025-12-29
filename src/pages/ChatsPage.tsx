import {Typography, Button, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {chatCreated} from "../features/chats/chatsSlice";
import {setActiveChatId} from "../features/ui/uiSlice";
import {useAppDispatch} from "../app/hooks";

export default function ChatsPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onNewChat = () => {
        const action = chatCreated();
        dispatch(action);

        const id = action.payload.id;
        dispatch(setActiveChatId(id));
        navigate(`/chats/${id}`);
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h4">Chats</Typography>
            <Button variant="contained" onClick={onNewChat}>
                New Chat
            </Button>
        </Stack>
    );
}