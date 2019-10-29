import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

let styles = ({palette}) => ({
  root: {
    position: 'relative',
    minWidth: '100vh',
    height: '100vh',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    display: 'flex',
    margin: 0,
    alignItems: 'center',
    backgroundColor: palette.bgColor
  }
})

const wrapper = (props) => {
  const {classes} = props
  return (
    <div className={classes.root}>
      {props.children}
    </div>
  )
}

export default withStyles(styles)(wrapper)