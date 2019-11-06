import ACTION_TYPES from 'reducers/Dashboards/DashboardsActionTypes'

const dashboards = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_DASHBOARDS:
      return action.data
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
 * @param store
 * @returns {*}
 */

export const filteredDashboards = (state) => {
  const search = state.filter
  return state.dashboards.filter(next => {
    const name = next.name.toLocaleLowerCase()
    const description = next.description.toLocaleLowerCase()
    return name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      description.toLocaleLowerCase().includes(search.toLocaleString())
  })
}

export default dashboardsReducer