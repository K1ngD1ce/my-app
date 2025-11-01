import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MouseState {
  x: number;
  y: number;
}

const initialState: MouseState = {
  x: 0,
  y: 0,
};

const mouseSlice = createSlice({
  name: "mouse",
  initialState,
  reducers: {
    setMousePosition: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
  },
});

export const { setMousePosition } = mouseSlice.actions;
export default mouseSlice.reducer;
