import { useContext, useState } from "react";
import classes from "./StatesFilter.module.css";
import { Context } from "../../contexts/Context";

export const StateFilter = () => {
  const { states } = useContext(Context);

  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className={classes.stateFilter}>
      <span>States</span>
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
          {states.map((state) => {
            return (
              <div className={classes.singleStateList} key={state.location_id}>
                <input type="checkbox" id={state.location_name} />
                <label htmlFor={state.location_name}>
                  {state.location_name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
