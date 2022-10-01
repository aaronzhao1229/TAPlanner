import React, { useState, useEffect } from 'react'
import { uploadProfile } from '../apis/user.api'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateLoggedInUser } from '../actions/loggedInUser'
import Header from './Header'
import Nav from './Nav'
const initialFormData = {
  firstName: '',
  lastName: '',
  location: '',
}

export default function CreateProfile() {
  const [form, setForm] = useState(initialFormData)
  const [selectedImage, setSelectedImage] = useState(null)
  const user = useSelector((state) => state.loggedInUser)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { firstName, lastName, location } = form

  useEffect(() => {
    if (user.firstName) navigate('/')
  }, [user])

  function handleImageChange(e) {
    setSelectedImage(e.target.files[0])
  }
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault(event)
    const userInfo = {
      auth0Id: user.auth0Id,
      ...form,
    }
    const formData = new FormData()
    formData.append('image', selectedImage)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('location', location)
    formData.append('auth0Id', user.auth0Id)
    uploadProfile(formData)
      .then(() => dispatch(updateLoggedInUser(userInfo)))
      .catch((err) => console.error(err.message))
  }

  return (
    <>
      <Header />
      <Nav />
      <div>
        <h3>
          <strong>Create your profile</strong>
        </h3>

        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="profile">Upload your photo</label>
            <input
              type="file"
              name="profile"
              id="profile"
              onChange={handleImageChange}
            />
          </div>
          <input type="submit" />
        </form>
        <h1>Upload and Display Image</h1>
        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={'250px'}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <br />
      </div>
    </>
  )
}
