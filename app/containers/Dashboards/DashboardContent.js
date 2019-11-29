import React, {useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from 'presentations/Button/Button'
import AddIcon from '@material-ui/icons/Add'
import {Menu, MenuItem} from '@material-ui/core'
import NoteIcon from 'presentations/Icons/NoteIcon'
import ImagesIcon from 'presentations/Icons/ImagesIcon'
import LineGraphIcon from 'presentations/Icons/LineGraphIcon'
import BarGraphIcon from 'presentations/Icons/BarGraphIcon'
import PieGraphIcon from 'presentations/Icons/PieGrapchIcon'
import TreeMapIcon from 'presentations/Icons/TreeMapIcon'
import InformationIcon from 'presentations/Icons/InformationIcon'

const styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    padding: `${size.spacing}px 0px 0px 0px`
  },
  addButton: {
    border: 'none',
    borderRadius: '100%',
    width: 65,
    height: 65,
    padding: 0,
    boxShadow: shadows[2],
    position: 'absolute',
    bottom: 0,
    right: 80,
    zIndex: zIndex.popover
  },
  menuItem: {
    display: 'flex',
    alignItems: 'end',
    padding: `${size.spacing}px ${size.spacing * 6}px 0px`,
  },
  paper: {
    padding: `${size.spacing * 3}px 0px ${size.spacing * 2}px`,
  },
  information: {
    display: 'flex',
    alignItems: 'center',
    color: palette.text.default,
    fontSize: size.subTitleFontSize,
    fontWeight: typography.weight.medium,
    '& svg': {
      marginRight: size.spacing
    }
  }
})

const options = [
  {svg: <NoteIcon/>, name: 'Note'},
  {svg: <ImagesIcon/>, name: 'Image'},
  {svg: <LineGraphIcon/>, name: 'Line Graph'},
  {svg: <BarGraphIcon/>, name: 'Bar Graph'},
  {svg: <PieGraphIcon/>, name: 'Pie Graph'},
  {svg: <TreeMapIcon/>, name: 'Tree Map'},
]


const DashboardContent = (props) => {
  const {classes} = props
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
    console.log("event.target", event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <div className={classes.information}><InformationIcon/>Information</div>
      <Button variant='flat' color='primary' className={classes.addButton} onClick={handleClick}>
        <AddIcon/>
      </Button>
      <Menu
        classes={{
          paper: classes.paper
        }}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        getContentAnchorEl={null}
      >
        {options.map(option => (
          <MenuItem key={option.name} onClick={handleClose} className={classes.menuItem}>
            {option.svg}{option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default withStyles(styles)(DashboardContent)