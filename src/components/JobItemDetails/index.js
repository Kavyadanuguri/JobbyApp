import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarCard from '../SimilarCard'

import './index.css'

const jobItemStages = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    fetchedJobsList: {},
    skills: [],
    lifeCompany: {},
    similarData: [],
    jobItem: '',
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({jobItem: jobItemStages.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetailsList = data.job_details
      const updatedSimilarList = data.similar_jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      const fetchedJobDetails = {
        companyLogoUrl: jobDetailsList.company_logo_url,
        companyWebsiteUrl: jobDetailsList.company_website_url,
        employmentType: jobDetailsList.employment_type,
        id: jobDetailsList.id,
        jobDescription: jobDetailsList.job_description,
        location: jobDetailsList.location,
        packagePerAnnum: jobDetailsList.package_per_annum,
        rating: jobDetailsList.rating,
        title: jobDetailsList.title,
      }

      const skillsFetched = jobDetailsList.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))

      const lifeAtCompany = {
        description: jobDetailsList.life_at_company.description,
        imageUrl: jobDetailsList.life_at_company.image_url,
      }

      this.setState({
        fetchedJobsList: fetchedJobDetails,
        skills: skillsFetched,
        lifeCompany: lifeAtCompany,
        similarData: updatedSimilarList,
        jobItem: jobItemStages.success,
      })
    } else {
      this.setState({jobItem: jobItemStages.failure})
    }
  }

  recallPage2 = () => {
    this.getJobItemDetails()
  }

  renderJobItemSuccessView = () => {
    const {fetchedJobsList, skills, lifeCompany, similarData} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      rating,
      packagePerAnnum,
    } = fetchedJobsList
    return (
      <>
        <div className="element-details-list-container" key={id}>
          <div className="element-details-container1">
            <img
              className="element-details-img1"
              alt="job details company logo"
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
          <div className="details-con3">
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
            <p className="details-package">{packagePerAnnum}</p>
          </div>
          <hr className="element-details-hr" />
          <div className="details-con3">
            <h2 className="element-details-h2">Description</h2>
            <div className="details-con1">
              <a className="visit" href={companyWebsiteUrl}>
                Visit
              </a>
              <FiExternalLink className="external-link" />
            </div>
          </div>
          <p className="element-details-p3">{jobDescription}</p>
          <h2 className="element-details-h2">Skills</h2>
          <ul className="skills-ul-container">
            {skills.map(each => (
              <li className="skills-list-container" key={each.name}>
                <img
                  className="skill-img"
                  alt={each.name}
                  src={each.imageUrl}
                />
                <p className="skills-p1">{each.name}</p>
              </li>
            ))}
          </ul>
          <h2 className="element-details-h2">Life at Company</h2>
          <div className="details-con21">
            <p className="element-details-p31">{lifeCompany.description}</p>
            <img
              className="company-img"
              alt="life at company"
              src={lifeCompany.imageUrl}
            />
          </div>
        </div>
        <h1 className="similar-h1">Similar Jobs</h1>
        <ul className="similar-ul-container">
          {similarData.map(each => (
            <SimilarCard key={each.id} similarItemDetails={each} />
          ))}
        </ul>
      </>
    )
  }

  renderJobItemFailureView = () => {
    console.log('ka')
    return (
      <div className="job-item-failure-container">
        <img
          alt=" failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        />
        <h1 className="job-item-fail-h1">Oops! Something Went Wrong</h1>
        <p className="job-item-fail-p1">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          onClick={this.recallPage2}
          className="profile-item-retry-btn"
          type="button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobItemProgressView = y => {
    console.log(y)
    return (
      <div data-testid="loader" className="loader-item-container2">
        <Loader type="ThreeDots" color="#ffffff" height="80" width="80" />
      </div>
    )
  }

  renderJobItemView = () => {
    const {jobItem} = this.state
    switch (jobItem) {
      case jobItemStages.success:
        return this.renderJobItemSuccessView()
      case jobItemStages.failure:
        return this.renderJobItemFailureView()
      case jobItemStages.progress:
        return this.renderJobItemProgressView()
      default:
        return null
    }
  }

  render() {
    console.log(jobItemStages)
    return (
      <>
        <Header />
        <div className="job-item-bg-container">{this.renderJobItemView()}</div>
      </>
    )
  }
}

export default JobItemDetails
