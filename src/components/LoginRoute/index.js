import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const LoginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(LoginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailed(data.error_msg)
    }
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  submitFailed = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderFormContainer = () => {
    const {username, password, showErrorMsg, errorMsg} = this.state

    return (
      <>
        <div className="input_container">
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            type="text"
            className="input_text"
            value={username}
            id="username"
            onChange={this.onChangeUsername}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            className="input_password"
            value={password}
            id="password"
            onChange={this.onChangePassword}
          />
          {showErrorMsg && <p className="error_msg ">{errorMsg}</p>}
        </div>
        <button type="submit" className="login_button">
          Login
        </button>
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_bg_container">
        <div className="login_mobile_card">
          <img
            src="https://res.cloudinary.com/dpa9t5hi6/image/upload/v1686293797/login-sm-img_fttmok.jpg"
            alt="website log"
            className="login_mobile_container_img"
          />
          <p className="login_mobile_container_heading">Login</p>
        </div>
        <div className="login_tablet_container">
          <div className="login_tablet_card">
            <div className="login_tablet_responsive_card">
              <img
                src="https://res.cloudinary.com/dpa9t5hi6/image/upload/v1686311388/Vector_jxyut7.jpg"
                alt="website logo"
                className="website_login_logo_img"
              />
              <h1 className="login_website_logo_heading">Tasty Kitchens</h1>
              <h1 className="login_tablet_heading">Login</h1>
              <form
                className="login_form_tablet_container"
                onSubmit={this.onSubmitLoginForm}
              >
                {this.renderFormContainer()}
              </form>
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/dpa9t5hi6/image/upload/v1686310524/login-lg-img_p78vsd.jpg"
            alt="website login"
            className="login_tablet_img"
          />
        </div>
      </div>
    )
  }
}

export default LoginRoute
