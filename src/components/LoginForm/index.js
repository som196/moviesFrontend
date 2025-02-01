import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = props => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState('')
  const {history} = props

  const userNameChanged = event => {
    setUserName(event.target.value)
  }

  const passwordChanged = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    if (history) {
      Cookies.set('jwt_token', jwtToken, {
        expires: 30,
        path: '/',
      })
      history.replace('/')
    }
  }

  const onSubmitFailure = error1 => {
    setShowError(true)
    setError(error1)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)

    const data = await response.json()

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="main-container">
      <img
        src="https://res.cloudinary.com/dfq7jna42/image/upload/v1737899720/movies-logo_ath3ki.svg"
        alt="login website logo"
        className="movies-image-login"
      />
      <form className="input-container" onSubmit={submitForm}>
        <h1 className="login-form-heading">Login</h1>
        <div className="input-container-username">
          <label htmlFor="user" className="label">
            USERNAME
          </label>
          <input
            type="text"
            id="user"
            value={username}
            onChange={userNameChanged}
            placeholder="username"
            className="input"
          />
        </div>
        <div className="input-container-password">
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordChanged}
            className="input"
            placeholder="password"
          />
        </div>
        <div className="error-container">
          {showError && <p className="error-message">*{error}</p>}
        </div>
        <div className="button-container">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
