import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import UserProfile from '../UserProfile'
import JobElement from '../JobElement'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileStages = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'Loading',
}

const jobStages = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'Loading',
}

class Job extends Component {
  state = {
    profileData: '',
    jobsData: [],
    searchInput: '',
    employment: [],
    salary: '',
    profile: '',
    jobView: '',
  }

  componentDidMount() {
    this.getJobDetails()
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profile: profileStages.progress})
    const token = Cookies.get('jwt_token')
    const url1 = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response1 = await fetch(url1, options)
    if (response1.ok === true) {
      const data1 = await response1.json()
      const updatedProfileData = {
        name: data1.profile_details.name,
        profileImageUrl: data1.profile_details.profile_image_url,
        shortBio: data1.profile_details.short_bio,
      }

      this.setState({
        profileData: updatedProfileData,
        profile: profileStages.success,
      })
    } else {
      this.setState({profile: profileStages.failure})
    }
  }

  getJobDetails = async () => {
    this.setState({jobView: jobStages.progress})
    const {searchInput, employment, salary} = this.state
    const token = Cookies.get('jwt_token')
    const url2 = `https://apis.ccbp.in/jobs?employment_type=${employment.join()}&search=${searchInput}&minimum_package=${salary}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response2 = await fetch(url2, options)
    if (response2.ok === true) {
      const data2 = await response2.json()
      const updatedJobData = data2.jobs.map(each => ({
        id: each.id,
        location: each.location,
        title: each.title,
        rating: each.rating,
        companyLogoUrl: each.company_logo_url,
        employmentTime: each.employment_type,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
      }))

      this.setState({jobsData: updatedJobData, jobView: jobStages.success})
    } else {
      this.setState({jobView: jobStages.failure})
    }
  }

  onSearchValue = event => {
    this.setState({searchInput: event.target.value})
  }

  searchByInput = props => {
    console.log(props)
    this.getJobDetails()
  }

  getEmployment = event => {
    this.setState(
      prev => ({employment: [...prev.employment, event.target.value]}),
      this.getJobDetails,
    )
  }

  getSalaryRange = id => {
    this.setState({salary: id}, this.getJobDetails)
  }

  retryProfile = () => {
    this.getProfileDetails()
  }

  recallPage = () => {
    this.getJobDetails()
  }

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    return <UserProfile profileData={profileData} />
  }

  renderProfileFailureView = props => {
    console.log(props)
    return (
      <div className="profile-fail-container">
        <button
          className="profile-retry-btn"
          onClick={this.retryProfile}
          type="button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderProfileProgressView = y => {
    console.log(y)
    return (
      <div data-testid="loader" className="loader-container">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderProfileView = () => {
    const {profile} = this.state
    console.log(profile, 'paa')
    switch (profile) {
      case profileStages.success:
        return this.renderProfileSuccessView()
      case profileStages.failure:
        return this.renderProfileFailureView()
      case profileStages.progress:
        return this.renderProfileProgressView()
      default:
        return null
    }
  }

  renderJobSuccessView = () => {
    const {jobsData} = this.state
    const isValue = jobsData.length !== 0
    console.log(isValue)
    return (
      <>
        {isValue ? (
          <ul>
            {jobsData.map(each => (
              <JobElement key={each.id} jobDetails={each} />
            ))}
          </ul>
        ) : (
          <div className="job-failure-container">
            <img
              className="no-jobs-img"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
              alt="no jobs"
            />
            <h1 className="job-fail-h1">No Jobs Found</h1>
            <p className="job-fail-p1">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )}
      </>
    )
  }

  renderJobFailureView = p => {
    console.log(p)
    return (
      <div className="job-failure-container">
        <img
          alt=" failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        />
        <h1 className="job-fail-h1">Oops! Something Went Wrong</h1>
        <p className="job-fail-p1">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          onClick={this.recallPage}
          className="profile-retry-btn"
          type="button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobProgressView = y => {
    console.log(y)
    return (
      <div data-testid="loader" className="loader-container2">
        <Loader type="ThreeDots" color="#ffffff" height="80" width="80" />
      </div>
    )
  }

  renderJobView = () => {
    const {jobView} = this.state
    console.log(jobView, 'paa')
    switch (jobView) {
      case jobStages.success:
        return this.renderJobSuccessView()
      case jobStages.failure:
        return this.renderJobFailureView()
      case jobStages.progress:
        return this.renderJobProgressView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, employment} = this.state
    console.log(employment)
    return (
      <>
        <Header />
        <div className="job-bg-container">
          <div className="job-container1">
            <div className="job-input-container1">
              <input
                className="job-input1"
                onChange={this.onSearchValue}
                value={searchInput}
                type="search"
                placeholder="Search"
              />
              <div className="search-icon-container">
                <button
                  data-testid="searchButton"
                  onClick={this.searchByInput}
                  type="button"
                >
                  <BsSearch role="button" className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderProfileView()}
            <hr className="job-hr1" />
            <h2 className="job-type">Type of Employment</h2>
            <ul className="type-ul">
              {employmentTypesList.map(each => (
                <li
                  onChange={this.getEmployment}
                  className="type-list"
                  key={each.employmentTypeId}
                >
                  <input
                    id={each.employmentTypeId}
                    className="type-check"
                    value={each.employmentTypeId}
                    type="checkbox"
                  />
                  <label htmlFor={each.employmentTypeId} className="type-p1">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>

            <hr className="job-hr2" />
            <h2 className="job-type">Salary Range</h2>
            <ul className="type-ul">
              {salaryRangesList.map(each => (
                <li
                  className="type-list"
                  onChange={() => this.getSalaryRange(each.salaryRangeId)}
                  key={each.salaryRangeId}
                >
                  <input
                    id={each.salaryRangeId}
                    className="type-check"
                    type="radio"
                    name="salary"
                  />
                  <label htmlFor={each.salaryRangeId} className="type-p2">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-container2">
            <div className="job-input-container">
              <input
                className="job-input1"
                onChange={this.onSearchValue}
                value={searchInput}
                type="search"
                placeholder="Search"
              />
              <div className="search-icon-container">
                <BsSearch
                  role="button"
                  onClick={this.searchByInput}
                  className="search-icon"
                />
              </div>
            </div>
            {this.renderJobView()}
          </div>
        </div>
      </>
    )
  }
}

export default Job
