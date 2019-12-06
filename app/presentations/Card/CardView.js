import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import classNames from 'classnames'
import Typography from "@material-ui/core/Typography";
import Chart from 'presentations/Chart'

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    backgroundColor: palette.background.paper,
    boxShadow: shadows[4],
    borderRadius: size.baseRadius,
  },
})

const Card = ({options, classes, children, activeDashboardView, className, title, titleClass, graphClass, ...other}) => {
  return <div className={classNames(classes.root, className)} {...other}>
    {title && <Typography variant={'subtitle1'}>{title}</Typography>}
    {children || <Chart options={options} className={graphClass}/>}
  </div>
}
export default withStyles(styles)(Card)