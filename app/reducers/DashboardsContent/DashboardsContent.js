import ACTION_TYPES from 'reducers/DashboardsContent/DashboardsContentActionTypes'

const dashboardContent = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_CONTENT:
      return action.content
    case ACTION_TYPES.CONTENT_NOT_FOUND:
      return []
    default:
      return state
  }
}
const dashboardsContent = (state = {}, action) => {
  return {
    content: dashboardContent(state.content, action)
  }
}

export default dashboardsContent
