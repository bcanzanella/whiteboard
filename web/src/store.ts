import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "./features/whiteboard/placedToolboxItemsSlice";

export const store = configureStore({
  reducer: {
    tools: toolReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
