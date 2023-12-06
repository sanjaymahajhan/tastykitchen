import React from 'react'

const FoodCartContext = React.createContext({
  foodCartItemList: [],
  isOrderPlaced: false,
  decrementQuantity: () => {},
  incrementQuantity: () => {},
  addFoodCartItem: () => {},
  getQuantity: () => {},
  showPaymentSuccess: () => {},
  closePaymentSuccess: () => {},
})

export default FoodCartContext
