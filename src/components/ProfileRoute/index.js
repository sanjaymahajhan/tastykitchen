import {Component} from 'react'
import Header from '../Header'
import './index.css'

const defaultProfileDetails = {
  image: '',
  name: '',
  email: '',
  dataOfBirth: '',
  phoneNumber: '',
  gender: '',
}

const genderDetailsList = [
  {
    displayText: 'Choose your gender',
    optionId: 'CHOOSE YOUR GENDER',
  },
  {
    displayText: 'Male',
    optionId: 'MALE',
  },
  {
    displayText: 'Female',
    optionId: 'FEMALE',
  },
  {
    displayText: 'Others',
    optionId: 'OTHERS',
  },
  {
    displayText: 'Prefer not to disclose',
    optionId: 'PREFER NOT TO DISCLOSE',
  },
]

const initializeProfileDetails = () => {
  const profileDetailsData = localStorage.getItem('profileData')

  if (profileDetailsData === null) {
    return defaultProfileDetails
  }
  return JSON.parse(profileDetailsData)
}

class ProfileRoute extends Component {
  state = {
    imagePic: '',
    profileName: '',
    profileEmail: '',
    profileDataOfBirth: '',
    profileGender: genderDetailsList[0].optionId,
    profileNumber: '',
  }

  componentDidMount() {
    const profileInformationData = initializeProfileDetails()
    const {
      image,
      name,
      email,
      dataOfBirth,
      phoneNumber,
      gender,
    } = profileInformationData
    this.setState({
      profileName: name,
      profileEmail: email,
      profileNumber: phoneNumber,
      profileDataOfBirth: dataOfBirth,
      profileGender: gender,
      imagePic: image,
    })
  }

  onChangeProfileImage = event => {
    this.setState({
      imagePic: URL.createObjectURL(event.target.files[0]),
    })
    console.log(event.target.files[0])
  }

  onChangeName = event => {
    this.setState({
      profileName: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      profileDataOfBirth: event.target.value,
    })
  }

  onChangeNumber = event => {
    this.setState({
      profileNumber: event.target.value,
    })
  }

  onChangeEmail = event => {
    this.setState({
      profileEmail: event.target.value,
    })
  }

  onChangeGender = event => {
    this.setState({
      profileGender: event.target.value,
    })
  }

  updateProfileDetailsInLocalStorage = () => {
    const {
      imagePic,
      profileEmail,
      profileNumber,
      profileName,
      profileDataOfBirth,
      profileGender,
    } = this.state
    const profileInformation = {
      image: imagePic,
      name: profileName,
      email: profileEmail,
      dataOfBirth: profileDataOfBirth,
      phoneNumber: profileNumber,
      gender: profileGender,
    }
    localStorage.setItem('profileData', JSON.stringify(profileInformation))
  }

  resetProfilePage = () => {
    localStorage.removeItem('ProfileImg')
    localStorage.removeItem('profileData')
    this.setState({
      imagePic: '',
      profileName: '',
      profileEmail: '',
      profileNumber: '',
      profileDataOfBirth: '',
      profileGender: genderDetailsList[0].optionId,
    })
  }

  render() {
    const {
      imagePic,
      profileEmail,
      profileNumber,
      profileName,
      profileDataOfBirth,
      profileGender,
    } = this.state
    return (
      <div className="profile_container">
        <Header />
        <div className="profile_card">
          <div className="profile_img_container">
            {imagePic ? (
              <img
                src={imagePic}
                alt="profile pic"
                className="empty_profile_img"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/dpa9t5hi6/image/upload/v1687163808/blank-profile-picture-g79bf0bd78_640_oqwuu8.png"
                alt="empty profile"
                className="empty_profile_img"
              />
            )}
            <label htmlFor="profileImg" className="change_photo_label">
              Change Photo
            </label>
            <input
              type="file"
              id="profileImg"
              onChange={this.onChangeProfileImage}
              className="file_input"
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
          <div className="profile_data_container">
            <label className="profile_label" htmlFor="profileName">
              Full Name
            </label>
            <input
              type="text"
              onChange={this.onChangeName}
              value={profileName}
              id="profileName"
              className="profile_input_container"
            />
            <label htmlFor="profileEmail" className="profile_label">
              Email
            </label>
            <input
              type="email"
              onChange={this.onChangeEmail}
              value={profileEmail}
              id="profileEmail"
              className="profile_input_container"
            />
            <label htmlFor="profileNumber" className="profile_label">
              Phone Number
            </label>
            <input
              type="number"
              onChange={this.onChangeNumber}
              value={profileNumber}
              id="profileNumber"
              className="profile_input_container"
            />
            <label htmlFor="profileDataOfBirth" className="profile_label">
              Birthday
            </label>
            <input
              type="date"
              onChange={this.onChangeDate}
              value={profileDataOfBirth}
              id="profileDataOfBirth"
              className="profile_input_container"
            />
            <label htmlFor="profileGender" className="profile_label">
              Gender
            </label>
            <select
              onChange={this.onChangeGender}
              id="profileGender"
              value={profileGender}
              className="profile_input_container"
            >
              {genderDetailsList.map(eachGender => (
                <option value={eachGender.optionId} key={eachGender.optionId}>
                  {eachGender.displayText}
                </option>
              ))}
            </select>
            <div className="profile_button_container">
              <button
                onClick={this.updateProfileDetailsInLocalStorage}
                type="button"
                className="update_button"
              >
                Update Profile
              </button>
              <button
                type="button"
                className="reset_button"
                onClick={this.resetProfilePage}
              >
                Reset Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileRoute
