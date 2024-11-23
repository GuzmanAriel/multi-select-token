const CheckboxItem = (props) => { 
   const { item, isChecked, onToggle } = props
   return (
    <div
      className="ms__form__item--checkbox"
      
      role="checkbox"
      tabIndex={0}
      aria-checked={isChecked}
      onClick={() => onToggle(item.Value)}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          onToggle(item.Value);
        }
      }}
    >
      <input
        type="checkbox"
        className="ms__form__field"
        value={item.Value}
        checked={isChecked}
        readOnly
        tabIndex="-1"
      />
      <label className="ms__form__label">{item.Text}</label>
    </div>
  )
}

export default CheckboxItem;