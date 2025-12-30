import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store";

export type SettingsState = {
    apiKey: string;
    model: string;
    temperature: number;
};

const initialState: SettingsState = {
    apiKey: "",
    model: "gpt-40-mini",
    temperature: 0.7,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setApiKey(state, action: PayloadAction<string>) {
            state.apiKey = action.payload;
        },
        setModel(state, action: PayloadAction<string>) {
            state.model = action.payload;
        },
        setTemperature(state, action: PayloadAction<number>) {
            state.temperature = action.payload;
        },
        settingsHydrated(state, action: PayloadAction<Partial<SettingsState>>) {
            return { ...state, ...action.payload };
        },
    },
});

export const {
    setApiKey,
    setModel,
    setTemperature,
    settingsHydrated,
} = settingsSlice.actions;

export default settingsSlice.reducer;

export const selectSettings = (s: RootState) => s.settings;