import React, {useEffect, useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
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
import {useParams} from 'react-router-dom'
import {fetchDashboardContent, addContents} from 'reducers/DashboardsContent/DashboardsContentActions'
import Note from 'containers/Dashboards/Note'
import Image from 'containers/Dashboards/Image'
import Graph from 'containers/Dashboards/Graph';


const styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    position: 'relative',
    height: '100%'
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
    right: 0,
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
    },
    paddingBottom: 50
  },
  dashboardContentWrapper: {
    display: 'flex',
    flexFlow: 'row wrap'
  }
})

const options = [
  {svg: <NoteIcon/>, name: 'Note', type: 'TEXT'},
  {svg: <ImagesIcon/>, name: 'Image', type: 'IMAGE'},
  {svg: <LineGraphIcon/>, name: 'Line Graph', type: 'LINE'},
  {svg: <BarGraphIcon/>, name: 'Bar Graph', type: 'BAR'},
  {svg: <PieGraphIcon/>, name: 'Pie Graph', type: 'PIE'},
  {svg: <TreeMapIcon/>, name: 'Tree Map', type: 'TREEMAP'},
]

const DashboardContent = (props) => {
  const {classes, fetchDashboardContent, dashboardContent, addContents} = props
  const {content} = dashboardContent
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const {id} = useParams()

  useEffect(() => {
    fetchDashboardContent(id)
  }, [id])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const createContentType = (content, index) => {
    switch (content.type) {
      case 'TEXT':
        return <Note key={index} content={content}/>
      case 'IMAGE':
        return <Image key={index} content={content}/>
      case 'LINE':
      case 'BAR':
      case 'PIE':
      case 'TREEMAP':
        return <Graph key={index} content={content}/>
    }
  }

  const contentType = (type) => {
    switch (type) {
      case 'LINE':
      case 'BAR':
      case 'PIE':
      case 'TREEMAP':
        return {data: [{name: 'yo', value: 23}, {name: 'yo2', value: 21}, {name: 'yo3', value: 25}]}
      case 'TEXT':
        return {text: ''}
      case 'IMAGE':
        return {url: 'https://heartheboatsing.files.wordpress.com/2016/10/little-boat.jpg'}
    }
  }

  const onClickAdd = (type) => {
    addContents({
      dashboardId: id,
      ...dashboardContent,
      content: [
        ...content,
        {
          type,
          ...contentType(type)
        }
      ]
    })
    console.log("contentType", contentType(type))
  }

  return (
    <div className={classes.root}>
      <div className={classes.information}><InformationIcon/>Information</div>
      <div className={classes.dashboardContentWrapper}>
        {!!content && content.map(createContentType)}
      </div>
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
        onClick={handleClose}
      >
        {options.map(option => (
          <MenuItem key={option.name} className={classes.menuItem} onClick={() => onClickAdd(option.type)}>
            {option.svg}{option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
const mapStateToProps = (store) => {
  return {
    dashboardContent: store.dashboardContent.board
  }
}
const mapDispatchToProps = {
  fetchDashboardContent,
  addContents,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DashboardContent))