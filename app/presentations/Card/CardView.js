/**
 * Created by ArbesaKajtazi on 1/10/2019.
 */
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

const Card = ({classes, children, className, title}) => {
  return (
    <div className={classNames(classes.root, className)}>
      {children}
    </div>
  )
}
export default withStyles(styles)(Card)