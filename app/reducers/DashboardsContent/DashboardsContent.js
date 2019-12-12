import ACTION_TYPES from 'reducers/DashboardsContent/DashboardsContentActionTypes'
import {WIDGETS} from 'Constants'
import uuid from 'uuid'

const initialState = {
  content: []
}

const widgetFromType = (type) => {
  switch (type) {
    case WIDGETS.GRAPH_TYPE.LINE:
    case WIDGETS.GRAPH_TYPE.BAR:
    case WIDGETS.GRAPH_TYPE.PIE:
    case WIDGETS.GRAPH_TYPE.TREEMAP:
      return {
        data: [
          {
            "name": "Sales 1",
            "value": 320
          },
          {
            "name": "Sales 2",
            "value": 552
          },
          {
            "name": "Sales 3",
            "value": 342
          },
        ]
      }
    case WIDGETS.IMAGE:
      return {url: 'https://heartheboatsing.files.wordpress.com/2016/10/little-boat.jpg'}
    case WIDGETS.TEXT:
      return {text: ''}
    default:
      return {}
  }
}

const content = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_CONTENT:
      return action.data.content.map(next => ({...next, id: uuid.v1()}))
    case ACTION_TYPES.UPDATE_CONTENT:
      const found = state.find(next => next.id === action.item.id)
      if (!found) {
        return [...state, {
          ...widgetFromType(action.item.type),
          type: action.item.type,
          id: uuid.v1(),
          actionId: uuid.v1()
        }]
      }
      return state.map(next => {
        if (next.id === action.item.id) {
          return {...action.item, actionId: uuid.v1()}
        }
        return next
      })
    case ACTION_TYPES.DELETE_CONTENT:
      return state.filter(next => next.id !== action.item.id)
    default:
      return state
  }
}

const board = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_CONTENT:
    case ACTION_TYPES.DELETE_CONTENT:
      console.log("state.content", state.content)
      return {...state, content: content(state.content, action), actionId: uuid.v1()}
    case ACTION_TYPES.RECEIVE_CONTENT:
      return {...action.data, content: content(state.content, action)}
    case ACTION_TYPES.CONTENT_NOT_FOUND:
      return initialState
    default:
      return {...state, content: content(state.content, action)}
  }
}

/**
 * TODO: Room for improvement, make this reusable(Generic)
 * @param state
 * @param action
 *  * @type {{isLoading: boolean, response: {code: number, message: string}}}
 */
const defaultRequest = {
  isLoading: false,
  response: {
    code: 200,
    message: "Last request succeed!"
  },
}

const request = (state = defaultRequest, action) => {
  switch (action.type) {
    case ACTION_TYPES.REQUEST_CONTENT:
    default:
      return state
  }
}
const dashboardsContent = (state = {}, action) => {
  return {
    board: board(state.board, action),
    request: request(state.request, action)
  }
}

export default dashboardsContent
