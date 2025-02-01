import {Link, withRouter} from 'react-router-dom'
import {useState, useRef, useEffect, useCallback} from 'react'
import {GoSearch} from 'react-icons/go'
import './index.css'

const Header = props => {
  const {location} = props
  const [searchInput, setSearchInput] = useState('')
  const [headerClass, setHeaderClass] = useState('nav-container')
  const [headerItemWeightHome, setHeaderItemWeightHome] = useState('')
  const [headerItemWeightPopular, setHeaderItemWeightPopular] = useState('')
  const [isHomeActive, setIsHomeActive] = useState(true)
  const [isPopularActive, setIsPopularActive] = useState(false)

  // const headerClass =
  //   location.pathname === '/' ? 'nav-container' : 'background-active-not-home'
  // const headerItemWeightHome = isHomeActive ? 'active-class' : 'inactive-class'
  // const headerItemWeightPopular = isPopularActive
  //   ? 'active-class'
  //   : 'inactive-class'

  const getHeaderClass = useCallback(() => {
    // Wrap with useCallback
    switch (location.pathname) {
      case '/':
        setHeaderItemWeightHome('active-class')
        setHeaderItemWeightPopular('inactive-class')
        setHeaderClass('nav-container')
        break
      case '/popular':
        setHeaderItemWeightPopular('active-class')
        setHeaderItemWeightHome('inactive-class')
        setHeaderClass('background-active-not-home')
        break
      default:
        setHeaderClass('background-active-not-home')
    }
  }, [location.pathname]) // Dependency array for useCallback

  // const activeOrNotClassNameHome = isHomeActive
  //   ? 'active-class'
  //   : 'inactive-class'
  // const activeOrNotClassNamePopular = isPopularActive
  //   ? 'active-class'
  //   : 'inactive-class'

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

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const [isFocused, setIsFocused] = useState(false) // Tracks focus state
  const inputRef = useRef(null) // Ref for the input element
  const iconRef = useRef(null)

  const handleFocus = () => {
    setIsFocused(true) // Set focus state to true
  }

  const handleBlur = () => {
    setIsFocused(false) // Set focus state to false
    console.log('Input blurred.') // Perform validation or other actions
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
    }
    getHeaderClass()

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [inputRef, iconRef, getHeaderClass])

  const searchcontainerClassName = `search-container ${
    isFocused ? 'focused' : ''
  }`

  const profileImg =
    'https://res.cloudinary.com/dfq7jna42/image/upload/v1737356469/profileimg_zrhdde.png'

  return (
    <header className={headerClass}>
      <div className="heading-home-popular-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dfq7jna42/image/upload/v1737899720/movies-logo_ath3ki.svg"
            alt="login website logo"
            className="movies-image-header"
          />
        </Link>
        <Link to="/">
          <p
            className={`${headerItemWeightHome} home-para-header`}
            onClick={homeParaClicked}
          >
            Home
          </p>
        </Link>
        <Link to="/popular">
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
            type="text"
            onChange={onChangeSearchInput}
            value={searchInput}
            className="my-input"
            id="text"
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button
            className="search-icon-button"
            ref={iconRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="button"
          >
            <GoSearch
              className="search-icon"
              alt="search-icon"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </button>
        </div>
        <button type="button" className="button-profile-img">
          <img src={profileImg} alt="profile-img" className="profile-img" />
        </button>
      </div>
    </header>
  )
}

export default withRouter(Header)
