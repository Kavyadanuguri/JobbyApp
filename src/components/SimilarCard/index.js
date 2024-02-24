import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const SimilarCard = props => {
  const {similarItemDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarItemDetails
  console.log(similarItemDetails)
  return (
    <li className="similar-list-container" key={id}>
      <div className="similar-details-container1">
        <img
          className="element-details-img1"
          alt="similar job company logo"
          src={companyLogoUrl}
        />
        <div className="element-details-con1">
          <h1 className="element-details-h1">{title}</h1>
          <div className="con1">
            <FaStar className="element-details-star-icon" />
            <p className="element-details-p1">{rating}</p>
          </div>
        </div>
      </div>
      <h2 className="similar-h2">Description</h2>
      <p className="similar-description">{jobDescription}</p>
      <div className="details-con1">
        <div className="details-con2">
          <IoLocationSharp className="element-details-location-icon" />
          <p className="element-details-p2">{location}</p>
        </div>
        <div className="details-con1">
          <BsBriefcaseFill className="element-details-location-icon" />
          <p className="element-details-p2">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarCard
