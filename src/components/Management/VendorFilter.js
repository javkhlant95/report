import { useState } from "react";
import classes from "./VendorFilter.module.css";

export const VendorFilter = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className={classes.vendorFilter}>
      <span>Vendor</span>
      <div className={classes.dropDownWrapper}>
        <button
          onClick={() => {
            setShowDropDown(!showDropDown);
          }}
          className={classes.dropDownButton}
        >
          <span>All</span>
          <img src="/icons/chevron-down.svg" alt="Chevron Down" />
        </button>

        <div className={`${classes.dropDown} ${showDropDown ? classes.show : null}`}></div>
      </div>
    </div>
  );
};
