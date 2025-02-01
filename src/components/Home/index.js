import {useState, useEffect} from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
// import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
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
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
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
  // const [moviesApiStatus, setMoviesApiStatus] = useState(null)
  const [Loading, setLoading] = useState(false)
  const jwtToken = Cookies.get('jwt_token')

  const isLoadingSpinner = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#1121d4" height={150} width={150} />
    </div>
  )

  const fetchJson = async () => {
    setLoading(true)
    const trendingMoviesApi = 'https://apis.ccbp.in/movies-app/trending-movies'
    const originalMoviesApi = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const trendingMoviesResponse = await fetch(trendingMoviesApi, options)
    const originalMoviesResponse = await fetch(originalMoviesApi, options)

    if (trendingMoviesResponse.ok) {
      const trendingMoviesData = await trendingMoviesResponse.json()
      const trendingMoviesResults = trendingMoviesData.results
      const trendingMoviesresultsCaseConversion = trendingMoviesResults.map(
        eachTrendingMovieDetails => ({
          id: eachTrendingMovieDetails.id,
          movieOverveiw: eachTrendingMovieDetails.overview,
          movieTitle: eachTrendingMovieDetails.title,
          movieBackDrop: eachTrendingMovieDetails.backdrop_path,
        }),
      )

      setTrendingMoviesData(trendingMoviesresultsCaseConversion)
    } else {
      // setMoviesApiStatus(false)
    }

    if (originalMoviesResponse.ok) {
      const originalMoviesData = await originalMoviesResponse.json()
      const originalMoviesResults = originalMoviesData.results
      const originalMoviesCaseConversion = originalMoviesResults.map(
        eachOriginalMovieDetails => ({
          id: eachOriginalMovieDetails.id,
          movieOverveiw: eachOriginalMovieDetails.overview,
          movieTitle: eachOriginalMovieDetails.title,
          movieBackDrop: eachOriginalMovieDetails.backdrop_path,
        }),
      )
      setOriginalMoviesData(originalMoviesCaseConversion)
    } else {
      // setMoviesApiStatus(false)
    }
    setLoading(false)
  }

  const renderSlider = moviesDataSent => (
    <Slider {...settings} className="react-slider-container">
      {moviesDataSent.map(eachLogo => {
        const {id, movieBackDrop, movieTitle} = eachLogo
        return (
          <div className="each-slick-item-container" key={id}>
            <img
              className="movie-thumbnail"
              src={movieBackDrop}
              alt={movieTitle}
            />
          </div>
        )
      })}
    </Slider>
  )

  const renderMovieDetailsSuccess = () => (
    <div className="render-movies-details-success-container">
      <div className="trending-movies-container-slick">
        <p className="trending-heading-para">Trending Now</p>
        <div className="trending-movies-container-slick-images-container">
          {renderSlider(trendingMoviesDataArray)}
        </div>
      </div>
      <div className="original-movies-container-slick">
        <p className="original-heading-para">Originals</p>
        <div className="original-movies-container-slick-images-container">
          {renderSlider(originalMoviesDataArray)}
        </div>
      </div>
    </div>
  )

  const superManContainer = () => (
    <div className="superman-container">
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
    fetchJson()
  }, [jwtToken])

  return (
    <div className="main-home-container">
      {Loading ? (
        <div className="home-container">
          <Header />
          {isLoadingSpinner()}
        </div>
      ) : (
        // Incorrect indentation here
        <div className="home-container">
          <div className="header-container-home-movies-success">
            <Header />
            {superManContainer()}
          </div>
          {renderMovieDetailsSuccess()}
          <Footer />
        </div>
      )}
    </div>
  )
}
export default Home
