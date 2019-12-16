import React, {useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {IconButton} from '@material-ui/core'
import {WIDGETS} from 'Constants'
import Note from 'presentations/WidgetTypes/Note'
import Image from 'presentations/WidgetTypes/Image'
import Graph from 'presentations/WidgetTypes/Graph'
import DeleteIcon from 'presentations/Icons/DeleteIcon'
import draggable from 'presentations/Draggable'
import resizable from 'presentations/Resizeable'

const styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    display: 'flex',
    position: 'absolute',
    '&:hover': {
      '& $deleteButton': {
        display: 'block'
      }
    }
  },
  deleteButton: {
    position: 'absolute',
    display: 'none',
    top: 15,
    right: 15,
    cursor: 'pointer',
    // zIndex: 1,
    '& svg': {
      fontSize: size.headingFontSize,
      '& path': {
        fill: palette.primary.main
      }
    }
  },
  resize: {
    position: 'absolute',
    right: size.spacing,
    bottom: -2,
    '&:hover': {
      cursor: 'nwse-resize'
    },
    width: size.spacing,
    height: size.spacing,
  },
})
const DashboardContent = (props) => {
  const {
    classes,
    content,
    type,
    onDelete,
    x, y,
    onMouseDown, onMouseMove, onMouseUp,
    width, height,
    resizeListeners,
  } = props
  const {id} = content
  const createContentType = () => {
    let commonProps = {
      content, width, height,
    }
    switch (type) {
      case WIDGETS.TEXT:
        return <Note {...commonProps}/>
      case WIDGETS.IMAGE:
        return <Image {...commonProps}/>
      case WIDGETS.GRAPH_TYPE.LINE:
      case WIDGETS.GRAPH_TYPE.BAR:
      case WIDGETS.GRAPH_TYPE.PIE:
      case WIDGETS.GRAPH_TYPE.TREEMAP:
        return <Graph {...commonProps}/>
      default:
        return <div>Unsupported Type</div>
    }
  }

  return (
    <div className={classes.root}
         onMouseDown={onMouseDown}
         onMouseMove={onMouseMove}
         onMouseUp={onMouseUp}
         style={{top: y, left: x}}>
      {createContentType()}
      <IconButton className={classes.deleteButton}
                  onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconButton>
      <div className={classes.resize}{...resizeListeners}/>
    </div>
  )
}

export default withStyles(styles)(draggable(resizable(DashboardContent)))