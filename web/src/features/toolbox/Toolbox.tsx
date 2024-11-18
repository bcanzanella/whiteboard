import React from "react";
import { useDrag } from "react-dnd";
import { ToolBoxItem } from "./toolTypes";

const tools: ToolBoxItem[] = [
  {
    name: "Square",
    key: "square",
    id: undefined,
    defaultValue: "",
    tag: "span",
    defaultStyle: {
      border: "3px solid blue",
      height: "100px",
      width: "100px",
    },
  },
  {
    name: "Rectangle",
    key: "rectangle",
    id: undefined,
    defaultValue: "",
    tag: "span",
    defaultStyle: {
      border: "3px solid blue",
      height: "200px",
      width: "100px",
    },
  },

  // {
  //   name: "Text",
  //   key: "text",
  //   id: undefined,
  //   defaultValue: "hello world",
  //   tag: "span",
  // },
];

const Toolbox = () => {
  return (
    <div className="toolbox">
      <h4>Toolbox</h4>
      {tools.map((tool) => (
        <ToolboxItem key={tool.key} tool={tool} />
      ))}
    </div>
  );
};

interface ToolboxItemProps {
  tool: {
    id: string | undefined;
    name: string;
  };
}

const ToolboxItem: React.FC<ToolboxItemProps> = ({ tool }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TOOL",
    item: tool,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="toolbox-item"
      style={{
        backgroundColor: isDragging ? "blue" : "white",
      }}
    >
      {tool.name}
    </div>
  );
};

export default Toolbox;
