import {
  removeToolboxItem,
  resizeToolboxItem,
} from "./placedToolboxItemsSlice";
import { useDispatch } from "react-redux";
import { ToolBoxItemWithMeta } from "../toolbox/toolTypes";
import { useDrag } from "react-dnd";
import { useEffect, useRef } from "react";

export const PlacedToolBoxItem = ({ tool }: { tool: ToolBoxItemWithMeta }) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TOOL",
    item: tool,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const value = tool.value || tool.defaultValue;

  const divRef = useRef(null);

  useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    let resizeTimeout: string | number | NodeJS.Timeout | undefined;

    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        entries.forEach((entry) => {
          const { width, height } = entry.contentRect;
          dispatch(
            resizeToolboxItem({ ...tool, dimensions: { width, height } })
          );
        });
      }, 100);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="tool-container"
      style={{
        top: tool.position.y,
        left: tool.position.x,
      }}
    >
      <div
        className="toolbar"
        style={{
          width: "auto",
        }}
      >
        <button
          style={{
            cursor: "pointer",
          }}
          title="Remove item"
          onClick={(e) => {
            e.stopPropagation();
            // eslint-disable-next-line no-restricted-globals
            const value = confirm("Are you sure you want to delete this item?");
            if (value) {
              dispatch(removeToolboxItem(tool));
            }
          }}
        >
          🗑
        </button>
      </div>

      <div className="tool-placed" data-id={tool.id} ref={drag}>
        {tool.tag === "span" ? (
          <div
            ref={divRef}
            className="resize both"
            data-id={tool.id}
            style={{
              ...(tool.defaultStyle || {}),
              width: tool.dimensions?.width || tool.defaultStyle?.width || 100,
              height:
                tool.dimensions?.height || tool.defaultStyle?.height || 100,
            }}
          >
            {value}
          </div>
        ) : null}
      </div>
    </div>
  );
};
