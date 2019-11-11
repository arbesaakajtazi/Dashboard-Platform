import {CALL_API} from 'middleware/Api'
import ACTION_TYPES from 'reducers/Dashboards/DashboardsActionTypes'

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

export const addDashboard = (dashboard) => {
  return {
    type: ACTION_TYPES.ADD_DASHBOARD,
    dashboard
  }
}

export const deleteDashboard = (dashboard) => {
  return {
    type: ACTION_TYPES.DELETE_DASHBOARD,
    dashboard
  }
}

export const updateDashboard = (dashboard) => {
  return {
    type: ACTION_TYPES.UPDATE_DASHBOARD,
    dashboard
  }
}

export const fetchDashboards = () => {
  return (dispatch) => {
    dispatch(requestDashboards())
    return dispatch({
      [CALL_API]: {
        endpoint: '/dashboard/'
      }
    }).then(data => {
      dispatch(receiveDashboards(data))
      console.log('receiveDashboards', data)
      return data
    }, error => {
      dispatch(displayMessage(error))
      return error
    })
  }
}

export const addDashboards = (dashboard) => {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        endpoint: '/dashboard/',
        options: {
          method: 'POST',
          body: JSON.stringify(dashboard),
        }
      }
    }).then(dashboard => {
      dispatch(addDashboard(dashboard))
      return dashboard
    }, error => {
      dispatch(displayMessage(error))
      return error
    })
  }
}

export const deleteDashboards = (dashboard) => {
  return (dispatch) => {
    dispatch(requestDashboards())
    return dispatch({
      [CALL_API]: {
        endpoint: `/dashboard/${dashboard.id}`,
        options: {
          method: 'DELETE'
        }
      }
    }).then((dashboard) => {
      dispatch(deleteDashboard(dashboard))
      return dashboard
    }, (error) => {
      dispatch(displayMessage(error))
      return error
    })
  }
}

export const updateDashboards = (dashboard) => {
  return (dispatch) => {
    dispatch(requestDashboards())
    return dispatch({
      [CALL_API]: {
        endpoint: `/dashboard/`,
        options: {
          method: 'PUT',
          body: JSON.stringify(dashboard),
        }
      }
    }).then((dashboard) => {
      dispatch(updateDashboard(dashboard))
      return dashboard
    }, (error) => {
      dispatch(displayMessage(error))
      return error
    })
  }
}


