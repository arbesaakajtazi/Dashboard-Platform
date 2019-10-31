import ACTION_TYPES from 'reducers/Auth/SessionActionTypes'
import moment from 'moment'

const authentication = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        receivedAt: moment().valueOf()
      }
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        message: 'good'
      }
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        message: `Your username or password didn't match!`
      }
    case ACTION_TYPES.ACTION_LOGOUT:
      return {
        ...state,
        message: null
      }
    default:
      return state
  }
}

export default authentication
