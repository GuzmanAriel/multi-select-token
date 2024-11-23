import CheckboxItem from "./CheckboxItem";

const CheckboxList = (props) => { 
   const { options, selectedOptions, onOptionToggle } = props
   return (
    <div className="ms__form__checkbox-dropdown-list" role="checkbox-list">
        {options.map((item) => (
        <CheckboxItem
            key={item.Value}
            item={item}
            isChecked={selectedOptions.includes(item.Value)}
            onToggle={onOptionToggle}
        />
        ))}
    </div>
  )
}

export default CheckboxList;