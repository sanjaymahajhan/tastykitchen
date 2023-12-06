import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import FoodCartContext from '../../context/FoodCartContext'
import './index.css'

const CartRoute = () => {
  const renderPaymentSuccessView = closePaymentSuccess => {
    const onClickGoToHomePage = () => {
      closePaymentSuccess()
    }

    return (
      <div className="payment_container">
        <img
          src="https://res.cloudinary.com/dpa9t5hi6/image/upload/v1686807548/Vector_ltylts.jpg"
          alt="payment success"
          className="payment_img"
        />
        <h1 className="payment_heading">Payment Successful</h1>
        <p className="payment_para">
          Thank you for ordering <br />
          Your payment is successfully completed.
        </p>
        <Link to="/" className="payment_link">
          <button
            className="payment_button"
            onClick={onClickGoToHomePage}
            type="button"
          >
            Go To Home Page
          </button>
        </Link>
      </div>
    )
  }

  const renderCartItemList = foodCartItemList => {
    if (foodCartItemList.length === 0) {
      return (
        <div className="payment_container">
          <img
            src="https://res.cloudinary.com/dpa9t5hi6/image/upload/v1686808583/cooking_1_bqpmjc.jpg"
            alt="empty cart"
            className="no_order_img"
          />
          <h1 className="payment_heading">No Order Yet!</h1>
          <p className="payment_para">
            Your cart is empty. Add something from the menu.
          </p>
          <Link to="/" className="payment_link">
            <button className="payment_button" type="button">
              Order Now
            </button>
          </Link>
        </div>
      )
    }
    return (
      <>
        <div className="cart_item_tablet_container">
          <div className="cart_item_tablet_info">
            <p className="cart_item_tablet_info_para">Item</p>
            <p className="cart_item_tablet_info_para">Quantity</p>
            <p className="cart_item_tablet_info_para">Price</p>
          </div>
          <ul className="cart_item_container">
            {foodCartItemList.map(eachFoodItem => (
              <CartItem cartDetails={eachFoodItem} key={eachFoodItem.id} />
            ))}
          </ul>
          <CartSummary />
        </div>
        <Footer />
      </>
    )
  }

  return (
    <FoodCartContext.Consumer>
      {value => {
        const {isOrderPlaced, closePaymentSuccess, foodCartItemList} = value

        return (
          <div className="cart_container">
            <Header />
            {isOrderPlaced
              ? renderPaymentSuccessView(closePaymentSuccess)
              : renderCartItemList(foodCartItemList)}
          </div>
        )
      }}
    </FoodCartContext.Consumer>
  )
}

export default CartRoute
