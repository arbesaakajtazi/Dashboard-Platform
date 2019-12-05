import {CALL_API} from 'middleware/Api'
import ACTION_TYPES from 'reducers/DashboardsContent/DashboardsContentActionTypes'

export const requestDashboardContent = () => {
  return {
    type: ACTION_TYPES.REQUEST_CONTENT
  }
}

export const receiveDashboardContent = (content) => {
  return {
    type: ACTION_TYPES.RECEIVE_CONTENT,
    content
  }
}

export const contentNotFound = () => {
  return {
    type: ACTION_TYPES.CONTENT_NOT_FOUND
  }
}
export const displayMessage = (response) => {
  return {
    type: ACTION_TYPES.DISPLAY_MESSAGE,
    response
  }
}

export const fetchDashboardContent = (dashboardId) => {
  return dispatch => {
    dispatch(requestDashboardContent())
    return dispatch({
      [CALL_API]: {
        endpoint: `/dashboard/${dashboardId}/content/`
      }
    }).then(content => {
        dispatch(receiveDashboardContent(content))
        return content
      },
      error => {
        dispatch(contentNotFound())
        dispatch(displayMessage(error))
        return error
      })
  }
}

