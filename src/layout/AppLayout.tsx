import {Outlet} from "react-router-dom";
import {Box, CssBaseline, Alert, Snackbar} from "@mui/material";
import ChatSidebar from "./ChatSidebar";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {clearToast} from "../features/ui/uiSlice";

export default function AppLayout() {
    const toast = useAppSelector((s) => s.ui.toast);
    const dispatch = useAppDispatch();

    return (
        <>
        <CssBaseline />
            <Box sx={{display: "flex", minHeight: "100vh"}}>
                <ChatSidebar />
                <Box component="main" sx={{flex: 1, p: 2}}>
                    <Outlet />
                </Box>
            </Box>
            <Snackbar
                open={!!toast}
                autoHideDuration={4000}
                onClose={() => dispatch(clearToast())}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                {toast ? (
                    <Alert onClose={() => dispatch(clearToast())} severity={toast.type} variant="filled">
                        {toast.message}
                    </Alert>
                ) : null}
            </Snackbar>
        </>
    );
}