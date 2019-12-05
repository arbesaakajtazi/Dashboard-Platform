import ACTION_TYPES from 'reducers/Dashboards/DashboardsActionTypes'

const dashboards = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_DASHBOARDS:
      return action.data
    case ACTION_TYPES.ADD_DASHBOARD:
      return [...state, action.dashboard]
    case ACTION_TYPES.DELETE_DASHBOARD:
      return state.filter(next => next.id !== action.dashboard.id)
    case ACTION_TYPES.UPDATE_DASHBOARD:
      return state.map(next => {
        if (next.id === action.dashboard.id) {
          return action.dashboard
        }
        return next
      })
    default:
      return state
  }
}

const dashboardsFilter = (state = '', action) => {
  switch (action.type) {
    case ACTION_TYPES.FILTER_DASHBOARDS:
      return action.text
    default:
      return state
  }
}


const dashboardsReducer = (state = {}, action) => {
  return {
    dashboards: dashboards(state.dashboards, action),
    filter: dashboardsFilter(state.filter, action)
  }
}

/**
 * Filtered dashboards selector
 * @param state
 * @returns {*}
 */

export const filteredDashboards = (state) => {
  const search = state.filter
  return state.dashboards.filter(next => {
    const name = next.name.toLocaleLowerCase()
    const description = next.description.toLocaleLowerCase()
    return name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  })
}

export const children = (state, action) => {
  return state.filter(next => {
    return action ? action.id === next.parentId : !next.parentId
  }).map(next => ({
    ...next,
    children: children(state, next)
  }))
}
export const dashboardChildren = (state) => {
  const {dashboards: {dashboards = []}} = state
  return children(dashboards)
}

export default dashboardsReducer