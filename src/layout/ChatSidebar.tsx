import {
    Box,
    Button,
    List,
    ListItemButton,
    ListItemText,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import {useNavigate} from "react-router-dom";
import {chatsSelectors, chatCreated, chatDeleted, chatRenamed} from "../features/chats/chatsSlice";
import {setActiveChatId} from "../features/ui/uiSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {useState} from "react";
import {messagesByChatDeleted} from "../features/messages/messageSlice";
import {useLocation} from "react-router-dom";

export default function ChatSidebar() {
    const chats = useAppSelector(chatsSelectors.selectAll);
    const activeChatId = useAppSelector((s) => s.ui.activeChatId);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onNewChat = () => {
        const action = chatCreated();
        dispatch(action);
        dispatch(setActiveChatId(action.payload.id));
        navigate(`/chats/${action.payload.id}`);
    };

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [renameId, setRenameId] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState("");

    return (
        <>
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
                        <IconButton
                            edge="end"
                            onClick={(e) => {
                                e.stopPropagation();
                                setRenameId(chat.id);
                                setRenameValue(chat.title);
                            }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            edge = "end"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteId(chat.id);
                            }}
                            >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </ListItemButton>
                ))}
            </List>
            <Divider sx={{ my: 1 }} />

            <Button
                fullWidth
                startIcon={<SettingsIcon />}
                variant={location.pathname === "/settings" ? "contained" : "text"}
                onClick={() => navigate("/settings")}
            >
                Settings
            </Button>
        </Box>
    <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete chat?</DialogTitle>
        <DialogContent>
            <DialogContentText>
                This will delete the chat and all its messages.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button
                color="error"
                onClick={() => {
                    if (!deleteId) return;
                    dispatch(messagesByChatDeleted({ chatId: deleteId }));
                    dispatch(chatDeleted({ id: deleteId }));
                    if (activeChatId === deleteId) {
                        dispatch(setActiveChatId(null));
                        navigate("/chats");
                    }
                    setDeleteId(null);
                }}
            >
                Delete
            </Button>
        </DialogActions>
    </Dialog>
            <Dialog open={!!renameId} onClose={() => setRenameId(null)}>
                <DialogTitle>Rename chat</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        label="Title"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                if (!renameId) return;
                                dispatch(chatRenamed({ id: renameId, title: renameValue }));
                                setRenameId(null);
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRenameId(null)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            if (!renameId) return;
                            dispatch(chatRenamed({ id: renameId, title: renameValue }));
                            setRenameId(null);
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}