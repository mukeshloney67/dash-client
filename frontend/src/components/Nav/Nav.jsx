import React from 'react'
import './Nav.css'
import {assets} from "../../assets/assets"
const Nav = () => {
  return (
    <div className='navigation'>
        <img src={assets.image1} alt="" />
        <div className='title'>
            <h1>Samishak 1.0 - Realtime data monitoring</h1>
        </div>
    </div>
  )
}

export default Nav