import ACTION_TYPES from 'reducers/Auth/AuthActionTypes'
import {CALL_API} from 'middleware/Api'

export const request = () => {
  return {
    type: ACTION_TYPES.LOGIN_REQUEST,
  }
}

export const success = (user) => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    user
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

export const validateSession = () => {
  return {
    type: ACTION_TYPES.VALIDATE_SESSION
  }
}

export const clearSession = () => {
  return {
    type: ACTION_TYPES.CLEAR_SESSION
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
        dispatch(success(user))
        return user
      }, (error) => {
        dispatch(loginError(error))
        return error
      }).then((session) => {
      dispatch(validateSession())
      return session
    })
  }
}


