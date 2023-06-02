import { useState } from "react";
import "./App.css";
import { ManagementScreen } from "./screens/ManagementScreen";
import { KPIScreen } from "./screens/KPIScreen";
import { MauDauScreen } from "./screens/MauDauScreen";

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
        {/* <ManagementScreen /> */}
        {/* <KPIScreen /> */}
        <MauDauScreen />
      </div>
    </div>
  );
}

export default App;
