import './index.css'
import {BiRupee} from 'react-icons/bi'
import FoodCartContext from '../../context/FoodCartContext'

const CartSummary = () => (
  <FoodCartContext.Consumer>
    {value => {
      const {foodCartItemList, showPaymentSuccess} = value
      let totalAmount = 0

      const addPrice = item => {
        totalAmount += item.quantity * item.cost
      }

      foodCartItemList.map(eachFoodCartItem => addPrice(eachFoodCartItem))

      const onClickPlaceOrderButton = () => {
        showPaymentSuccess()
      }

      return (
        <div className="order_total_container">
          <div className="order_total_card">
            <h1 className="order_total_heading">Order Total:</h1>
            <div className="cart_item_cost_container">
              <BiRupee size={20} color="#3e4c59" />
              <p className="order_total_para" data-testid="total-price">
                {totalAmount}.00
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClickPlaceOrderButton}
            className="place_order_button"
          >
            Place Order
          </button>
        </div>
      )
    }}
  </FoodCartContext.Consumer>
)

export default CartSummary
