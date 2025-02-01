import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Popular from './components/Popular'

// import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={Popular} />
    </Switch>
  </BrowserRouter>
)

export default App

//   <ProtectedRoute exact path="/" component={Home} />
//   <ProtectedRoute exact path="/jobs" component={Jobs} />
//   <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
//   <Route path="/not-found" component={NotFound} />
//   <Redirect to="not-found" />
