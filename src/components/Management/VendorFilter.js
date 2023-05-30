import classes from "./VendorFilter.module.css";

export const VendorFilter = () => {
  return (
    <div className={classes.vendorFilter}>
      <span>Vendor</span>
      <button className={classes.dropDownButton}>
        <span>All</span>
        <img src="/icons/chevron-down.svg" alt="Chevron Down" />
      </button>
    </div>
  );
};
