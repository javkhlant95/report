import { useState } from "react";
import "./App.css";
import { ManagementScreen } from "./screens/ManagementScreen";

function App() {
  const tabs = ["Management", "KPI", "MAU/DAU", "Supplier", "PickPack"];

  const [activeTab, setActiveTab] = useState("Management");

  return (
    <div className="App">
      <div className="tabs">
        {tabs.map((tab, index) => {
          return (
            <button
              onClick={() => setActiveTab(tab)}
              className={`singleTab ${tab === activeTab ? "active" : null}`}
              key={`tab-${index}`}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div className="content">
        <ManagementScreen />
      </div>
    </div>
  );
}

export default App;
