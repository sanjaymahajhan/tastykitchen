/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import FoodCartContext from '../../context/FoodCartContext'
import './index.css'

class Counter extends Component {
  render() {
    const {quantity, id} = this.props

    return (
      <FoodCartContext.Consumer>
        {value => {
          const {decrementQuantity, incrementQuantity} = value

          const onDecrement = () => {
            decrementQuantity(id)
          }

          const onIncrement = () => {
            incrementQuantity(id)
          }

          return (
            <div className="counter_container">
              <button
                type="button"
                className="counter_button"
                onClick={onDecrement}
                testid="decrement-count"
              >
                -
              </button>
              <p className="counter_heading" testid="active-count">
                {quantity}
              </p>
              <button
                type="button"
                className="counter_button"
                onClick={onIncrement}
                testid="increment-count"
              >
                +
              </button>
            </div>
          )
        }}
      </FoodCartContext.Consumer>
    )
  }
}

export default Counter
