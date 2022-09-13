import React, { useState } from 'react'
import { uploadImage } from '../apiClient'

export default function UploadAFile() {
  const [selectedImage, setSelectedImage] = useState(null)
  function handleChange(e) {
    setSelectedImage(e.target.files[0])
    uploadImage(e.target.files[0])
  }

  // function saveToServer() {
  //   console.log('save to server')
  //   uploadImage(selectedImage)
  // }

  return (
    <>
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
      <input type="file" name="image" onChange={handleChange} />
    </>
  )
}
