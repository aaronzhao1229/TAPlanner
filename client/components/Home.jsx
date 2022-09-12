import React from 'react'
import { Link } from 'react-router-dom'
import UploadAFile from './UploadAFile'

export default function Home() {
  return (
    <>
      <div className="columns">
        <div className="column">
          <div className="card m-5">
            <div className="card-image has-text-centered">
              <figure className="image is-96x96 is-inline-block mt-4">
                <img src="./images/planning.png" alt="planning" />
              </figure>
            </div>
            <header className="card-header">
              <p className="card-header-title is-centered">
                <Link to="/planner" style={{ color: 'black' }}>
                  Planner
                </Link>
              </p>
            </header>
            <div clasName="card-content ">
              <div className="content ml-6 mr-6 mt-5">
                This planning tool provides dropdown lists which makes planning
                easier. Most information is based on official Te Araroa notes,
                which however may be not accurate. Please refer to the official
                TA notes.
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card m-5">
            <div className="card-image has-text-centered">
              <figure className="image is-96x96 is-inline-block mt-4">
                <img src="./images/gears.png" alt="gears" />
              </figure>
            </div>
            <header className="card-header">
              <p className="card-header-title is-centered">
                <Link to="/gears" style={{ color: 'black' }}>
                  Gears
                </Link>
              </p>
            </header>
            <div clasName="card-content ">
              <div className="content ml-6 mr-6 mt-5">
                A hiker using good, lightweight equipment has a better chance of
                finishing a hike than one overloaded with poor gear. This gear
                organising tool helps track the weight (as well as price) of
                your gears. To be developed.
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <a
            href={'https://www.flaticon.com'}
            title={'plan icons'}
            style={{ color: '#394851' }}
          >
            Icons created by Freepik - Flaticon
          </a>
        </div>
      </footer>

      <UploadAFile />
    </>
  )
}
