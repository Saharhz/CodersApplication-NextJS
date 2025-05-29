import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type workspaceState = {
  language: "javascript" | "python";
  fontSize: number;
};

const initialState = {
  language: "javascript",
  fontSize: 14,
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<"javascript" | "python">) {
      state.language = action.payload;
    },
    setFontSize(state, action: PayloadAction<number>) {
      state.fontSize = action.payload;
    },
  },
});

export const { setLanguage, setFontSize } = workspaceSlice.actions;
export default workspaceSlice.reducer;
