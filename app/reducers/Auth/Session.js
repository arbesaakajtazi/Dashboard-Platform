import ACTION_TYPES from 'reducers/Auth/SessionActionTypes'
import moment from 'moment'



const authentication = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        receivedAt: moment().valueOf(),
        isLoggedIn: false
      }
    case ACTION_TYPES.LOGIN_SUCCESS:
    case ACTION_TYPES.LOGIN_FAILURE:
    case ACTION_TYPES.ACTION_LOGOUT:
    default:
      return state
  }
}

export default authentication
