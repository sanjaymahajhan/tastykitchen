import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {MdSort, MdExpandLess} from 'react-icons/md'
import {BiSearch} from 'react-icons/bi'
import Header from '../Header'
import RestaurantItem from '../RestaurantItem'
import Footer from '../Footer'
import './index.css'

const apiOfferStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

const apiRestaurantStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    offersList: [],
    apiOfferStatus: apiOfferStatusConstants.initial,
    apiRestaurantStatus: apiRestaurantStatusConstants.initial,
    sortByOptionID: sortByOptions[1].value,
    searchInput: '',
    activePage: 1,
    totalPages: 0,
    restaurantList: [],
    errorMsg: '',
  }

  componentDidMount() {
    this.getRestaurantsOfferDetails()
    this.getRestaurantsDetails()
  }

  getRestaurantsOfferDetails = async () => {
    this.setState({
      apiOfferStatus: apiOfferStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const offerUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(offerUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        apiOfferStatus: apiOfferStatusConstants.success,
        offersList: updatedData,
      })
    } else {
      this.setState({
        apiOfferStatus: apiOfferStatusConstants.failure,
      })
    }
  }

  getRestaurantsDetails = async () => {
    const {searchInput, activePage, sortByOptionID} = this.state
    this.setState({
      apiRestaurantStatus: apiRestaurantStatusConstants.inProgress,
    })
    const offset = (activePage - 1) * 9
    const jwtToken = Cookies.get('jwt_token')
    const restaurantListUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=9&sort_by_rating=${sortByOptionID}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantListUrl, options)
    const data = await response.json()
    const totalPages = Math.ceil(data.total / 9)
    if (response.ok === true) {
      const updatedRestaurantListData = data.restaurants.map(eachList => ({
        hasOnlineDelivery: eachList.has_online_delivery,
        userRating: {
          ratingText: eachList.user_rating.rating_text,
          ratingColor: eachList.user_rating.rating_color,
          totalReviews: eachList.user_rating.total_reviews,
          rating: eachList.user_rating.rating,
        },
        name: eachList.name,
        hasTableBooking: eachList.has_table_booking,
        isDeliveringNow: eachList.is_delivering_now,
        costForTwo: eachList.cost_for_two,
        cuisine: eachList.cuisine,
        id: eachList.id,
        imageUrl: eachList.image_url,
        menuType: eachList.menu_type,
        location: eachList.location,
        opensAt: eachList.opens_at,
        groupByTime: eachList.group_by_time,
      }))
      this.setState({
        apiRestaurantStatus: apiRestaurantStatusConstants.success,
        restaurantList: updatedRestaurantListData,
        totalPages,
      })
    } else {
      this.setState({
        apiRestaurantStatus: apiRestaurantStatusConstants.failure,
        errorMsg: data.error_message,
      })
    }
  }

  onClickRetry = () => {
    this.getRestaurantsOfferDetails()
  }

  onClickRestaurantRetry = () => {
    this.setState(
      {
        searchInput: '',
        errorMsg: '',
      },
      this.getRestaurantsDetails,
    )
  }

  onChangeSelectOption = event => {
    this.setState(
      {
        sortByOptionID: event.target.value,
      },
      this.getRestaurantsDetails,
    )
  }

  onClickSearchIcon = () => {
    this.getRestaurantsDetails()
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.getRestaurantsDetails()
    }
  }

  onClickLeftPaginationButton = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        pervState => ({
          activePage: pervState.activePage - 1,
        }),
        this.getRestaurantsDetails,
      )
    }
  }

  onClickRightPaginationButton = () => {
    const {activePage, totalPages} = this.state
    if (activePage < totalPages) {
      this.setState(
        pervState => ({
          activePage: pervState.activePage + 1,
        }),
        this.getRestaurantsDetails,
      )
    }
  }

  renderOfferLoadingView = () => (
    <div className="loader_container" data-testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderOfferSuccessView = () => {
    const {offersList} = this.state
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 3000,
    }
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {offersList.map(eachImage => (
            <img
              src={eachImage.imageUrl}
              key={eachImage.id}
              alt="offer"
              className="offer_img"
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderOfferFailureView = () => (
    <div className="loader_container">
      <button
        type="button"
        onClick={this.onClickRetry}
        className="retry_button"
      >
        Retry
      </button>
    </div>
  )

  renderOfferStatusView = () => {
    const {apiOfferStatus} = this.state
    switch (apiOfferStatus) {
      case apiOfferStatusConstants.inProgress:
        return this.renderOfferLoadingView()
      case apiOfferStatusConstants.success:
        return this.renderOfferSuccessView()
      case apiOfferStatusConstants.failure:
        return this.renderOfferFailureView()
      default:
        return null
    }
  }

  renderRestaurantLoadingView = () => (
    <div className="loader_container" data-testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantSuccessView = () => {
    const {restaurantList, totalPages, activePage} = this.state
    return (
      <>
        <ul className="unorder_restaurants_list_container">
          {restaurantList.map(eachItem => (
            <RestaurantItem restaurantDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
        {restaurantList.length > 0 && (
          <div className="pagination_container">
            <button
              data-testid="pagination-left-button"
              className="pagination_left_button"
              type="button"
              onClick={this.onClickLeftPaginationButton}
            >
              .<MdExpandLess size={15} color="#334155" />
            </button>
            <p className="pagination_para">
              <span data-testid="active-page-number">{activePage}</span> of
              {` ${totalPages}`}
            </p>
            <button
              data-testid="pagination-right-button"
              className="pagination_right_button"
              type="button"
              onClick={this.onClickRightPaginationButton}
            >
              .<MdExpandLess size={15} color="#334155" />
            </button>
          </div>
        )}
      </>
    )
  }

  renderRestaurantFailureView = () => {
    const {errorMsg} = this.state
    return (
      <div className="loader_container">
        <h1 className="popular_restaurants_heading">{errorMsg}</h1>
        <button
          type="button"
          onClick={this.onClickRestaurantRetry}
          className="retry_button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderRestaurantStatusView = () => {
    const {apiRestaurantStatus} = this.state
    switch (apiRestaurantStatus) {
      case apiRestaurantStatusConstants.inProgress:
        return this.renderRestaurantLoadingView()
      case apiRestaurantStatusConstants.success:
        return this.renderRestaurantSuccessView()
      case apiRestaurantStatusConstants.failure:
        return this.renderRestaurantFailureView()
      default:
        return null
    }
  }

  render() {
    const {sortByOptionID, searchInput} = this.state
    return (
      <div className="home_container">
        <Header />
        <div className="home_card">
          {this.renderOfferStatusView()}
          <div className="container">
            <div className="filter_container">
              <div className="filter_card">
                <div className="search_container">
                  <input
                    type="search"
                    className="search"
                    placeholder="Restaurant Name"
                    value={searchInput}
                    onChange={this.onChangeSearchInput}
                    onKeyDown={this.onKeyDownSearch}
                  />
                  <button
                    type="button"
                    onClick={this.onClickSearchIcon}
                    className="search_icon_container"
                  >
                    .<BiSearch size={20} />
                  </button>
                </div>
                <h1 className="popular_restaurants_heading">
                  Popular Restaurants
                </h1>
                <p className="popular_restaurants_para">
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
              </div>
              <div className="select_container">
                <MdSort color="#475569" size={24} />
                <p className="sort_by_heading">Sort by</p>
                <select
                  className="select_element"
                  onChange={this.onChangeSelectOption}
                  value={sortByOptionID}
                >
                  {sortByOptions.map(eachOption => (
                    <option
                      value={eachOption.value}
                      key={eachOption.value}
                      className="select_option"
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {this.renderRestaurantStatusView()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
