import ACTION_TYPES from 'reducers/Theme/ThemeActionTypes'

const theme = (state='light', action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_THEME:
      return action.theme
    default:
      return state
  }
}

export default theme