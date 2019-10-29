import ACTION_TYPES from 'reducers/Auth/AuthActionTypes'

const authentication = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
      // return {
      //   loggingIn: true
      // }
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        loggedIn: true
      }
    case ACTION_TYPES.LOGIN_FAILURE:
    default:
      return state
  }
}

const authReducer = (state={}, action) => {
  return {
    isAuthenticated: authentication(state.user, action)
  }
}

export default authReducer
