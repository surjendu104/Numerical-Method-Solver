import React from 'react'
import '../styles/Landing.css'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate();
    const handelClick = () => {
        navigate('/home')
    }
  return (
    <div className='landing-container'>
        <button className='outer-buttons' id='landing-button' onClick={handelClick}>Launch</button>
    </div>
  )
}

export default Landing