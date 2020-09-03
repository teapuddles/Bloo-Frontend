import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom'

// useCallback - the first argument is the function, the second argument is an array of values that it depends on. Array can be empty too!

const LoginFormNew = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

  const handleUsernameChange = useCallback((e) => {
    const { value } = e.target
    setUsername(value)
  }, [])

  const handlePasswordChange = useCallback((e) => {
    const { value } = e.target
    setPassword(value)
  }, [])

  const handleResponse = useCallback((response) => {
    if (response.user) {
      localStorage.token = response.token
      localStorage.username = response.user.username
      props.handleCurrentUser(localStorage.username)
      setRedirect(true)
    }
    else {
      alert(response.error)
    }
  }, [props])

  /**
    https://alligator.io/js/object-property-shorthand-es6/
    We're using "object property shorthand" for the username & password object below:
    { username: username, password: password } becomes { username, password },
    since username and password are already defined in the useState above.
    Same with "body" inside the `fetch`
  */
  const handleLoginSubmit = useCallback((logUser) => {
    logUser.preventDefault()

    const body = JSON.stringify({
      username,
      password
    })
    fetch(`https://ancient-mesa-98163.herokuapp.com/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body
    })
        .then(r => r.json())
        .then(handleResponse)
  }, [username, password, handleResponse])

  return (
    <div className="container">
      <form onSubmit={handleLoginSubmit} >
          <h1>Login</h1>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" value={username} onChange={handleUsernameChange} />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={password} onChange={handlePasswordChange} />
          <input type="submit" value="Submit" />
      </form>
      {
          redirect ? 
          <Redirect push to="/profile" />
          :
          <p></p>
      }
      </div>
  )
}

export default LoginFormNew