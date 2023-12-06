import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import FoodTypeButtons from '../FoodTypeButtons'
import './index.css'

const apiSpecificRestaurantStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

const foodTypeDetailsList = [
  {
    displayText: 'Veg',
    optionId: 'VEG',
  },
  {
    displayText: 'Non-Veg',
    optionId: 'NON-VEG',
  },
]

class SpecificRestaurantDetailsRoute extends Component {
  state = {
    apiSpecificRestaurantStatus: apiSpecificRestaurantStatusConstants.initial,
    specificRestaurantDetails: {},
    foodItems: [],
    activeId: '',
  }

  componentDidMount() {
    this.getSpecificRestaurantDetails()
  }

  getSpecificRestaurantDetails = async () => {
    this.setState({
      apiSpecificRestaurantStatus:
        apiSpecificRestaurantStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const restaurantDetailsUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantDetailsUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedSpecificData = {
        rating: data.rating,
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        location: data.location,
        itemsCount: data.items_count,
      }
      const foodItems = data.food_items.map(eachFoodItem => ({
        name: eachFoodItem.name,
        cost: eachFoodItem.cost,
        foodType: eachFoodItem.food_type,
        imageUrl: eachFoodItem.image_url,
        id: eachFoodItem.id,
        rating: eachFoodItem.rating,
      }))
      this.setState({
        apiSpecificRestaurantStatus:
          apiSpecificRestaurantStatusConstants.success,
        specificRestaurantDetails: updatedSpecificData,
        foodItems,
      })
    } else {
      this.setState({
        apiSpecificRestaurantStatus:
          apiSpecificRestaurantStatusConstants.failure,
      })
    }
  }

  onClickRetryButton = () => {
    this.getSpecificRestaurantDetails()
  }

  renderLoadingView = () => (
    <div
      className="specific_restaurant_loader_container"
      data-testid="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="specific_restaurant_loader_container">
      <h1>Oops! something went wrong, Please retry again</h1>
      <button
        type="button"
        onClick={this.onClickRetryButton}
        className="retry_button"
      >
        Retry
      </button>
    </div>
  )

  changeFoodType = id => {
    const {activeId} = this.state
    if (activeId === id) {
      this.setState({
        activeId: '',
      })
    } else {
      this.setState({
        activeId: id,
      })
    }
  }

  renderSuccessView = () => {
    const {specificRestaurantDetails, activeId, foodItems} = this.state
    const {
      rating,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      location,
    } = specificRestaurantDetails
    let filteredFoodItems
    if (activeId === '') {
      filteredFoodItems = foodItems
    } else {
      filteredFoodItems = foodItems.filter(list => list.foodType === activeId)
    }
    console.log(filteredFoodItems)
    return (
      <>
        <div className="restaurant_banner_card">
          <img
            src={imageUrl}
            alt="restaurant"
            className="specific_restaurant_img"
          />
          <div className="specific_restaurant_details_container">
            <h1 className="specific_restaurant_details_heading">{name}</h1>
            <p className="specific_restaurant_details_para">{cuisine}</p>
            <p className="specific_restaurant_details_para">{location}</p>
            <div className="specific_rating_container">
              <div>
                <div className="specific_rating_card">
                  <AiFillStar size={12} color="#ffffff" />
                  <p className="specific_para">{rating}</p>
                </div>
                <p className="specific_restaurant_details_description">
                  {reviewsCount} + Ratings
                </p>
              </div>
              <hr className="separator" />
              <div>
                <div className="specific_rating_card">
                  <BiRupee size={12} color="#ffffff" />
                  <p className="specific_para">{costForTwo}</p>
                </div>
                <p className="specific_restaurant_details_description">
                  Cost for two
                </p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food_type_button_container">
          {foodTypeDetailsList.map(eachButton => (
            <FoodTypeButtons
              buttonDetails={eachButton}
              key={eachButton.optionId}
              isActive={activeId === eachButton.optionId}
              changeFoodType={this.changeFoodType}
            />
          ))}
        </ul>
        <ul className="unOrder_food_item_list">
          {filteredFoodItems.map(eachItem => (
            <FoodItem foodDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderSpecificRestaurantView = () => {
    const {apiSpecificRestaurantStatus} = this.state
    switch (apiSpecificRestaurantStatus) {
      case apiSpecificRestaurantStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiSpecificRestaurantStatusConstants.failure:
        return this.renderFailureView()
      case apiSpecificRestaurantStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="restaurant_details_container">
        <Header />
        <div className="restaurant_details_card">
          {this.renderSpecificRestaurantView()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default SpecificRestaurantDetailsRoute
