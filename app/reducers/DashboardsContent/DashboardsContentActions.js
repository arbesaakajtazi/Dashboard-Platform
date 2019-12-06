import {CALL_API} from 'middleware/Api'
import ACTION_TYPES from 'reducers/DashboardsContent/DashboardsContentActionTypes'

export const requestDashboardContent = () => {
  return {
    type: ACTION_TYPES.REQUEST_CONTENT
  }
}

export const receiveDashboardContent = (data) => {
  return {
    type: ACTION_TYPES.RECEIVE_CONTENT,
    data
  }
}

export const contentNotFound = () => {
  return {
    type: ACTION_TYPES.CONTENT_NOT_FOUND
  }
}

export const addContent = (data) => {
  return {
    type: ACTION_TYPES.UPDATE_CONTENT,
    data
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
    }).then(data => {
        dispatch(receiveDashboardContent(data))
        return data
      },
      error => {
        dispatch(contentNotFound())
        dispatch(displayMessage(error))
        return error
      })
  }
}
export const addContents = (data) => {
  return dispatch => {
    dispatch(requestDashboardContent())
    return dispatch({
      [CALL_API]: {
        endpoint: `/dashboard/content/`,
        options: {
          method: 'POST',
          body: JSON.stringify(data),
        }
      }
    }).then(data => {
        dispatch(addContent(data))
        return data
      },
      error => {
        dispatch(displayMessage(error))
        return error
      })
  }
}

