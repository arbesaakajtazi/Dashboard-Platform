import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from "@material-ui/core/Button";
import {fade} from "@material-ui/core/styles/colorManipulator";

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  btn: {
    backgroundColor: palette.primaryColor,
    minWidth: 140,
    color: palette.common.white,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: fade(palette.primaryColor, 0.85)
    }
  },
})
const Button = (props) => {
  const {classes} = props
  return (
    <Button className={classes.btn}/>
  )
}

export default withStyles(styles)(Button)