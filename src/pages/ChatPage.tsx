import {useParams} from 'react-router-dom';
import {Typography} from "@mui/material";

export default function ChatPage() {
    const {chatId} = useParams();
    return <Typography variant="h4">Chat: {chatId}</Typography>;
}