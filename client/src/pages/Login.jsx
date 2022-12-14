// import axios from 'axios'
import React, { useContext, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
// import { AuthContext } from '../context/authContext'

function Login() {
  const [inputs,setInputs] = useState({
    username: '',
    password: '',
  })

  const [err,setError] = useState(null)

//   const {login} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value}))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // await login(inputs)
      navigate("/")
    }
    catch(err) {
      setError(err.response.data)
    }
  }
  return (
    <div className="auth">
      <h1>Login</h1>
      <form action="">
        <input type="text" placeholder='username'  onChange={handleChange} name="username" />
        <input type="password" placeholder='password' onChange={handleChange} name="password" />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>Don't you have an account ? <Link to='/register'>Register</Link></span>
      </form>
    </div>
  )
}

export default Login

