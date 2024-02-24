import './index.css'

const UserProfile = props => {
  const {profileData} = props
  const {name, shortBio, profileImageUrl} = profileData
  return (
    <div className="user-container">
      <img className="user-avatar" alt="profile" src={profileImageUrl} />
      <h1 className="user-h1">{name}</h1>
      <p className="user-p1">{shortBio}</p>
    </div>
  )
}

export default UserProfile
