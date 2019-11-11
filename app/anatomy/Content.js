import React from 'react'
import LeftNav from "./LeftNav";
import withStyles from '@material-ui/core/styles/withStyles'

let styles = ({theme, size, palette, shadows, typography}) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    height: '100vh',
    overflow: 'hidden'
  },
  content: {
    width: '100%',
    padding: `${(size.spacing * 7)-2}px  ${(size.spacing * 8)-4}px`,
    backgroundColor: palette.secondary.main,
    overflow: 'auto'
  }
})

const Content = (props) => {
  const {classes, children} = props
  return (
    <div className={classes.root}>
      <LeftNav/>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}


export default withStyles(styles)(Content)