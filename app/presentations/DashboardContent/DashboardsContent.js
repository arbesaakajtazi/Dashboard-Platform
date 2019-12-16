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
import {
  fetchContent,
  updateContent,
  removeContent,
  synchronize
} from 'reducers/DashboardsContent/DashboardsContentActions'
import Note from 'presentations/WidgetTypes/Note'
import Image from 'presentations/WidgetTypes/Image'
import Graph from 'presentations/WidgetTypes/Graph'
import {WIDGETS} from 'Constants'
import WidgetContent from "./DashboardContent";


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
  {svg: <NoteIcon/>, name: 'Note', type: WIDGETS.TEXT},
  {svg: <ImagesIcon/>, name: 'Image', type: WIDGETS.IMAGE},
  {svg: <LineGraphIcon/>, name: 'Line Graph', type: WIDGETS.GRAPH_TYPE.LINE},
  {svg: <BarGraphIcon/>, name: 'Bar Graph', type: WIDGETS.GRAPH_TYPE.BAR},
  {svg: <PieGraphIcon/>, name: 'Pie Graph', type: WIDGETS.GRAPH_TYPE.PIE},
  {svg: <TreeMapIcon/>, name: 'Tree Map', type: WIDGETS.GRAPH_TYPE.TREEMAP},
]

const DashboardsContent = (props) => {
  const {classes, fetchContent, board, synchronize, selectedDashboard} = props
  const {content, actionId} = board
  //const {id} = selectedDashboard
  console.log('initial content', content.length)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const {id} = useParams()
  console.log('id', id)

  useEffect(() => {
    console.log('current Id', id)
    fetchContent(id)
  }, [id])

  useEffect(() => {
    if (!!actionId)
      synchronize(board, id)
  }, [actionId])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const addOrUpdate = (item) => {
    const {updateContent} = props
    updateContent(item)
  }

  const addWidget = (type) => {
    // TODO: add initial layout to be at the bottom of the container
    addOrUpdate({type})
  }

  const onDelete = (id) => {
    const {removeContent} = props
    removeContent({id})
  }

  return (
    <div className={classes.root}>
      <div className={classes.information}><InformationIcon/>Information</div>
      <div className={classes.dashboardContentWrapper}>
        {!!content && content.map(content => {
          const layout = content.layout || {x: 0, y: 0}
          const {x, y, width, height} = layout
          return (
            <WidgetContent
              type={content.type}
              key={content.id}
              content={content}
              onDelete={onDelete}
              x={x} y={y} width={width} height={height}
              onLocationChanged={(x, y) => addOrUpdate({...content, layout: {...layout, x, y}})}
              onSizeChanged={(width, height) => addOrUpdate({...content, layout: {...layout,width, height}})}
            />
          )
        })}
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
          <MenuItem key={option.name} className={classes.menuItem} onClick={() => addWidget(option.type)}>
            {option.svg}{option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
const mapStateToProps = (store) => {
  return {
    board: store.dashboardContent.board
  }
}
const mapDispatchToProps = {
  fetchContent,
  synchronize,
  updateContent,
  removeContent
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DashboardsContent))