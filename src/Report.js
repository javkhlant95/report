import classes from "./Report.module.css";
import { useState } from "react";
import {
  ManagementScreen,
  KPIScreen,
  SupplierScreen,
  MauDauScreen,
  PickPackScreen,
} from "./screens";
import { ContextProvider } from "./contexts/Context";

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
    {
      title: "MAU/DAU",
      content: <MauDauScreen />,
    },
    {
      title: "Supplier",
      content: <SupplierScreen />,
    },
    { title: "PickPack", content: <PickPackScreen /> },
  ];
  const [activeTab, setActiveTab] = useState("Management");

  return (
    <ContextProvider>
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
        <div className={classes.content}>{tabs.find((tab) => tab.title === activeTab).content}</div>
      </div>
    </ContextProvider>
  );
};
