import React, { useEffect, useState } from 'react'

import { getImages } from '../apis/apiClient'

const initialImageData = [{ id: '', url: '' }]
export default function Gears() {
  const [images, setImages] = useState(initialImageData)
  useEffect(() => {
    getImages()
      .then((imgs) => {
        return setImages(imgs)
      })
      .catch((err) => {
        console.error(err.message + 'Planner useEffect')
      })
  }, [])
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <p>Sleeping system</p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <p>Kitchen</p>
        </div>
      </div>
    </div>
  )
}
