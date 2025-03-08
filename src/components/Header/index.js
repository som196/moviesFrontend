import {Link, withRouter, Redirect} from 'react-router-dom'
import {useState, useRef, useEffect, useCallback} from 'react'
import {GoSearch} from 'react-icons/go'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import './index.css'

const Header = props => {
  const {location, history} = props
  const [searchInput, setSearchInput] = useState('')
  const [headerClass, setHeaderClass] = useState('nav-container')
  const [headerItemWeightHome, setHeaderItemWeightHome] = useState('')
  const [headerItemWeightPopular, setHeaderItemWeightPopular] = useState('')
  const [isHomeActive, setIsHomeActive] = useState(true)
  const [isPopularActive, setIsPopularActive] = useState(false)
  const [isFocused, setIsFocused] = useState(false) // Tracks focus state
  const [isFocusedButton, setIsFocusedButton] = useState(false) // Tracks focus state
  const [showFloater, setShowFloater] = useState(false)
  const [floaterClass, setFloaterClass] = useState('')
  const inputRef = useRef(null) // Ref for the input element
  const iconRef = useRef(null)

  const getHeaderClass = useCallback(() => {
    // Wrap with useCallback
    switch (location.pathname) {
      case '/':
        setHeaderItemWeightHome('active-class')
        setHeaderItemWeightPopular('inactive-class')
        setHeaderClass('nav-container')
        setFloaterClass('floater-content-home')
        break
      case '/popular':
        setHeaderItemWeightPopular('active-class')
        setHeaderItemWeightHome('inactive-class')
        setHeaderClass('background-active-not-home')
        setFloaterClass('floater-content-not-home')
        break
      case '/account':
        setHeaderClass('background-active-not-home')
        setFloaterClass('floater-content-not-home')
        break
      default:
        setHeaderClass('nav-container')
        setFloaterClass('floater-content-home')
    }
  }, [location.pathname])

  const homeParaClicked = () => {
    if (!isHomeActive) {
      setIsHomeActive(true)
      setIsPopularActive(false)
    }
  }

  const popularParaClicked = () => {
    if (!isPopularActive) {
      setIsHomeActive(false)
      setIsPopularActive(true)
    }
  }

  const onChangeSearchInput = async event => {
    await setSearchInput(event.target.value)
  }

  const searchIconClicked = () => {
    if (searchInput !== '') {
      history.push({
        pathname: '/search',
        state: {searchString: searchInput}, // Pass searchInput in state
      })
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      // Check if Enter key was pressed
      searchIconClicked() // Trigger the search
    }
  }

  const handleFocus = () => {
    setIsFocused(true) // Set focus state to true
  }

  const handleBlur = () => {
    setIsFocused(false) // Set focus state to false
    console.log('Input blurred.') // Perform validation or other actions
  }

  const handleFocusButton = () => {
    setIsFocused(true)
    setIsFocusedButton(true)
  }

  const handleBlurButton = () => {
    setIsFocused(false)
    setIsFocusedButton(false)
  }

  const searchcontainerClassName = `search-container ${
    isFocused ? 'focused' : ''
  }`

  const searchButtonClassName = `search-container ${
    isFocusedButton ? 'focused-button' : ''
  }`

  const profileImg =
    'https://res.cloudinary.com/dfq7jna42/image/upload/v1737356469/profileimg_zrhdde.png'

  const svgClicked = () => {
    setShowFloater(!showFloater)
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setIsFocused(false)
      }
      /*  .contains(event.target):  The contains() method is a DOM method.  
      It checks if a given DOM element is a descendant of another DOM element.
      In this case, it checks if the element that was clicked (event.target) is contained within the input element (inputRef.current) */
    }
    getHeaderClass()

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [inputRef, iconRef, getHeaderClass])

  const headerCode = () => (
    <header className={headerClass}>
      <div className="heading-home-popular-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dfq7jna42/image/upload/v1737899720/movies-logo_ath3ki.svg"
            alt="login website logo"
            className="movies-image-header"
          />
        </Link>
        <Link to="/" className="link-home-para">
          <p
            className={`${headerItemWeightHome} home-para-header`}
            onClick={homeParaClicked}
          >
            Home
          </p>
        </Link>
        <Link to="/popular" className="link-popular-para">
          <p
            className={`${headerItemWeightPopular} popular-para-header`}
            onClick={popularParaClicked}
          >
            Popular
          </p>
        </Link>
      </div>
      <div className="search-profile-img-container">
        <div className={searchcontainerClassName}>
          <input
            type="search"
            onChange={onChangeSearchInput}
            value={searchInput}
            className="my-input"
            id="text"
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="Search"
          />
          <button
            className={`search-icon-button ${searchButtonClassName}`}
            ref={iconRef}
            onFocus={handleFocusButton}
            onBlur={handleBlurButton}
            onClick={searchIconClicked}
            data-testid="searchButton"
            type="button"
          >
            <GoSearch className="search-icon" alt="search-icon" />
          </button>
        </div>
        <a href="/account" className="button-anchor">
          <button type="button" className="button-profile-img">
            <img src={profileImg} alt="profile-img" className="profile-img" />
          </button>
        </a>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="bars-svg"
          onClick={svgClicked}
        >
          <path
            d="M18.7123 22.4624C18.5998 22.4624 18.4498 22.4249 18.3373 22.3874L11.2498 18.5249C10.9873 18.3749 10.8373 18.1499 10.8748 17.8499C10.8748 17.5874 11.0248 17.3249 11.2873 17.1749L18.3748 13.6124C18.5998 13.4999 18.8998 13.4999 19.1248 13.6499C19.3498 13.7999 19.4998 14.0249 19.4998 14.2874V21.7124C19.4998 21.9749 19.3498 22.2374 19.1248 22.3499C18.9748 22.4249 18.8623 22.4624 18.7123 22.4624ZM13.2373 17.8874L17.9623 20.4374V15.4874L13.2373 17.8874Z"
            fill="white"
          />
          <path
            d="M18.75 6.75H1.875C1.4625 6.75 1.125 6.4125 1.125 6C1.125 5.5875 1.4625 5.25 1.875 5.25H18.75C19.1625 5.25 19.5 5.5875 19.5 6C19.5 6.4125 19.1625 6.75 18.75 6.75Z"
            fill="white"
          />
          <path
            d="M18.75 12.75H1.875C1.4625 12.75 1.125 12.4125 1.125 12C1.125 11.5875 1.4625 11.25 1.875 11.25H18.75C19.1625 11.25 19.5 11.5875 19.5 12C19.5 12.4125 19.1625 12.75 18.75 12.75Z"
            fill="white"
          />
          <path
            d="M9.375 18.75H1.875C1.4625 18.75 1.125 18.4125 1.125 18C1.125 17.5875 1.4625 17.25 1.875 17.25H9.375C9.7875 17.25 10.125 17.5875 10.125 18C10.125 18.4125 9.7875 18.75 9.375 18.75Z"
            fill="white"
          />
        </svg>
      </div>
      {showFloater ? (
        <div className={floaterClass}>
          <Link to="/">Home</Link>
          <Link to="/popular">Popular</Link>
          <Link to="/account">Account</Link>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="fa-xmark"
            onClick={svgClicked}
          />
        </div>
      ) : (
        ''
      )}
    </header>
  )

  return headerCode()
}

export default withRouter(Header)
