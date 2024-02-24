import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import {IoExitOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const removeToken = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <>
      <nav className="header-nav-container">
        <Link className="link-item" to="/">
          <img
            className="header-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
        </Link>
        <ul className="header-container1">
          <Link className="link-item" to="/">
            <li className="lists">
              <p className="header-p1">Home</p>
            </li>
          </Link>
          <Link className="link-item" to="/jobs">
            <li className="lists">
              <p className="header-p1">Jobs</p>
            </li>
          </Link>
        </ul>

        <button onClick={removeToken} type="button" className="logout-btn">
          Logout
        </button>
      </nav>
      <nav className="header-nav-container1">
        <Link className="link-item" to="/">
          <img
            className="header-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
        </Link>
        <ul className="header-container1">
          <Link className="link-item" to="/">
            <li className="lists">
              <AiFillHome className="jobs" size={40} />
            </li>
          </Link>
          <Link className="link-item" to="/jobs">
            <li className="lists">
              <BsBriefcaseFill size={40} className="jobs" />
            </li>
          </Link>
          <li className="lists">
            <IoExitOutline
              size={30}
              className="header-exit"
              role="button"
              onClick={removeToken}
            />
          </li>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Header)
