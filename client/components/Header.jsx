import React from 'react'

export default function Header() {
  return (
    <div
      className="hero p-5 has-text-centered"
      style={{
        backgroundImage:
          'linear-gradient(to right top, #0d5e92, #007bab, #00969f, #00ac6d, #48bb0f)',
      }}
    >
      <h1 className="is-size-3 has-text-white">Te Araroa Planner</h1>
    </div>
  )
}
