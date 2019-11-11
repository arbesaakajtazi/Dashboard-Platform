import ACTION_TYPES from 'reducers/Theme/ThemeActionTypes'

export const changeTheme = (theme) => {
  return {
    type: ACTION_TYPES.CHANGE_THEME,
    theme
  }
}