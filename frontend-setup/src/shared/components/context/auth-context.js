import { createContext } from 'react'

// Create a context that we will assign value to in App.js
const AuthContext = createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { }
})

export default AuthContext