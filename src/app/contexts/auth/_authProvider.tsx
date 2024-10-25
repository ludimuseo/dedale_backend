// USELESS CODE
// import { createContext, useReducer } from 'react'
// import { authReducer } from './_authReducer'

// const AuthContext = createContext({})

// const init = () => {
//   const user = JSON.parse(localStorage.getItem('user'))

//   return {
//     logged: !!user,
//     user,
//   }
// }

// const types = {
//   login: '[Auth] Login',
//   logout: '[Auth] Logout',
// }

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {}, init)

//   const login = async (email: string) => {
//     const user = { email }
//     localStorage.setItem('user', JSON.stringify(user))
//     dispatch({ type: types.login, payload: user })
//   }

//   const logout = () => {
//     localStorage.removeItem('user')
//     dispatch({ type: types.logout })
//   }

//   return (
//     <>
//       <AuthContext.Provider value={{ ...state, login, logout }}>
//         {children}
//       </AuthContext.Provider>
//     </>
//   )
// }
