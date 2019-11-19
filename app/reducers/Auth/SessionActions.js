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
    }).then((token) => {
      sessionService.saveSession({token})
      dispatch(success(token))
      return token
    }).then(({token}) => {
      sessionService.saveUser({username, token})
    })
  }
}



