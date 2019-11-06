import {CALL_API} from 'middleware/Api'
import ACTION_TYPES from 'reducers/Dashboards/DashboardsActionTypes'
import store from 'Store'
export const requestDashboards = () => {
  return {
    type: ACTION_TYPES.REQUEST_DASHBOARDS
  }
}

export const receiveDashboards = (data) => {
  return {
    type: ACTION_TYPES.RECEIVE_DASHBOARDS,
    data
  }
}

export const displayMessage = (response) => {
  return {
    type: ACTION_TYPES.DISPLAY_MESSAGE,
    response
  }
}

export const filter = (text) => {
  return {
    type: ACTION_TYPES.FILTER_DASHBOARDS,
    text
  }
}


export const fetchDashboards = () => {
  return (dispatch) => {
    dispatch(requestDashboards())
    console.log('receiving dashboards',store.getState())
    return dispatch({
      [CALL_API]: {
        endpoint: '/dashboard/'
      }
    }).then(data => {
      dispatch(receiveDashboards(data))
      console.log('receiveDashboards',data)
      return data
    }, error => {
      dispatch(displayMessage(error))
      return error
    })
  }
}

