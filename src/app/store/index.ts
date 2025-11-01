import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "@/shared/ui/preloader/model/loaderSlice"
export const store = configureStore({
  reducer: {
    preloader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
