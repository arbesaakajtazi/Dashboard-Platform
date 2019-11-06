import React, {Component} from 'react'
import {CircularProgress} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

let styles = ({theme, size, palette, shadows, typography}) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center'
  },
  loaderColor: {
    color: palette.primaryColor
  }
})

class LoadingIndicator extends Component {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <CircularProgress className={classes.loaderColor}/>
      </div>
    )
  }
}

export default withStyles(styles)(LoadingIndicator)