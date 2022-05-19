/**
 * Created by ArbesaKajtazi on 18/10/2019.
 */
import React, {Component} from 'react'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Theme from 'utils/Theme'

class ThemeProvider extends Component {
  render() {
    const {children, theme: themeProp} = this.props
    let theme = createMuiTheme(Theme.getTheme())
    console.log('theme', theme)
    return (
      <MuiThemeProvider theme={themeProp || theme}>
        {children}
      </MuiThemeProvider>
    )
  }
}

export default ThemeProvider
