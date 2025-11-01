import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadState {
  isLoading: boolean;
}

const initialState: LoadState = {
  isLoading: true,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoading, startLoading, finishLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
