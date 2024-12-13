import React from "react"
import PropTypes from 'prop-types';

const Heading = ({ title, subtitle }) => {
  Heading.PropTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
  }
  return (
    <>
      <div className='heading'>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </>
  )
}

export default Heading
