import './index.css'

const NotFound = props => {
  console.log(props)

  return (
    <div className="not-found-container">
      <img
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      />
      <h1 className="not-h1">Page Not Found</h1>
      <p className="not-p1">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  )
}

export default NotFound
