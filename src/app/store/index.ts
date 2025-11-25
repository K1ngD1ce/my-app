import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "@/shared/ui/preloader/model/loaderSlice";
import { mockApiSlice } from "./mockApi";
export const store = configureStore({
  reducer: {
    [mockApiSlice.reducerPath]: mockApiSlice.reducer,
    preloader: loaderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mockApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
