import { useContext, useState } from "react";
import classes from "./VendorFilter.module.css";
import { Context } from "../../contexts/Context";

export const VendorFilter = () => {
  const { vendors, currentVendor, setCurrentVendor } = useContext(Context);

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
          <span>{currentVendor.name ? currentVendor.name : "Бүгд"}</span>
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
                <input
                  checked={currentVendor.id === vendor.id}
                  onChange={(e) => {
                    if (e.target.checked) setCurrentVendor(vendor);
                    else setCurrentVendor({});
                  }}
                  type="checkbox"
                  name="Vendor"
                  id={vendor.name}
                />
                <label htmlFor={vendor.name}>{vendor.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
