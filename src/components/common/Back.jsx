import React from "react"
import PropTypes from "prop-types"

const Back = ({ name, title, cover }) => {
  Back.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string
  }
  return (
    <>
      <div className='back'>
        <div className='container'>
          <span>{name}</span>
          <h1>{title}</h1>
        </div>
        <img src={cover} alt='' />
      </div>
    </>
  )
}

export default Back
