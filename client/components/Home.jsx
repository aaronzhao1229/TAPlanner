import React from 'react'

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
              <p className="card-header-title is-centered">Planner</p>
            </header>
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
              <p className="card-header-title is-centered">Gears</p>
            </header>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <a href={'https://www.flaticon.com'} title={'plan icons'}>
            Icons created by Freepik - Flaticon
          </a>
        </div>
      </footer>
    </>
  )
}
