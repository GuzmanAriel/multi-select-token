import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import data from "/data.json";

const App = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setselectedOptions] = useState([]);
  const DOWN_ARROW_KEY_CODE = 40;
  const UP_ARROW_KEY_CODE = 38;
  const ENTER_KEY_CODE = 13;
  const SPACE_KEY_CODE = 32;
  const ESCAPE_KEY_CODE = 32;

  const toggleDropdownVisibility = (e) => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCheckedCheckboxes = (e, value) => {
    const isKeyboardEvent =
      e.type === "keyup" &&
      (e.which === ENTER_KEY_CODE || e.which === SPACE_KEY_CODE);
    const isClickEvent = e.type === "click";

    if (!isKeyboardEvent && !isClickEvent) return;

    setselectedOptions((previousState) => {
      let updatedState = [...previousState];

      if (value === "280560009") {
        // Clear all selections and toggle 'not applicable' option
        return updatedState.includes(value) ? [] : [value];
      }

      // Remove 'not applicable' if it's present
      updatedState = updatedState.filter((option) => option !== "280560009");

      // Toggle the current value
      if (updatedState.includes(value)) {
        updatedState = updatedState.filter((option) => option !== value);
      } else {
        updatedState = [...updatedState, value];
      }

      return updatedState;
    });
  };

  return (
    <div className="ms__container">
      <div className="ms__form__item">
        <div className="ms__form__label" id="gradesTaughtLabel">
          Grades Taught *
        </div>
        <div className="ms__form__checkbox-dropdown">
          <div
            className="ms__select-input__input-wrapper"
            onClick={toggleDropdownVisibility}
            aria-haspopup="true"
            aria-controls="checkbox-list"
            aria-expanded="false"
            role="combobox"
            tabIndex="0"
          >
            <div className="ms__select-input__field">
              {selectedOptions.length == 0 ? (
                <span
                  className="ms__default-label"
                  aria-labelledby="checkbox-dropdown"
                >
                  {" "}
                  Select Grades
                </span>
              ) : null}
              <div className="ms__token-container">
                {data.FormData.Options.map((item, i) => {
                  if (selectedOptions.includes(item.Value)) {
                    return (
                      <button
                        className="checkbox-dropdown__token"
                        tabIndex="0"
                        data-value={item.Value}
                        key={item.Value}
                        onClick={(e) => {
                          toggleCheckedCheckboxes(e, item.Value);
                        }}
                        onKeyUp={(e) => {
                          toggleCheckedCheckboxes(e, item.Value);
                        }}
                      >
                        {item.Text}
                      </button>
                    );
                  }
                }).filter((item) => !!item)}
              </div>
            </div>
          </div>
          {isDropdownOpen && (
            <div
              className="ms__form__checkbox-dropdown-list"
              role="checkbox-list"
              id="checkbox-list"
              aria-labelledby="checkbox-dropdown"
              aria-multiselectable="true"
            >
              {data.FormData.Options.map((item, i) => {
                return (
                  <div
                    className="ms__form__item--checkbox"
                    key={`grades-taught-${i}`}
                    id={`grades-taught-${i}`}
                    onClick={(e) => {
                      toggleCheckedCheckboxes(e, item.Value);
                    }}
                    onKeyUp={(e) => {
                      toggleCheckedCheckboxes(e, item.Value);
                    }}
                    role="checkbox"
                    tabIndex={0}
                    aria-checked={
                      selectedOptions.includes(item.Value) ? true : false
                    }
                  >
                    <input
                      type="checkbox"
                      data-type="checkbox"
                      name="gradesTaughtInput"
                      id={`gradesTaught-${item.Text}`}
                      className="js-class-fieldset-grades-taught-input ms__form__field"
                      value={item.Value}
                      data-label-text={item.Text}
                      tabIndex="-1"
                      defaultChecked={
                        selectedOptions.includes(item.Value) ? true : false
                      }
                      data-checked={
                        selectedOptions.includes(item.Value) ? true : false
                      }
                    />
                    <label
                      className="ms__form__label"
                      htmlFor={`gradesTaught${item.Text}`}
                      id={`grades-taught-label-${i}`}
                      tabIndex={0}
                    >
                      {item.Text}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <input
          type="hidden"
          data-type="checkbox-array"
          name="gradesTaught"
          className="js-stored-checkbox-values"
          aria-required="true"
          defaultValue={JSON.stringify(selectedOptions)}
          value={JSON.stringify(selectedOptions)}
        />
        <span
          aria-atomic="true"
          className="gv__form__error-msg"
          id="gradesTaughtError"
        >
          Please select a grade level
        </span>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
