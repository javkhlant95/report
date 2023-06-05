import { useState } from "react";
import "./App.css";
import { ManagementScreen } from "./screens/ManagementScreen";
import { KPIScreen } from "./screens/KPIScreen";
import { MauDauScreen } from "./screens/MauDauScreen";
import { PickPackScreen } from "./screens/PickPackScreen";

function App() {
  const tabs = [
    {
      title: "Management",
      content: <ManagementScreen />,
    },
    {
      title: "KPI",
      content: <KPIScreen />,
    },
    { title: "MAU/DAU", content: <MauDauScreen /> },
    { title: "Supplier" },
    { title: "PickPack", content: <PickPackScreen /> },
  ];

  const [activeTab, setActiveTab] = useState("Management");

  return (
    <div className="App">
      <div className="tabs">
        {tabs.map((tab, index) => {
          return (
            <button
              onClick={() => setActiveTab(tab.title)}
              className={`singleTab ${
                tab.title === activeTab ? "active" : null
              }`}
              key={`tab-${index}`}
            >
              {tab.title}
            </button>
          );
        })}
      </div>
      <div className="content">
        {tabs.find((tab) => tab.title === activeTab).content}
      </div>
    </div>
  );
}

export default App;
