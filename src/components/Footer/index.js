import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faGoogle,
  faTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons' // Import individual icons

import './index.css'

const footerContainer = () => (
  <footer className="main-footer-container">
    <div className="footer-container">
      <button type="button" className="icon-button">
        <FontAwesomeIcon icon={faGoogle} className="footer-icons" />
      </button>
      <button type="button" className="icon-button">
        <FontAwesomeIcon icon={faTwitter} className="footer-icons" />
      </button>
      <button type="button" className="icon-button">
        <FontAwesomeIcon icon={faInstagram} className="footer-icons" />
      </button>
      <button type="button" className="icon-button">
        <FontAwesomeIcon icon={faYoutube} className="footer-icons" />
      </button>
    </div>
    <p className="contact-us-para">Contact Us</p>
  </footer>
)

export default footerContainer
