
// import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import DropdownWrapper from "./components/DropdownWrapper";
import Button from "./components/Button";


const App = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState({});
  const [isError, setIsError] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
 
  useEffect(() =>  {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/GuzmanAriel/multi-select-token/main/src/data.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

  }, []);

  const toggleCheckedCheckboxes = (value) => {
    setShowMessage(false);
    setSelectedOptions((prevState) => {
      if(value === '280560009') return prevState.includes(value) ? [] : [value];
      if(prevState.includes(value)) return prevState.filter((option) => option !== value);
      return [...prevState, value];
    })
  }

  const SubmitEvent = () => {
    setShowMessage(true); 
    selectedOptions.length === 0 ? setIsError(true) : setIsError(false);
  }

  return (
    <div className="ms__container">
      <div className="ms__form__item">
        <div className="ms__form__label" id="gradesTaughtLabel">Grades Taught *</div>
        <DropdownWrapper 
          options={data?.FormData?.Options || []}
          selectedOptions={selectedOptions}
          onOptionToggle={toggleCheckedCheckboxes}
        />
        <input
          type="hidden"
          name="gradesTaught"
          className="js-stored-checkbox-values"
          value={JSON.stringify(selectedOptions)}
          readOnly
        />
        {showMessage && (  // Add this condition
          <span className={`ms__form__msg ${isError ? 'ms__form__msg--error' : 'ms__form__msg--success'}`} id="gradesTaughtError">
            {isError ? "Please select a grade level" : "Submit"} 
          </span>
        )}
        <Button type={"button"} text={"Submit"} submitEvent={SubmitEvent}/>
      </div>
    </div>
  )
};

export default App;