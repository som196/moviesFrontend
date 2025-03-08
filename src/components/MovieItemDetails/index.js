import {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import LoaderComponent from '../LoaderComponent'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const MovieItemDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const [isMovieDetailsLoading, setIsMovieDetailsLoading] = useState(true)
  const [
    isMovieItemDetailsApiFailed,
    setIsMovieItemDetailsApiFailed,
  ] = useState(false)
  const [allMovieDetails, setMovieDetails] = useState([])
  const [similarMoviesDetails, setSimilarMovieDetails] = useState([])
  const jwtToken = Cookies.get('jwt_token')

  const caseConversionSimilarMoviesApiResults = movieResults => {
    const moviesresultsCaseConverted = movieResults.map(eachMovieDetails => ({
      id: eachMovieDetails.id,
      movieTitle: eachMovieDetails.title,
      movieBackDrop: eachMovieDetails.backdrop_path,
      moviePosterPath: eachMovieDetails.poster_path,
    }))
    return moviesresultsCaseConverted
  }

  const fetchMovieItemDetails = useCallback(async () => {
    setIsMovieDetailsLoading(true)
    const movieItemDetailsApi = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const movieDetailsResponse = await fetch(movieItemDetailsApi, options)

      if (movieDetailsResponse.ok) {
        const movieDetailsJson = await movieDetailsResponse.json()
        const movieDetails = movieDetailsJson.movie_details
        const movieDetailsCaseConverted = {
          adult: movieDetails.adult,
          backdropPath: movieDetails.backdrop_path,
          budget: movieDetails.budget,
          genres: movieDetails.genres.map(eachGenre => ({
            id: eachGenre.id,
            name: eachGenre.name,
          })),
          id: movieDetails.id,
          overview: movieDetails.overview,
          posterPath: movieDetails.poster_path,
          releaseDate: movieDetails.release_date,
          runtime: movieDetails.runtime,
          title: movieDetails.title,
          voteAverage: movieDetails.vote_average,
          voteCount: movieDetails.vote_count,
          spokenLanguages: movieDetails.spoken_languages.map(eachLanguage => ({
            id: eachLanguage.id,
            englishName: eachLanguage.english_name,
          })),
        }

        setMovieDetails(movieDetailsCaseConverted)

        const similarMovies = movieDetails.similar_movies

        const similarMoviesCaseConverted = caseConversionSimilarMoviesApiResults(
          similarMovies,
        )

        setSimilarMovieDetails(similarMoviesCaseConverted)
      }
    } catch (error) {
      setIsMovieItemDetailsApiFailed(true)
    }
    setIsMovieDetailsLoading(false)
  }, [id, jwtToken])

  const renderMovieItemDetails = () => {
    const backgroundImage = `url(${allMovieDetails.backdropPath})`
    return (
      <div className="movied-item-details-all-container">
        <div
          className="header-movies-content-container"
          style={{'--background-image': backgroundImage}}
        >
          <Header />
          <div className="movie-heading-runtime-container">
            <h1 className="movie-title-heading">{allMovieDetails.title}</h1>
            <div className="runtime-certification-release-year-container">
              <p className="runtime-para">{allMovieDetails.runtime}</p>
              <p className="movie-certification-para">
                {allMovieDetails.adult ? 'A' : 'U/A'}
              </p>
              <p className="movie-relase-year-para">
                {format(new Date(allMovieDetails.releaseDate), 'do MMM yyyy')}
              </p>
            </div>
            <p className="movie-details-overview">{allMovieDetails.overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>
        <div className="movie-genres-audio-rating-budget-container">
          <div className="movie-genre-container">
            <h1 className="genre-heading">Genres</h1>
            {allMovieDetails.genres.map(eachGenre => (
              <div key={eachGenre.id}>
                <p className="each-genre-para">{eachGenre.name}</p>
              </div>
            ))}
          </div>
          <div className="spoken-languages-container">
            <h1 className="audio-available-heading">Audio Available</h1>
            {allMovieDetails.spokenLanguages.map(eachLanguage => (
              <div key={eachLanguage.id}>
                <p className="each-language-para">{eachLanguage.englishName}</p>
              </div>
            ))}
          </div>
          <div>
            <div className="rating-count-container">
              <h1 className="rating-heading">Rating Count</h1>
              <p className="rating-para">{allMovieDetails.voteCount}</p>
            </div>
            <div className="rating-average-container">
              <h1 className="rating-average-heading">Rating Average</h1>
              <p className="voting-para">{allMovieDetails.voteAverage}</p>
            </div>
          </div>
          <div>
            <div className="budget-container">
              <h1 className="budget-heading">Budget</h1>
              <p className="budget-para">{allMovieDetails.budget}</p>
            </div>
            <div className="release-date">
              <h1 className="release-date-heading">Release Date</h1>
              <p className="release-para">{allMovieDetails.releaseDate}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSimilarMovieDetails = () => (
    <div className="similar-movies-details-container">
      <h1 className="more-like-this-heading">More like this</h1>
      <div className="similar-movies-images-container">
        {similarMoviesDetails.map(eachSimilarMovie => (
          <Link
            className="similar-movie-img-container"
            key={eachSimilarMovie.id}
            to={`/movies-app/movies/${eachSimilarMovie.id}`}
          >
            <img
              src={eachSimilarMovie.moviePosterPath}
              alt={eachSimilarMovie.movieTitle}
              className="each-similar-movie-img"
            />
          </Link>
        ))}
      </div>
    </div>
  )

  const renderMovieDetailsFailure = fetchMovieDetails2 => (
    <div className="failed-container-movie-item">
      <img
        src="https://res.cloudinary.com/dfq7jna42/image/upload/Moviesapp/ki0t3imy4kwqwrhtbgze.png"
        className="something-went-wrong-img"
        alt="something-went-wrong"
      />
      <p className="something-went-wrong-para">
        Something went wrong. Please try again.
      </p>
      <button
        type="button"
        className="try-again-button-movie-item"
        onClick={fetchMovieDetails2}
      >
        Try Again
      </button>
    </div>
  )

  const renderMovieItem = (
    loader,
    apiDetailsReceived1,
    apiDetailsReceived2,
    apiDetialsFailed,
    renderMovieDetailsFailure2,
  ) => {
    switch (
      true // Use 'true' to evaluate boolean expressions
    ) {
      case loader:
        return (
          <div className="popular-container">
            <Header />
            <LoaderComponent height={64} width={64} />
          </div>
        )
      case apiDetialsFailed:
        return (
          <div className="popular-container">
            {renderMovieDetailsFailure2(fetchMovieItemDetails)}
          </div>
        )
      default:
        return (
          <div>
            {apiDetailsReceived1()}
            {apiDetailsReceived2()}
          </div>
        )
    }
  }

  useEffect(() => {
    fetchMovieItemDetails()
  }, [id, fetchMovieItemDetails])

  return (
    <div className="return-main-movie-details-container">
      {renderMovieItem(
        isMovieDetailsLoading,
        renderMovieItemDetails,
        renderSimilarMovieDetails,
        isMovieItemDetailsApiFailed,
        renderMovieDetailsFailure,
      )}

      <Footer />
    </div>
  )
}

export default MovieItemDetails
