export type ToolBoxItem = {
  id: string | undefined;
  key: string;
  name: string;
  value?: string;
  tag: "div" | "span";

  defaultValue: string;
  defaultStyle?: any;
};

export type ToolBoxItemWithMeta = ToolBoxItem & {
  position: {
    x: number;
    y: number;
  };
  dimensions?: {
    height: number;
    width: number;
  };
};
