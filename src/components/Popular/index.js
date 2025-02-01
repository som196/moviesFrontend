import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Popular = () => {
  const [popularMoviesDataArray, setPopularMoviesData] = useState([])
  // const [moviesApiStatus, setMoviesApiStatus] = useState(null)
  const [Loading, setLoading] = useState(false)
  const jwtToken = Cookies.get('jwt_token')

  const isLoadingSpinner = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#1121d4" height={150} width={150} />
    </div>
  )

  const fetchPopularMoviesDetails = async () => {
    setLoading(true)
    const getPopularMoviesApi = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const popularMoviesResponse = await fetch(getPopularMoviesApi, options)

    if (popularMoviesResponse.ok) {
      const popularMoviesData = await popularMoviesResponse.json()
      const popularMoviesResults = popularMoviesData.results
      const popularMoviesresultsCaseConversion = popularMoviesResults.map(
        eachPopularMoiveDetails => ({
          id: eachPopularMoiveDetails.id,
          movieOverveiw: eachPopularMoiveDetails.overview,
          movieTitle: eachPopularMoiveDetails.title,
          movieBackDrop: eachPopularMoiveDetails.backdrop_path,
          moviePosterPath: eachPopularMoiveDetails.poster_path,
        }),
      )

      setPopularMoviesData(popularMoviesresultsCaseConversion)
    } else {
      // setMoviesApiStatus(false)
    }
    setLoading(false)
  }

  const renderPopularMovieDetailsSuccess = () => (
    <div className="render-popular-movies-details-success-container">
      {popularMoviesDataArray.map(eachMovie => (
        <div key={eachMovie.id}>
          <img
            src={eachMovie.moviePosterPath}
            alt={eachMovie.title}
            className="each-image-popular-movie"
          />
        </div>
      ))}
    </div>
  )

  // const renderMovieDetailsFailure = () => (
  //   <div className="failed-container">
  //     <img
  //       src="https://res-console.cloudinary.com/dfq7jna42/media_explorer_thumbnails/6ba73f242440b9a7379f134adf76e18b/detailed"
  //       alt="not-found"
  //       className="not-found-img"
  //     />
  //     <p className="something-went-wrong-para">
  //       Something went wrong. Please try again.
  //     </p>
  //     <button type="button" className="try-again-button">
  //       Try Again
  //     </button>
  //   </div>
  // )

  useEffect(() => {
    fetchPopularMoviesDetails()
  }, [jwtToken])

  return (
    <div className="main-popular-container">
      {Loading ? (
        <div className="popular-container">
          <Header />
          {isLoadingSpinner()}
        </div>
      ) : (
        // Incorrect indentation here
        <div className="poular-container">
          <div className="header-container-popular-movies-success">
            <Header />
            {renderPopularMovieDetailsSuccess()}
          </div>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Popular
