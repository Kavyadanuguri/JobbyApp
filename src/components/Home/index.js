import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  console.log(props)
  return (
    <>
      <Header />
      <div className="home-bg-container">
        <h1 className="home-h1">Find The Job That Fits Your Life</h1>
        <p className="home-p2">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button className="home-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
