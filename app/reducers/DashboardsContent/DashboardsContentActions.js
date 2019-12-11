import {CALL_API} from 'middleware/Api'
import ACTION_TYPES from 'reducers/DashboardsContent/DashboardsContentActionTypes'

export const displayMessage = (response) => ({
  type: ACTION_TYPES.DISPLAY_MESSAGE,
  response
})

export const requestContent = () => ({
  type: ACTION_TYPES.REQUEST_CONTENT
})

export const receiveContent = (data) => ({
  type: ACTION_TYPES.RECEIVE_CONTENT,
  data
})

export const contentNotFound = () => ({
  type: ACTION_TYPES.CONTENT_NOT_FOUND
})
/**
 * Add or modify an existing widget within a content model
 * @param item
 * @returns {{item: *, type: *}}
 */
export const updateContent = (item) => ({
  type: ACTION_TYPES.UPDATE_CONTENT,
  item
})
/**
 * Removes a widget from the content model
 * @param item
 * @returns {{item: *, type: *}}
 */
export const removeContent = (item) => ({
  type: ACTION_TYPES.DELETE_CONTENT,
  item
})
/**
 * Fetches the dashboard content
 * @param dashboardId
 * @returns {Function}
 */
export const fetchContent = (dashboardId) => {
  return dispatch => {
    dispatch(requestContent())
    return dispatch({
      [CALL_API]: {
        endpoint: `/dashboard/${dashboardId}/content/`
      }
    }).then(data => {
      dispatch(receiveContent(data))
      return data
    }, error => {
      dispatch(displayMessage(error))
      dispatch(contentNotFound())
      return error
    })
  }
}
/**
 * Synchronizes the state changes of the redux
 * TODO: Room for improvement: Manage synchronize loading, messaging with the backend API
 * @param item
 * @param id
 * @returns {function(*): *}
 */
export const synchronize = (item, id) => {
  console.log('content to synchronize', item)
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        endpoint: '/dashboard/content/',
        options: {
          method: item._id ? 'PUT' : 'POST',
          body: JSON.stringify({...item, dashboardId: id})
        }
      }
    }).then(response => {
      if (!item._id) {
        dispatch(receiveContent(response))
      }
      return response
    })
  }
}

