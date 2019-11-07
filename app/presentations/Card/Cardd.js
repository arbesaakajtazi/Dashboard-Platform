import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    backgroundColor: palette.common.white,
    width: `calc(33% - ${size.spacing * 2}px)`,
    boxShadow: shadows[4],
    borderRadius: size.baseRadius,
    margin: `0px ${(size.spacing * 3) - 4}px ${(size.spacing * 3) - 4}px 0px`,
    minWidth: 300
  }
})
const Card = (props) => {
  const {classes, children} = props
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}
export default withStyles(styles)(Card)