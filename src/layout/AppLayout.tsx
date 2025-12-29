import {Outlet} from "react-router-dom";
import {Box, CssBaseline} from "@mui/material";
import ChatSidebar from "./ChatSidebar";

export default function AppLayout() {
    return (
        <>
        <CssBaseline />
            <Box sx={{display: "flex", minHeight: "100vh"}}>
                <ChatSidebar />
                <Box component="main" sx={{flex: 1, p: 2}}>
                    <Outlet />
                </Box>
            </Box>
        </>
    )
}