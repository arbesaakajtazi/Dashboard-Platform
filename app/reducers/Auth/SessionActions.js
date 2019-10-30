import ACTION_TYPES from 'reducers/Auth/SessionActionTypes'
import {CALL_API} from 'middleware/Api'
import {sessionService} from 'redux-react-session'

export const request = () => {
  return {
    type: ACTION_TYPES.LOGIN_REQUEST,
  }
}

export const success = (session) => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    session
  }
}

export const loginError = (error) => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
    error
  }
}

export const logout = () => {
  return {
    type: ACTION_TYPES.ACTION_LOGOUT
  }
}

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(request())
    return dispatch({
      [CALL_API]: {
        endpoint: `/authenticate/`,
        options: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, password}),
        }
      }
    }).then((user) => {
      sessionService.saveSession(user)
      console.log('saved token', user)
      dispatch(success(user))
      return user
    }, (error) => {
      dispatch(loginError(error))
      return error
    }).then(() => {
      sessionService.saveUser(username)
    }, error => {
      dispatch(loginError(error))
      return error
    })
  }
}


