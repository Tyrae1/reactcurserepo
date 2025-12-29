import {Box, Button, List, ListItemButton, ListItemText} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {chatsSelectors, chatCreated} from "../features/chats/chatsSlice";
import {setActiveChatId} from "../features/ui/uiSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";

export default function ChatSidebar() {
    const chats = useAppSelector(chatsSelectors.selectAll);
    const activeChatId = useAppSelector((s) => s.ui.activeChatId);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onNewChat = () => {
        const action = chatCreated();
        dispatch(action);
        dispatch(setActiveChatId(action.payload.id));
        navigate(`/chats/${action.payload.id}`);
    };
    return (
        <Box sx={{ width: 280, borderRight: "1px solid #ddd", p: 1 }}>
            <Button fullWidth variant="contained" onClick={onNewChat} sx={{ mb: 1 }}>
                New chat
            </Button>

            <List>
                {chats.map((chat) => (
                    <ListItemButton
                        key={chat.id}
                        selected={chat.id === activeChatId}
                        onClick={() => {
                            dispatch(setActiveChatId(chat.id));
                            navigate(`/chats/${chat.id}`);
                        }}
                    >
                        <ListItemText primary={chat.title} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}