import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Counter from '../Counter'
import FoodCartContext from '../../context/FoodCartContext'
import './index.css'

class FoodItem extends Component {
  render() {
    const {foodDetails} = this.props
    const {name, cost, imageUrl, foodType, id, rating} = foodDetails
    return (
      <FoodCartContext.Consumer>
        {value => {
          const {addFoodCartItem, getQuantity} = value

          const quantity = getQuantity(id)

          const onClickAddButton = () => {
            addFoodCartItem({cost, quantity: 1, id, imageUrl, name})
          }

          return (
            <li className="food_item_list" data-testid="foodItem">
              <img src={imageUrl} alt={name} className="food_item_img" />
              <div>
                {foodType === 'VEG' ? (
                  <img
                    src="https://res.cloudinary.com/dpa9t5hi6/image/upload/v1687155970/vegIcon_werr2h.jpg"
                    alt="Veg Icon"
                    className="food_type_icon_img"
                  />
                ) : (
                  <img
                    src="https://res.cloudinary.com/dpa9t5hi6/image/upload/v1687156027/nonVegIcon_jqpfbp.jpg"
                    alt="Non-Veg Icon"
                    className="food_type_icon_img"
                  />
                )}
                <h1 className="food_item_heading">{name}</h1>
                <div className="food_item_cost_container">
                  <BiRupee size={12} color="#334155" />
                  <p className="food_item_para">{cost}</p>
                </div>
                <div className="food_item_rating_container">
                  <AiFillStar size={12} color="#FFCC00" />
                  <p className="food_item_description">{rating}</p>
                </div>
                {quantity === 0 ? (
                  <button
                    className="add_button"
                    onClick={onClickAddButton}
                    type="button"
                  >
                    Add
                  </button>
                ) : (
                  <Counter id={id} quantity={quantity} />
                )}
              </div>
            </li>
          )
        }}
      </FoodCartContext.Consumer>
    )
  }
}

export default FoodItem
