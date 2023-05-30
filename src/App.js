import "./App.css";
import { ManagementScreen } from "./screens/ManagementScreen";

function App() {
  const tabs = ["Management", "KPI", "MAU/DAU", "Supplier", "PickPack"];

  return (
    <div className="App">
      <div className="tabs">
        {tabs.map((tab, index) => {
          return (
            <button className="singleTab" key={`tab-${index}`}>
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
