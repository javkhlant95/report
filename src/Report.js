import classes from "./Report.module.css";
import { useState } from "react";
import { ManagementScreen, KPIScreen, SupplierScreen } from "./screens";
import { MonthProvider } from "./contexts/MonthContext";

export const Report = () => {
  const tabs = [
    {
      title: "Management",
      content: <ManagementScreen />,
    },
    {
      title: "KPI",
      content: <KPIScreen />,
    },
    { title: "MAU/DAU" },
    { title: "Supplier", content: <SupplierScreen /> },
    { title: "PickPack" },
  ];

  const [activeTab, setActiveTab] = useState("Management");

  return (
    <MonthProvider>
      <div className={classes.report}>
        <div className={classes.tabs}>
          {tabs.map((tab, index) => {
            return (
              <button
                onClick={() => setActiveTab(tab.title)}
                className={`${classes.singleTab} ${
                  tab.title === activeTab ? classes.active : null
                }`}
                key={`tab-${index}`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
        <div className={classes.content}>
          {tabs.find((tab) => tab.title === activeTab).content}
        </div>
      </div>
    </MonthProvider>
  );
};
