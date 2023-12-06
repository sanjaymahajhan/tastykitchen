import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import CartRoute from './components/CartRoute'
import NotFound from './components/NotFound'
import SpecificRestaurantDetailsRoute from './components/SpecificRestaurantDetailsRoute'
import ProfileRoute from './components/ProfileRoute'
import ProtectedRoute from './components/ProtectedRoute'
import FoodCartContext from './context/FoodCartContext'
import './App.css'

const initializeFoodCartItem = () => {
  const cartItem = localStorage.getItem('cartData')

  if (cartItem === null) {
    return []
  }
  return JSON.parse(cartItem)
}

class App extends Component {
  state = {
    foodCartItemList: initializeFoodCartItem(),
    isOrderPlaced: false,
  }

  addFoodCartItem = ({...foodItem}) => {
    this.setState(
      pervState => ({
        foodCartItemList: [...pervState.foodCartItemList, foodItem],
      }),
      this.addOrUpdateLocalStorage,
    )
  }

  decrementQuantity = id => {
    const {foodCartItemList} = this.state
    const findCartItem = foodCartItemList.find(
      eachCartItem => eachCartItem.id === id,
    )
    if (findCartItem.quantity > 1) {
      this.setState(
        pervState => ({
          foodCartItemList: pervState.foodCartItemList.map(eachCartList => {
            if (eachCartList.id === id) {
              return {...eachCartList, quantity: eachCartList.quantity - 1}
            }
            return eachCartList
          }),
        }),
        this.addOrUpdateLocalStorage,
      )
    } else {
      const filteredData = foodCartItemList.filter(
        eachListCart => eachListCart.id !== id,
      )
      this.setState(
        {
          foodCartItemList: filteredData,
        },
        this.addOrUpdateLocalStorage,
      )
    }
  }

  incrementQuantity = id => {
    this.setState(
      pervState => ({
        foodCartItemList: pervState.foodCartItemList.map(eachCartList => {
          if (eachCartList.id === id) {
            return {...eachCartList, quantity: eachCartList.quantity + 1}
          }
          return eachCartList
        }),
      }),
      this.addOrUpdateLocalStorage,
    )
  }

  getQuantity = id => {
    const {foodCartItemList} = this.state
    const findCartItem = foodCartItemList.find(
      eachCartItem => eachCartItem.id === id,
    )
    return findCartItem === undefined ? 0 : findCartItem.quantity
  }

  showPaymentSuccess = () => {
    this.setState(
      {
        isOrderPlaced: true,
        foodCartItemList: [],
      },
      this.addOrUpdateLocalStorage,
    )
  }

  closePaymentSuccess = () => {
    this.setState({
      isOrderPlaced: false,
    })
  }

  addOrUpdateLocalStorage = () => {
    const {foodCartItemList} = this.state

    localStorage.setItem('cartData', JSON.stringify(foodCartItemList))
  }

  render() {
    const {foodCartItemList, isOrderPlaced} = this.state
    return (
      <FoodCartContext.Provider
        value={{
          foodCartItemList,
          isOrderPlaced,
          decrementQuantity: this.decrementQuantity,
          incrementQuantity: this.incrementQuantity,
          addFoodCartItem: this.addFoodCartItem,
          getQuantity: this.getQuantity,
          showPaymentSuccess: this.showPaymentSuccess,
          closePaymentSuccess: this.closePaymentSuccess,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={SpecificRestaurantDetailsRoute}
          />
          <ProtectedRoute exact path="/cart" component={CartRoute} />
          <ProtectedRoute exact path="/profile" component={ProfileRoute} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </FoodCartContext.Provider>
    )
  }
}

export default App
