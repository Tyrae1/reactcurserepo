import {Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import ChatsPage from "../pages/ChatsPage";
import ChatPage from "../pages/ChatPage";
import SettingsPage from "../pages/SettingsPage";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<AppLayout/>}>
                <Route path="/chats" element={<ChatsPage/>} />
                <Route path="/chats/:chatId" element={<ChatPage/>} />
                <Route path="/settings" element={<SettingsPage/>} />
                <Route path="*" element={<Navigate to="/chats" replace /> }/>
            </Route>
        </Routes>
    )
}