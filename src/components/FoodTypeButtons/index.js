import './index.css'

const FoodTypeButtons = props => {
  const {buttonDetails, isActive, changeFoodType} = props
  const {optionId, displayText} = buttonDetails
  const activeButton = isActive ? 'button_element_active' : ''

  const onClickChangeFoodType = () => {
    changeFoodType(optionId)
  }

  return (
    <li className="food_type_list_item">
      <button
        className={`food_type_button_element ${activeButton}`}
        type="button"
        onClick={onClickChangeFoodType}
      >
        {displayText}
      </button>
    </li>
  )
}

export default FoodTypeButtons
