import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Popular from './components/Popular'
import SearchComponent from './components/SearchComponent'
import MovieItemDetails from './components/MovieItemDetails'
import AccountDetails from './components/AccountDetails'
import AuthContext from './components/AuthContext'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const AuthProvider = ({children}) => {
  const storedUsername = Cookies.get('username') || ''
  const [authUsername, setAuthUsername] = useState(storedUsername)

  return (
    <AuthContext.Provider value={{authUsername, setAuthUsername}}>
      {children}
    </AuthContext.Provider>
  )
}

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/popular" component={Popular} />
        <ProtectedRoute exact path="/search" component={SearchComponent} />
        <ProtectedRoute exact path="/account" component={AccountDetails} />
        <ProtectedRoute
          exact
          path="/movies-app/movies/:id"
          component={MovieItemDetails}
        />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </AuthProvider>
  </BrowserRouter>
)

export default App
