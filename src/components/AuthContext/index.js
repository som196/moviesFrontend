import {createContext} from 'react'

const AuthContext = createContext({
  authUsername: '',
  setAuthUsername: () => {},
})

export default AuthContext
