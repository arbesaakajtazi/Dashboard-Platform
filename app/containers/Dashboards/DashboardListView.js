import React, {Component} from 'react'
import moment from 'moment'
import withStyles from '@material-ui/core/styles/withStyles'
import {IconButton, Popover} from '@material-ui/core'
import EditIcon from 'presentations/Icons/EditIcon'
import DeleteIcon from 'presentations/Icons/DeleteIcon'
import DotsIcon from 'presentations/Icons/DotsIcon'
import {NavLink} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Card from 'presentations/Card/Cardd'


let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    listStyle: 'none',
    padding: `${size.spacing * 2}px`,
    marginBottom: `${size.spacing * 2}px`,
  },
  right: {
    fontSize: size.smallFontSize,
    display: 'flex',
    flexFlow: 'row',
    position: 'relative',
    alignItems: 'center',
    lineHeight: `${size.spacing * 2}px`
  },
  left: {
    display: 'flex',
    maxWidth: '85%',
    alignItems: 'center'
  },
  description: {
    flex: 2,
    overflow: 'hidden',
    flexFlow: 'row nowrap',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  SvgWrapper: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  dotsSvg: {
    fontSize: size.displayFontSize
  },
  editCard: {
    width: 95,
    height: 77,
    boxShadow: shadows[5],
    position: 'absolute',
    right: 50,
    top: 50,
    padding: `${size.spacing * 2}px`
  },
  edit: {
    display: 'flex',
    flexFlow: 'row',
    paddingBottom: `${size.spacing}px`
  },
  delete: {
    display: 'flex',
    flexFlow: 'row'
  },
  paper: {
    height: 80,
    width: 95,
    padding: `${size.spacing * 2}px`,
    overflow: 'hidden',
    boxShadow: shadows[5],
    color: palette.text.default,
    fontFamily: typography.fontFamily,
    fontSize: size.defaultFontSize,
    textTransform: 'lowercase'
  },
  menuLink: {
    textDecoration: 'none',
    color: palette.text.default,
    fontSize: size.headerFontSize,
    fontWeight: typography.weight.bold,
    marginRight: 10,
    display: 'flex',
    flex: '0 0 auto',
    minWidth: '10%',
  },

})

class DashboardListView extends Component {

  state = {
    anchorEl: null
  }

  onOpen = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  onClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {dashboard, classes, onEditListView, onDeleteListView} = this.props
    const {anchorEl} = this.state
    const open = !!anchorEl
    return (
      <Card className={classes.root}>
        <div className={classes.left}>
          <NavLink
            to={`/dashboards/${dashboard.id}`}
            className={classes.menuLink}
          >{dashboard.name}</NavLink>
          <Typography variant={"body2"} className={classes.description}>
            {dashboard.description}
          </Typography>
        </div>
        <div className={classes.right}>
          {moment(dashboard.createdAt).format('DD.MM.YYYY')}
          <Popover
            classes={{paper: classes.paper}}
            onClose={this.onClose}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            disableRestoreFocus>
            <div className={classes.edit}>
              <IconButton onClick={event => {
                event.preventDefault()
                onEditListView(dashboard)
              }}>
                <EditIcon/>
              </IconButton>
              <div>
                Edit
              </div>
            </div>
            <div className={classes.delete}>
              <IconButton onClick={() => onDeleteListView(dashboard)}>
                <DeleteIcon/>
              </IconButton>
              <div>
                Delete
              </div>
            </div>
          </Popover>
          <div className={classes.SvgWrapper}>
            <IconButton onClick={this.onOpen}>
              <DotsIcon className={classes.dotsSvg}/>
            </IconButton>
          </div>
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(DashboardListView)
