

const TokenContainer = (props) => { 
   const { options, selectedOptions, onOptionToggle } = props
   return (
    <div className="ms__token-container">
      {selectedOptions.length === 0 && (
        <span className="ms__default-label">Select Grades</span>
      )}
      {selectedOptions.map((value) => {
        const option = options.find((item) => item.Value === value);
        return (
          <button
            key={value}
            className="checkbox-dropdown__token"
            onClick={(e) => {
                e.stopPropagation();  // Add this line
                onOptionToggle(value);
              }}
          >
            {option?.Text}
          </button>
        );
      })}
    </div>
   )
}

export default TokenContainer;