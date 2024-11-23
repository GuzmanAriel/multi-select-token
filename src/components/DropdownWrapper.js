import React, { useState } from "react";
import TokenContainer from "./TokenContainer";
import CheckboxList from "./CheckboxList";

const DropdownWrapper = (props) => { 
   const { options, selectedOptions, onOptionToggle } = props
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const toggleDropdownVisibility = () => setIsDropdownOpen(!isDropdownOpen);
   const ENTER_KEY_CODE = 13;
   const SPACE_KEY_CODE = 32;

   const keyboardDropdownVisibility = (e) => {
        const isKeyboardEvent = e.which === ENTER_KEY_CODE || e.which === SPACE_KEY_CODE;

        if(!isKeyboardEvent) return;
        toggleDropdownVisibility();
   }

   return (
    <div className="ms__form__checkbox-dropdown">
        <div
        className="ms__select-input__input-wrapper"
        onClick={toggleDropdownVisibility}
        onKeyUp={(e)=>{keyboardDropdownVisibility(e)}}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        role="combobox"
        tabIndex="0"
        >
            <div className="ms__select-input__field">
                <TokenContainer selectedOptions={selectedOptions} options={options} onOptionToggle={onOptionToggle} />
            </div>

        </div>
        {isDropdownOpen && (
                <CheckboxList
                    options={options}
                    selectedOptions={selectedOptions}
                    onOptionToggle={onOptionToggle}
                />
                )}
        
    </div>
  )
}

export default DropdownWrapper;