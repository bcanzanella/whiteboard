import "./App.css";

import Toolbox from "./features/toolbox/Toolbox";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Whiteboard from "./features/whiteboard/Whiteboard";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div
          style={{
            margin: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              backgroundColor: "#ccc",
              flexShrink: 0,
              borderBottom: "1px solid #333",
            }}
          >
            <h3>Whiteboard</h3>
          </div>

          {/* Main Content Area */}
          <div style={{ flex: 1, display: "flex", backgroundColor: "#fff" }}>
            {/* Content Area */}
            <div style={{ flex: 1 }}>
              <Whiteboard />
            </div>
            {/* Right Bar */}
            <div
              style={{ width: "10em", backgroundColor: "#ccc", flexShrink: 0 }}
            >
              <Toolbox />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
