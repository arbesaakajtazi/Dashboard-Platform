import React, {useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {IconButton} from '@material-ui/core'
import {WIDGETS} from 'Constants'
import Note from 'presentations/WidgetTypes/Note'
import Image from 'presentations/WidgetTypes/Image'
import Graph from 'presentations/WidgetTypes/Graph'
import DeleteIcon from 'presentations/Icons/DeleteIcon'
import Draggable from 'presentations/Draggable'

const styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    display: 'flex',
    position: 'absolute'
  },
  deleteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    height: '10%',
    width: '10%',
    cursor: 'pointer',
    '& svg': {
      fontSize: size.headingFontSize,
      '& path': {
        fill: palette.primary.main
      }
    }
  },
  visible: {
    display: 'flex'
  },
  notVisible: {
    display: 'none'
  }
})
const DashboardContent = (props) => {
  const {classes, content, type, onDelete, x, y, onMouseDown, onMouseMove, onMouseUp, width, height} = props
  console.log('width', width)
  const {id} = content
  const [hover, setHover] = useState(false)
  const onMouseEnter = () => {
    setHover(true)
  }
  const onMouseLeave = () => {
    setHover(false)
  }
  const createContentType = () => {
    let commonProps = {
      content
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
         style={{top: y, left: x, height: height, width: width}}>
      {createContentType()}
      <IconButton className={classes.deleteButton}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onClick={() => onDelete(id)}>
        <DeleteIcon className={hover ? classes.visible : classes.notVisible}/>
      </IconButton>
    </div>
  )
}

export default withStyles(styles)(Draggable(DashboardContent))