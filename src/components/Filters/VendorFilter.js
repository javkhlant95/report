import { useState } from "react";
import classes from "./VendorFilter.module.css";

export const VendorFilter = ({ vendors }) => {
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
          <span>Бүгд</span>
          <img src="/icons/chevron-down.svg" alt="Chevron Down" />
        </button>

        <div
          className={`${classes.dropDown} ${
            showDropDown ? classes.show : null
          }`}
        >
          {vendors.map((vendor) => {
            return (
              <div className={classes.singleVendorList} key={vendor.id}>
                <input type="checkbox" id={vendor.name} />
                <label htmlFor={vendor.name}>{vendor.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
