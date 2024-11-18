import React from "react";
import { useDrop } from "react-dnd";
import { placeToolboxItem, moveToolboxItem } from "./placedToolboxItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ToolBoxItem } from "../toolbox/toolTypes";
import { nanoid } from "nanoid";
import { PlacedToolBoxItem } from "./PlacedToolBoxItem";

const Whiteboard = () => {
  const dropAreaRef = React.useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();
  const tools = useSelector((state: RootState) => state.tools.positionedTools);

  const [, drop] = useDrop(() => ({
    accept: "TOOL",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: any, monitor) => {
      const offset = monitor.getSourceClientOffset(); // Mouse position relative to window
      const canvasRect = dropAreaRef.current?.getBoundingClientRect(); // The drop area's position

      if (canvasRect && offset) {
        // Calculating the drop position within the drop area
        const position = {
          x: offset.x - canvasRect.left + window.scrollX, // Adding scrollX if needed
          y: offset.y - canvasRect.top + window.scrollY, // Adding scrollY if needed
        };

        item = item as ToolBoxItem;
        // Check if the item is already placed (has an ID)
        if (!item.id) {
          const newPlacedTool = { ...item, position, id: nanoid() };
          dispatch(placeToolboxItem(newPlacedTool));
        } else {
          dispatch(moveToolboxItem({ ...item, position }));
        }
      }
    },
  }));

  return (
    <div
      className="whiteboard"
      ref={(node) => {
        drop(node);
        dropAreaRef.current = node;
      }}
    >
      {tools.map((tool, i) => (
        <PlacedToolBoxItem key={"placed-tool-" + i} tool={tool} />
      ))}
    </div>
  );
};

export default Whiteboard;
