import {applyMiddleware, combineReducers, createStore} from 'redux'
import {routerMiddleware, routerReducer} from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import api from 'middleware/Api'
import authReducer from 'reducers/Auth/Auth'
import {createSession} from 'redux-session'
import {CLEAR_SESSION} from 'reducers/Auth/AuthActionTypes'

const history = createBrowserHistory()
console.log(history, 'el history')

/**
 * combing the reducers
 */
const reducers = combineReducers({
  routing: routerReducer,
  authReducer
})

/**
 * CreateSession for user
 */
const session = createSession({
  ns: 'dashboardPlatform',
  throttle: 0,
  selectState(state) {
    return {
      user: state.authReducer
    }
  },
  clearStorage(action) {
    return action.type === CLEAR_SESSION
  }
})

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  console.group(action.type)
  console.log('prev state', store.getState())
  console.info('action', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception at crash reporter', err)
    throw err
  }
}

/**
 * Lets you dispatch a function instead of an action.
 * This function will receive `dispatch` and `getState` as arguments.
 */
const thunk = store => next => action =>
  typeof action === 'function' ? action(store.dispatch, store.getState) : next(action)

const middleware = [
  routerMiddleware(history),
  api,
  thunk,
  logger,
  crashReporter
].filter(Boolean)

/**
 * The browsing history
 */
export {history}

const store = createStore(reducers, applyMiddleware(...middleware))

/**
 * The redux store which combines all the reducers
 */
export default store