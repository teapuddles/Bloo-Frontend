import React from 'react';
import {NavLink} from 'react-router-dom'

export default class Form extends React.Component{


render(){
  return(
    <div className="title">
    Bloo Karaoke
  <ul className="nav">
    <li>
      <NavLink to="/login" className="navLink">Login</NavLink>
    </li>
    <li>
      <NavLink to="/register" className="navLink">Register</NavLink>
    </li>
    <li>
      <NavLink to="/profile" className="navLink">Profile</NavLink>
    </li>
    <li>
      <NavLink to="/findpitch" className="navLink">Find Your Pitch</NavLink>
    </li>
  </ul>
  </div>
  )
}
}