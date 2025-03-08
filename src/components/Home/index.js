import {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons' // Import individual icons
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import LoaderComponent from '../LoaderComponent'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const Home = () => {
  const [trendingMoviesDataArray, setTrendingMoviesData] = useState([])
  const [originalMoviesDataArray, setOriginalMoviesData] = useState([])
  const [trendingMoviesApiStatus, setTrendingMoviesApiStatus] = useState(false)
  const [originalMoviesApiStatus, setOriginalMoviesApiStatus] = useState(false)
  const [isTrendingLoading, setTrendingLoading] = useState(false)
  const [isOriginalsLoading, setOriginalsLoading] = useState(false)
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

  const fetchTrendingMovieDetails = useCallback(async () => {
    setTrendingLoading(true)
    const trendingMoviesApi = 'https://apis.ccbp.in/movies-app/trending-movies'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const trendingMoviesResponse = await fetch(trendingMoviesApi, options)

      if (trendingMoviesResponse.ok) {
        const trendingMoviesData = await trendingMoviesResponse.json()
        const trendingMoviesResults = trendingMoviesData.results
        const trendingMoviesresultsCaseConversion = caseConversionMoviesApiResults(
          trendingMoviesResults,
        )

        setTrendingMoviesData(trendingMoviesresultsCaseConversion)
      }
    } catch (error) {
      console.log(error.message)
      setTrendingMoviesApiStatus(true)
    }
    setTrendingLoading(false)
  }, [jwtToken])

  const fetchOriginalsMovieDetails = useCallback(async () => {
    setOriginalsLoading(true)
    const originalMoviesApi = 'https://apis.ccbp.in/movies-app/originals'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const originalMoviesResponse = await fetch(originalMoviesApi, options)

      if (originalMoviesResponse.ok) {
        const originalMoviesData = await originalMoviesResponse.json()
        const originalMoviesResults = originalMoviesData.results
        const originalMoviesCaseConversion = caseConversionMoviesApiResults(
          originalMoviesResults,
        )
        setOriginalMoviesData(originalMoviesCaseConversion)
      }
    } catch (error) {
      console.log(error)
      setOriginalMoviesApiStatus(true)
    }
    setOriginalsLoading(false)
  }, [jwtToken])

  const renderSlider = moviesDataSent => (
    <Slider {...settings} className="react-slider-container">
      {moviesDataSent.map(eachLogo => {
        const {id, movieBackDrop, movieTitle} = eachLogo
        return (
          <Link
            className="each-slick-item-container"
            key={id}
            to={`/movies-app/movies/${id}`}
          >
            <img
              className="movie-thumbnail"
              src={movieBackDrop}
              alt={movieTitle}
            />
          </Link>
        )
      })}
    </Slider>
  )

  const renderTrendingMovieDetailsSuccess = () => (
    <div className="trending-movies-container-slick">
      <h1 className="trending-heading-para">Trending Now</h1>
      <div className="trending-movies-container-slick-images-container">
        {renderSlider(trendingMoviesDataArray)}
      </div>
    </div>
  )

  const renderOriginalMovieDetailsSuccess = () => (
    <div className="original-movies-container-slick">
      <h1 className="original-heading-para">Originals</h1>
      <div className="original-movies-container-slick-images-container">
        {renderSlider(originalMoviesDataArray)}
      </div>
    </div>
  )

  const superManContainer = () => (
    <div className="superman-container-content">
      <h1 className="superman-heading">Super Man</h1>
      <p className="superman-para">
        Superman is a fictional superhero who first appeared in American comic
        books published by DC Comics.
      </p>
      <button type="button" className="superman-play-button">
        Play
      </button>
    </div>
  )

  const renderMovieDetailsFailure = fetchMovieDetails2 => (
    <div className="failed-container-home">
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="exclamation-triangle"
      />
      <p className="something-went-wrong-para">
        Something went wrong. Please try again.
      </p>
      <button
        type="button"
        className="try-again-button-home"
        onClick={fetchMovieDetails2}
      >
        Try Again
      </button>
    </div>
  )

  const renderMovies = (
    loader,
    apiDetailsReceived,
    apiDetialsFailed,
    paraContent,
    renderMovieDetailsFailure2,
    fetchMovieDetails,
  ) => {
    switch (
      true // Use 'true' to evaluate boolean expressions
    ) {
      case loader:
        return (
          <div className="home-container">
            <p className="trending-heading-para">{paraContent}</p>
            <LoaderComponent height={64} width={64} />
          </div>
        )
      case apiDetialsFailed:
        return (
          <div>
            <p className="original-heading-para">{paraContent}</p>
            {renderMovieDetailsFailure2(fetchMovieDetails)}
          </div>
        )
      default:
        return apiDetailsReceived()
    }
  }

  useEffect(() => {
    fetchTrendingMovieDetails()
    fetchOriginalsMovieDetails()
  }, [fetchTrendingMovieDetails, fetchOriginalsMovieDetails])

  const mainHome = () => (
    <div className="main-home-container">
      {isOriginalsLoading ? (
        <div>
          <Header />
          <div className="superman-container-loading-main-container">
            <LoaderComponent height={64} width={64} />
          </div>
        </div>
      ) : (
        <div className="header-container-home-movies-success">
          <Header />
          {superManContainer()}
        </div>
      )}
      <div className="render-movies-details-success-container">
        {renderMovies(
          isTrendingLoading,
          renderTrendingMovieDetailsSuccess,
          trendingMoviesApiStatus,
          'Trending Now',
          renderMovieDetailsFailure,
          fetchTrendingMovieDetails,
        )}
        {renderMovies(
          isOriginalsLoading,
          renderOriginalMovieDetailsSuccess,
          originalMoviesApiStatus,
          'Originals',
          renderMovieDetailsFailure,
          fetchOriginalsMovieDetails,
        )}
      </div>
      <Footer />
    </div>
  )

  return mainHome()
}

export default Home
