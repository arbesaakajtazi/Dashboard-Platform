import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import withStyles from '@material-ui/core/styles/withStyles'

let styles = ({palette, shadows}) => ({
  addButton: {
    backgroundColor: palette.primaryColor,
    border: 'none',
    borderRadius: '100%',
    width: 77,
    height: 77,
    boxShadow: shadows[2],
    cursor: 'pointer',
    '& svg': {
      fontSize: 52,
      color: palette.common.white
    },
    '&:focus': {
      outline: 'none'
    }
  }
})
const AddButton = (props) => {
  const {classes} = props
  return (
    <button className={classes.addButton}>
      <AddIcon/>
    </button>
  )
}
export default withStyles(styles)(AddButton)