import Loader from 'react-loader-spinner'
import './index.css'

const LoaderComponent = props => {
  const {height, width} = props
  const isLoadingSpinner = (height2, width2) => (
    <div className="loader-container-component" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={height2} width={width2} />
    </div>
  )
  return isLoadingSpinner(height, width)
}

export default LoaderComponent
