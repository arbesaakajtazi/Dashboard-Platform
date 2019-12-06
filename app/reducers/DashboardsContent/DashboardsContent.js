import ACTION_TYPES from 'reducers/DashboardsContent/DashboardsContentActionTypes'

const initialState = {
  content: []
}
const content = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_CONTENT:
    case ACTION_TYPES.UPDATE_CONTENT:
      return action.data.content
    default:
      return state
  }
}

const board = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_CONTENT:
      return {...action.data, content: content(state.content, action)}
    case ACTION_TYPES.CONTENT_NOT_FOUND:
      return initialState
    default:
      return {...action.data, content: content(state.content, action)}
  }
}
const dashboardsContent = (state = {}, action) => {
  return {
    board: board(state.board, action)
  }
}

export default dashboardsContent
