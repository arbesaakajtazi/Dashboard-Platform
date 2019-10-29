import ACTION_TYPES from 'reducers/Auth/AuthActionTypes'
import moment from 'moment'

let defaultState = {
  isLoggedIn: false,
  isValidated: false
}

const authentication = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        session: {...action.session, receivedAt: moment().valueOf()},
        isLoggedIn: false
      }
    case ACTION_TYPES.LOGIN_SUCCESS:
      return state = {
        isLoggedIn: true,
        token: action.user.token
      }
    case ACTION_TYPES.LOGIN_FAILURE:
    case ACTION_TYPES.VALIDATE_SESSION:
      return {
        ...state,
        isValidated: true
      }
    case ACTION_TYPES.ACTION_LOGOUT:
      return defaultState
    case 'LOAD_STORED_STATE':
      if (action.storedState && action.storedState.user) {
        return {...action.storedState.user, ...defaultState}
      }
    default:
      return state
  }
}

const authReducer = (state = {}, action) => {
  return {
    user: authentication(state.user, action)
  }
}

export default authReducer
