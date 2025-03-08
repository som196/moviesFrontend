import {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoaderComponent from '../LoaderComponent'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const SearchComponent = props => {
  const {location} = props
  const jwtToken = Cookies.get('jwt_token')
  const searchString = location.state?.searchString
  const [isSearchLoading, setSearchLoading] = useState(false)
  const [searchedMoviesDataArray, setSearchedMoviesData] = useState([])

  const caseConversionMoviesApiResults = movieResults => {
    const moviesresultsCaseConverted = movieResults.map(eachMovieDetails => ({
      id: eachMovieDetails.id,
      movieOverveiw: eachMovieDetails.overview,
      movieTitle: eachMovieDetails.title,
      movieBackDrop: eachMovieDetails.backdrop_path,
      moviePosterPath: eachMovieDetails.poster_path,
    }))
    return moviesresultsCaseConverted
  }

  const fetchSearchedMovieDetails = useCallback(
    async searchString2 => {
      setSearchLoading(true)
      const searchApi = `https://apis.ccbp.in/movies-app/movies-search?search=${searchString2}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const searchMoviesResponse = await fetch(searchApi, options)
      if (searchMoviesResponse.ok) {
        const searchMoviesData = await searchMoviesResponse.json()
        const searchMoviesResults = searchMoviesData.results
        if (searchMoviesResults.length > 0) {
          const searchMoviesCaseConversion = caseConversionMoviesApiResults(
            searchMoviesResults,
          )
          setSearchedMoviesData(searchMoviesCaseConversion)
        } else {
          setSearchedMoviesData('')
        }
      } else {
        // setMoviesApiStatus(false)
        console.log('Failed')
      }
      setSearchLoading(false)
    },
    [jwtToken, searchString],
  )

  // const searchFailed  = () =>{

  // }

  const renderSearchedMovieDetailsSuccess = () => (
    <div className="all-search-movie-results-container">
      {/* A wrapping div is needed to avoid returning multiple elements */}
      {searchedMoviesDataArray.length > 0 && (
        <div className="render-searched-movies-details-success-container">
          {searchedMoviesDataArray.map(eachMovie => (
            <Link
              className="similar-movie-img-container"
              key={eachMovie.id}
              to={`/movies-app/movies/${eachMovie.id}`}
            >
              <img
                src={eachMovie.moviePosterPath}
                alt={eachMovie.movieTitle}
                className="each-image-search-movie"
              />
            </Link>
          ))}
        </div>
      )}
      {searchedMoviesDataArray.length === 0 && ( // Check for empty array and use ===
        <div className="no-movies-container">
          <img
            src="https://res.cloudinary.com/dfq7jna42/image/upload/v1737913641/Moviesapp/w2aqmucmivlhoh4piamg.png"
            alt="no movies"
            className="no-movies-img"
          />
          <p className="no-movies-para">
            Your search for {searchString} did not find any matches
          </p>
        </div>
      )}
    </div>
  )

  const searchResultsHome = () => (
    <div className="main-search-container">
      <Header />
      {isSearchLoading ? (
        <LoaderComponent height={64} width={64} />
      ) : (
        renderSearchedMovieDetailsSuccess()
      )}
      <Footer />
    </div>
  )

  useEffect(() => {
    if (searchString) {
      // Check if searchString exists
      console.log('use effect')
      fetchSearchedMovieDetails(searchString)
    }
  }, [searchString, fetchSearchedMovieDetails]) // searchString is a dependency

  return searchResultsHome()
}

export default SearchComponent
