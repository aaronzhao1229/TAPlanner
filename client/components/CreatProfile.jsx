import React, { useEffect, useState } from 'react'

const initialFormData = {
  firstName: '',
  lastName: '',
  location: '',
}

export default function CreateProfile() {
  const [form, setForm] = useState(initialFormData)
  const [selectedImage, setSelectedImage] = useState(null)

  const { firstName, lastName, location } = form
  function handleImageChange(e) {
    setSelectedImage(e.target.files[0])
  }
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="container">
      <h3 className="is-size-5">
        <strong>Create your profile</strong>
      </h3>

      <form
        action="/users/createProfile" // to be updated
        method="post"
        encType="multipart/form-data"
        className="container"
      >
        <div className="container mt-3">
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <input
            className="input"
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
        </div>
        <div className="container mt-3">
          <label htmlFor="lastName" className="label">
            Last Name
          </label>
          <input
            className="input"
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
        </div>
        <div className="container mt-3">
          <label htmlFor="location" className="label">
            Location
          </label>
          <input
            className="input"
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={handleChange}
          />
        </div>
        <div className="container mt-3">
          <label htmlFor="profile" className="label">
            Upload your photo
          </label>
          <input
            className="button is-primary mt-3"
            type="file"
            name="profile"
            id="profile"
            onChange={handleImageChange}
          />
        </div>
        <input className="button is-primary mt-3" type="submit" />
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
  )
}
