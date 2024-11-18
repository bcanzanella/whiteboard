import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToolBoxItemWithMeta } from "../toolbox/toolTypes";

type ToolState = {
  positionedTools: ToolBoxItemWithMeta[];
};

const initialState: ToolState = {
  positionedTools: [],
};

const findToolboxItemById = (
  state: ToolState,
  action: PayloadAction<ToolBoxItemWithMeta>
) => {
  const tool = state.positionedTools.find((_) => _.id === action.payload.id);
  if (!tool) {
    console.warn("Tool not found", action.payload);
  }
  return tool;
};

const placedToolboxItemsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    placeToolboxItem: (state, action: PayloadAction<ToolBoxItemWithMeta>) => {
      state.positionedTools.push(action.payload);
    },
    removeToolboxItem: (state, action: PayloadAction<ToolBoxItemWithMeta>) => {
      state.positionedTools = state.positionedTools.filter(
        (_) => _.id !== action.payload.id
      );
    },
    moveToolboxItem: (state, action: PayloadAction<ToolBoxItemWithMeta>) => {
      const tool = findToolboxItemById(state, action);
      if (!tool) return;

      tool.position = action.payload.position;
      state.positionedTools = [...state.positionedTools];
    },
    updateToolboxItemValue: (
      state,
      action: PayloadAction<ToolBoxItemWithMeta>
    ) => {
      const tool = findToolboxItemById(state, action);
      if (!tool) return;

      tool.value = action.payload.value;
      state.positionedTools = [...state.positionedTools];
    },
    resizeToolboxItem: (state, action: PayloadAction<ToolBoxItemWithMeta>) => {
      const tool = findToolboxItemById(state, action);
      if (!tool) return;

      tool.dimensions = action.payload.dimensions;
      state.positionedTools = [...state.positionedTools];
    },
  },
});

export const {
  placeToolboxItem,
  removeToolboxItem,
  moveToolboxItem,
  updateToolboxItemValue,
  resizeToolboxItem,
} = placedToolboxItemsSlice.actions;

export default placedToolboxItemsSlice.reducer;
