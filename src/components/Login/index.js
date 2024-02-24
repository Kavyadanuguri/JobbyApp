import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  getSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  getErrorView = error => {
    this.setState({errorMsg: error})
  }

  onSubmitUserCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.getSuccessView(data.jwt_token)
    } else {
      this.getErrorView(data.error_msg)
    }
  }

  getUserName = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <form
          className="login-container1"
          onSubmit={this.onSubmitUserCredentials}
        >
          <div className="login-logo">
            <img
              className="login-website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
            />
          </div>

          <div className="input-container">
            <label className="login-label" htmlFor="input1">
              USERNAME
            </label>
            <input
              onChange={this.getUserName}
              value={username}
              placeholder="Username"
              className="login-input"
              id="input1"
              type="text"
            />
          </div>
          <div className="input-container">
            <label className="login-label" htmlFor="input2">
              PASSWORD
            </label>
            <input
              onChange={this.getPassword}
              value={password}
              placeholder="Password"
              className="login-input"
              id="input2"
              type="password"
            />
          </div>

          <button className="login-btn1" type="submit">
            Login
          </button>
          <p className="error-p1">{errorMsg}</p>
        </form>
      </div>
    )
  }
}
export default Login
