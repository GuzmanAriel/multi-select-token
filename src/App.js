
import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import data from "./data.json";

const App = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setselectedOptions] = useState([]);
  const [data, setData] = useState(null);

  const DOWN_ARROW_KEY_CODE = 40;
  const UP_ARROW_KEY_CODE = 38;
  const ENTER_KEY_CODE = 13;
  const SPACE_KEY_CODE = 32;
  const ESCAPE_KEY_CODE = 32;

  const toggleDropdownVisibility = (e) => {
    const isKeyboardEvent =
      e.type === "keyup" &&
      (e.which === ENTER_KEY_CODE || e.which === SPACE_KEY_CODE);
    
    const isClickEvent = e.type === "click";
    
    if (!isKeyboardEvent && !isClickEvent) return;
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
        return updatedState.includes(value) ? [] : [value];
      }

      updatedState = updatedState.filter((option) => option !== "280560009");

      if (updatedState.includes(value)) {
        updatedState = updatedState.filter((option) => option !== value);
      } else {
        updatedState = [...updatedState, value];
      }

      return updatedState;
    });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/GuzmanAriel/multi-select-token/main/src/data.json");
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
       
        const jsonData = await response.json();
        console.log("Fetched data:", jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ms__container">
      <div className="ms__form__item">
        <div className="ms__form__label" id="gradesTaughtLabel">
          Grades Taught *
        </div>
        <div className="ms__form__checkbox-dropdown">
          <div
            className="ms__select-input__input-wrapper"
            onClick={(e) => toggleDropdownVisibility(e)}
            onKeyUp={(e) => toggleDropdownVisibility(e)}
            aria-haspopup="true"
            aria-controls="checkbox-list"
            aria-expanded="false"
            role="combobox"
            tabIndex="0"
          >
            <div className="ms__select-input__field">
              {selectedOptions.length === 0 && (
                <span
                  className="ms__default-label"
                  aria-labelledby="checkbox-dropdown"
                >
                  Select Grades
                </span>
              )}
              <div className="ms__token-container">
                {data && data.FormData.Options.map((item, i) => (
                  selectedOptions.includes(item.Value) && (
                    <button
                      className="checkbox-dropdown__token"
                      tabIndex="0"
                      data-value={item.Value}
                      key={item.Value}
                      onClick={(e) => toggleCheckedCheckboxes(e, item.Value)}
                      onKeyUp={(e) => toggleCheckedCheckboxes(e, item.Value)}
                    >
                      {item.Text}
                    </button>
                  )
                ))}
              </div>
            </div>
          </div>
          {isDropdownOpen && data && (
            <div
              className="ms__form__checkbox-dropdown-list"
              role="checkbox-list"
              id="checkbox-list"
              aria-labelledby="checkbox-dropdown"
              aria-multiselectable="true"
            >
              {data.FormData.Options.map((item, i) => (
                <div
                  className="ms__form__item--checkbox"
                  key={`grades-taught-${i}`}
                  id={`grades-taught-${i}`}
                  onClick={(e) => toggleCheckedCheckboxes(e, item.Value)}
                  onKeyUp={(e) => toggleCheckedCheckboxes(e, item.Value)}
                  role="checkbox"
                  tabIndex={0}
                  aria-checked={selectedOptions.includes(item.Value)}
                >
                  <input
                    type="checkbox"
                    name="gradesTaughtInput"
                    id={`gradesTaught-${item.Text}`}
                    className="js-class-fieldset-grades-taught-input ms__form__field"
                    value={item.Value}
                    defaultChecked={selectedOptions.includes(item.Value)}
                    tabIndex="-1"
                  />
                  <label
                    className="ms__form__label"
                    htmlFor={`gradesTaught${item.Text}`}
                    id={`grades-taught-label-${i}`}
                    
                  >
                    {item.Text}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          type="hidden"
          name="gradesTaught"
          className="js-stored-checkbox-values"
          aria-required="true"
          defaultValue={JSON.stringify(selectedOptions)}
          value={JSON.stringify(selectedOptions)}
        />
        <span
          aria-atomic="true"
          className="ms__form__error-msg"
          id="gradesTaughtError"
        >
          Please select a grade level
        </span>
      </div>
    </div>
  );
};

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);

export default App;