import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import classNames from 'classnames'

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    backgroundColor: palette.background.paper,
    boxShadow: shadows[4],
    borderRadius: size.baseRadius,
  },
})
const Card = (props) => {
  const {classes, children, activeDashboardView, className} = props
  return (
    <div className={classNames(classes.root, className)}>
      {children}
    </div>
  )
}
export default withStyles(styles)(Card)