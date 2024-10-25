// USELESS CODE
// import { useReducer } from 'react'

// type stateType = {
//   islogged: boolean
//   user: object | null
// }

// type actionType = {
//   type: 'signin' | 'signout'
// }

// const init = () => {
//   return { islogged: false, user: null }
// }

// const reducer = (state: stateType, action: actionType) => {
//   const { type } = action

//   switch (type) {
//     case 'signin': {
//       return { ...state, islogged: true, user: {} }
//     }

//     case 'signout': {
//       return { ...state, islogged: false, user: null }
//     }

//     default: {
//       return state
//     }
//   }
// }

// const AuthProvider = () => {
//   const [state, dispatch] = useReducer(reducer, {}, init)

//   return (
//     <>
//       <button>YES</button>
//     </>
//   )
// }

// export default AuthProvider
