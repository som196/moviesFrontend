import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import AuthContext from '../AuthContext'
import './index.css'

const AccountDetails = props => (
  <AuthContext.Consumer>
    {value => {
      const {authUsername} = value
      const astericks = '*'.repeat(7)

      const logOutButtonClicked = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      const accountDetails = () => (
        <div className="account-info-container">
          <h1 className="account-heading">Account</h1>
          <hr className="hr-line" />
          <div className="row">
            <label htmlFor="membership">Membership:</label>
            <span id="membership">{authUsername}</span>
          </div>
          <div className="row">
            <label htmlFor="password">Password:</label>
            <span id="password">{astericks}</span>
          </div>
          <hr className="hr-line" />
          <div className="row">
            <label htmlFor="plan">Plan details:</label>
            <span id="plan">
              Premium <span className="ultra-hd">Ultra HD</span>
            </span>
          </div>
          <hr className="hr-line" />
          <button
            type="button"
            className="logout-button"
            onClick={logOutButtonClicked}
          >
            Logout
          </button>
        </div>
      )

      return (
        <div>
          <Header />
          {accountDetails()}
          <Footer />
        </div>
      )
    }}
  </AuthContext.Consumer>
)

export default AccountDetails
