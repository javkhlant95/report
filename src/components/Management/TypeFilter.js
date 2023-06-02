import { useState } from "react";
import classes from "./TypeFilter.module.css";

export const TypeFilter = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const types = [{ name: "GT" }, { name: "Horeca" }];

  return (
    <div className={classes.typeFilter}>
      <span>Type</span>
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
          {types.map((type, index) => {
            return (
              <div className={classes.singleTypeList} key={index}>
                <input type="checkbox" id={type.name} />
                <label htmlFor={type.name}>{type.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
