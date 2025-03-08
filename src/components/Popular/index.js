import {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons' // Import individual icons
import LoaderComponent from '../LoaderComponent'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Popular = () => {
  const [popularMoviesDataArray, setPopularMoviesData] = useState([])
  const [popularMoviesApiStatus, setPopularMoviesApiStatus] = useState(null)
  const [isPopularLoading, setPopularLoading] = useState(false)
  const jwtToken = Cookies.get('jwt_token')

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

  const fetchPopularMoviesDetails = useCallback(async () => {
    setPopularLoading(true)
    const getPopularMoviesApi = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const popularMoviesResponse = await fetch(getPopularMoviesApi, options)

      if (popularMoviesResponse.ok) {
        const popularMoviesData = await popularMoviesResponse.json()
        const popularMoviesResults = popularMoviesData.results
        const popularMoviesresultsCaseConversion = caseConversionMoviesApiResults(
          popularMoviesResults,
        )

        setPopularMoviesData(popularMoviesresultsCaseConversion)
      }
    } catch (error) {
      setPopularMoviesApiStatus(true)
      console.log(error)
    }
    setPopularLoading(false)
  }, [jwtToken])

  const renderPopularMovieDetailsSuccess = () => (
    <div className="render-popular-movies-details-success-container">
      {popularMoviesDataArray.map(eachMovie => (
        <Link
          className="each-slick-item-container-popular"
          key={eachMovie.id}
          to={`/movies-app/movies/${eachMovie.id}`}
        >
          <img
            src={eachMovie.moviePosterPath}
            alt={eachMovie.title}
            className="each-image-popular-movie"
          />
        </Link>
      ))}
    </div>
  )

  const renderMovieDetailsFailure = () => (
    <div className="failed-container-popular">
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="exclamation-triangle-popular"
      />
      <p className="something-went-wrong-para">
        Something went wrong. Please try again.
      </p>
      <button
        type="button"
        className="try-again-button-popular"
        onClick={fetchPopularMoviesDetails}
      >
        Try Again
      </button>
    </div>
  )

  const renderMovies = (
    loader,
    apiDetailsReceived,
    apiDetialsFailed,
    renderMovieDetailsFailure2,
  ) => {
    switch (
      true // Use 'true' to evaluate boolean expressions
    ) {
      case loader:
        return (
          <div className="popular-container">
            <LoaderComponent height={64} width={64} />
          </div>
        )
      case apiDetialsFailed:
        return (
          <div className="popular-container">
            {renderMovieDetailsFailure2()}
          </div>
        )
      default:
        return apiDetailsReceived()
    }
  }

  useEffect(() => {
    fetchPopularMoviesDetails()
  }, [fetchPopularMoviesDetails])

  return (
    <div className="main-popular-container">
      <Header />
      {renderMovies(
        isPopularLoading,
        renderPopularMovieDetailsSuccess,
        popularMoviesApiStatus,
        renderMovieDetailsFailure,
      )}
      <Footer />
    </div>
  )
}

export default Popular

// {isPopularLoading ? (
//         <div className="popular-container">
//           <Header />
//           <LoaderComponent height={65} width={65} />
//         </div>
//       ) : (
//         // Incorrect indentation here
//         <div className="poular-container">
//           <div className="header-container-popular-movies-success">
//             <Header />
//             {renderPopularMovieDetailsSuccess()}
//           </div>
//           <Footer />
//         </div>
//       )}
