import React, { useState } from 'react'
import { uploadImage } from '../apiClient'

export default function UploadAFile() {
  const [selectedImage, setSelectedImage] = useState(null)
  function handleChange(e) {
    setSelectedImage(e.target.files[0])
  }

  // function saveToServer(e) {
  //   e.preventDefault()
  //   console.log('save to server')

  //   uploadImage({ file: { fieldname: 'image', buffer: selectedImage } })
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
      <form action="/uploadImage" method="post" encType="multipart/form-data">
        <input type="file" name="image" onChange={handleChange} />
        <input type="submit" />
      </form>
      {/* <form onSubmit={saveToServer} encType="multipart/form-data">
        <input type="file" name="image" onChange={handleChange} />
        <input type="submit" />
      </form> */}
    </>
  )
}
