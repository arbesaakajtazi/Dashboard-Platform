import ACTION_TYPES from 'reducers/Auth/AuthActionTypes'
import moment from 'moment'

let defaultState = {
  isLoggedIn: false
}

const authentication = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        receivedAt: moment().valueOf(),
        isLoggedIn: false
      }
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...action.session,
        isLoggedIn: true
      }
    case ACTION_TYPES.LOGIN_FAILURE:
      return
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

export default authentication
