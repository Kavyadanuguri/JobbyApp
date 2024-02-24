import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const JobElement = props => {
  const {jobDetails} = props
  const {
    id,
    rating,
    location,
    companyLogoUrl,
    employmentTime,
    jobDescription,
    packagePerAnnum,
    title,
  } = jobDetails
  return (
    <>
      <Link to={`/jobs/${id}`} className="linky">
        <li className="element-list-container" key={id}>
          <div className="element-container1">
            <img
              className="element-img1"
              alt="company logo"
              src={companyLogoUrl}
            />
            <div className="element-con1">
              <h1 className="element-h1">{title}</h1>
              <div className="con1">
                <FaStar className="element-star-icon" />
                <p className="element-p1">{rating}</p>
              </div>
            </div>
          </div>
          <div className="con3">
            <div className="con1">
              <div className="con2">
                <IoLocationSharp className="element-location-icon" />
                <p className="element-p2">{location}</p>
              </div>
              <div className="con1">
                <BsBriefcaseFill className="element-location-icon" />
                <p className="element-p2">{employmentTime}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="element-hr" />
          <h2 className="element-h2">Description</h2>
          <p className="element-p3">{jobDescription}</p>
        </li>
      </Link>
    </>
  )
}
export default JobElement
