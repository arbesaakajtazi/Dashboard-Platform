/**
 * Created by ArbesaKajtazi on 18/10/2019.
 */
import React, {Component} from 'react'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Theme from 'utils/Theme'
import {connect} from 'react-redux'

class ThemeProvider extends Component {
  render() {
    const {children, type} = this.props
    let theme = createMuiTheme(Theme.getTheme(type))
    console.log('theme', theme)
    return (
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps= (store) => {
  return {
    type: store.theme
  }
}

export default connect(mapStateToProps, null)(ThemeProvider)
