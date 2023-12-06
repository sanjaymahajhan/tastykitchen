import {BiRupee} from 'react-icons/bi'
import './index.css'
import FoodCartContext from '../../context/FoodCartContext'

const CartItem = props => {
  const {cartDetails} = props
  const {cost, quantity, id, imageUrl, name} = cartDetails
  const totalPrice = cost * quantity
  return (
    <FoodCartContext.Consumer>
      {value => {
        const {decrementQuantity, incrementQuantity} = value

        const onClickDecrementQuantity = () => {
          decrementQuantity(id)
        }

        const onClickIncrementQuantity = () => {
          incrementQuantity(id)
        }

        return (
          <li className="cart_item_mobile_list">
            <img src={imageUrl} alt={name} className="cart_item_img" />
            <div className="cart_item_tablet_list" data-testid="cartItem">
              <p className="cart_item_mobile_heading">{name}</p>
              <div className="cart_item_tablet_list_card">
                <img
                  src={imageUrl}
                  alt={name}
                  className="cart_item_tablet_img"
                />
                <h1 className="cart_item_heading">{name}</h1>
              </div>
              <div className="cart_item_tablet_list_card1">
                <button
                  type="button"
                  className="counter_button"
                  data-testid="decrement-quantity"
                  onClick={onClickDecrementQuantity}
                >
                  -
                </button>
                <p
                  className="counter_tablet_heading"
                  data-testid="item-quantity"
                >
                  {quantity}
                </p>
                <button
                  type="button"
                  className="counter_button"
                  data-testid="increment-quantity"
                  onClick={onClickIncrementQuantity}
                >
                  +
                </button>
              </div>
              <div className="cart_item_tablet_list_card1">
                <BiRupee size={20} color="#FFA412" />
                <p className="cart_item_para">{totalPrice}.00</p>
              </div>
            </div>
          </li>
        )
      }}
    </FoodCartContext.Consumer>
  )
}

export default CartItem
