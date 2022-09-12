import React, { useState } from 'react'

export default function UploadAFile() {
  const [selectedImage, setSelectedImage] = useState(null)
  function handleChange(e) {
    setSelectedImage(e.target.files[0])
  }

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
