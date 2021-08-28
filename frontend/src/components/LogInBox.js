// src/Title.js


import React from 'react'
import '../StyleSheets/LogInBox.css';
import LoginForm from './LoginForm';

function LogInBox() {
  return (
   
    <div className="LogInBox">
      <h1 className="Heading">Log In </h1>
      <div/>
      <LoginForm></LoginForm>
    </div>
  )
}

export default LogInBox;