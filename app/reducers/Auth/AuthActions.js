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
    })
  }
}


