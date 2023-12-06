import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoCloseCircle} from 'react-icons/io5'
import './index.css'

class Header extends Component {
  state = {
    showNavMobileListItems: false,
  }

  onClickHamburgerMenu = () => {
    this.setState({
      showNavMobileListItems: true,
    })
  }

  onClickCloseCircle = () => {
    this.setState({
      showNavMobileListItems: false,
    })
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderNavMobileItem = () => {
    const {match} = this.props
    const {path} = match
    const homeActive = path === '/' ? 'color' : ''
    const cartActive = path === '/cart' ? 'color' : ''
    const profileActive = path === '/profile' ? 'color' : ''
    return (
      <div className="nav_mobile_container">
        <ul className="nav_unOrder_list_container">
          <Link to="/" className="nav_link">
            <li className={`list_item_heading ${homeActive}`}>Home</li>
          </Link>
          <Link to="/cart" className="nav_link">
            <li className={`list_item_heading ${cartActive}`}>Cart</li>
          </Link>
          <Link to="/profile" className="nav_link">
            <li className={`list_item_heading ${profileActive}`}>Profile</li>
          </Link>
          <button
            type="button"
            onClick={this.onClickLogout}
            className="logout_button"
          >
            Logout
          </button>
        </ul>
        <button
          type="button"
          onClick={this.onClickCloseCircle}
          className="react_icon_button"
        >
          .<IoCloseCircle color="#334155" size={20} />
        </button>
      </div>
    )
  }

  render() {
    const {showNavMobileListItems} = this.state
    const {match} = this.props
    const {path} = match
    const homeActive = path === '/' ? 'color' : ''
    const cartActive = path === '/cart' ? 'color' : ''
    const profileActive = path === '/profile' ? 'color' : ''
    return (
      <>
        <nav className="nav_container">
          <Link to="/" className="nav_link">
            <div className="nav_logo_container">
              <img
                src="https://res.cloudinary.com/dpa9t5hi6/image/upload/v1686311388/Vector_jxyut7.jpg"
                alt="website logo"
                className="nav_website_logo"
              />
              <h1 className="nav_logo_heading">Tasty Kitchens</h1>
            </div>
          </Link>
          <button
            type="button"
            onClick={this.onClickHamburgerMenu}
            className="react_icon_button"
          >
            .<GiHamburgerMenu className="react_hamburger_menu_icon" size={20} />
          </button>
          <div className="nav_tablet_container">
            <ul className="nav_unOrder_list_container">
              <Link to="/" className="nav_link">
                <li className={`list_item_heading ${homeActive}`}>Home</li>
              </Link>
              <Link to="/cart" className="nav_link">
                <li className={`list_item_heading ${cartActive}`}>Cart</li>
              </Link>
              <Link to="/profile" className="nav_link">
                <li className={`list_item_heading ${profileActive}`}>
                  Profile
                </li>
              </Link>
              <button
                type="button"
                onClick={this.onClickLogout}
                className="logout_button"
              >
                Logout
              </button>
            </ul>
          </div>
        </nav>
        {showNavMobileListItems && this.renderNavMobileItem()}
      </>
    )
  }
}

export default withRouter(Header)
