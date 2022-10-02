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
        <div className="hero">
          <h3>
            <strong>Create your profile</strong>
          </h3>
        </div>
        <div className="hero">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              <label htmlFor="location" className="label">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              <label htmlFor="profile" className="label">
                Upload your photo
              </label>
              <input
                type="file"
                name="profile"
                id="profile"
                onChange={handleImageChange}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <input
              type="submit"
              className="btn rounded btn-primary hover:opacity-80 mt-5 mb-5"
            />
          </form>
        </div>
        <div className="hero">
          {selectedImage && (
            <div>
              <img
                alt="not found"
                width={'250px'}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button
                onClick={() => setSelectedImage(null)}
                className="btn rounded btn-secondary hover:opacity-80 mt-5 mb-5"
              >
                Remove
              </button>
            </div>
          )}
          <br />
        </div>
      </div>
    </>
  )
}
