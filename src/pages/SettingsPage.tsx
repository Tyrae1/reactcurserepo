import {
    Box,
    Stack,
    TextField,
    Typography,
    Alert,
    MenuItem,
    Slider,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    selectSettings,
    setApiKey,
    setModel,
    setTemperature,
} from "../features/settings/settingSlice";

export default function SettingsPage() {
    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectSettings);

    return (
        <Box maxWidth={600}>
            <Stack spacing={3}>
                <Typography variant="h4">Settings</Typography>

                <Alert severity="warning">
                    API key зберігається <b>локально у браузері</b>.
                    Не використовуйте продакшн-ключі.
                </Alert>

                <TextField
                    label="API key"
                    type="password"
                    value={settings.apiKey}
                    onChange={(e) => dispatch(setApiKey(e.target.value))}
                    fullWidth
                />

                <TextField
                    select
                    label="Model"
                    value={settings.model}
                    onChange={(e) => dispatch(setModel(e.target.value))}
                >
                    <MenuItem value="gpt-4o-mini">gpt-4o-mini</MenuItem>
                    <MenuItem value="gpt-4o">gpt-4o</MenuItem>
                </TextField>

                <Box>
                    <Typography gutterBottom>
                        Temperature: {settings.temperature}
                    </Typography>
                    <Slider
                        min={0}
                        max={1}
                        step={0.1}
                        value={settings.temperature}
                        onChange={(_, v) => dispatch(setTemperature(v as number))}
                    />
                </Box>
            </Stack>
        </Box>
    );
}
