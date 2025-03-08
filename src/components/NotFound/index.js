import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="lost-heading">Lost Your Way?</h1>
    <p className="lost-para">
      we are sorry the page you requested could not be found.
      <br />
      Please go back to the homepage.
    </p>
    <Link to="/">
      <button type="button" className="lost-button">
        Go To Home
      </button>
    </Link>
  </div>
)

export default NotFound
