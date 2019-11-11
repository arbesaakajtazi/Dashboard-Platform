import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import Card from 'presentations/Card/Cardd'
import moment from 'moment'
import DotsIcon from 'presentations/Icons/DotsIcon'
import {IconButton, Popover} from '@material-ui/core'
import EditIcon from 'presentations/Icons/EditIcon'
import DeleteIcon from 'presentations/Icons/DeleteIcon'
import {deleteDashboards} from 'reducers/Dashboards/DashboardsActions'

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {},
  wrapDashboards: {
    paddingTop: size.spacing,
    display: 'flex',
    flexFlow: 'row wrap'
  },
  header: {
    fontSize: size.smallFontSize,
    color: palette.text.primary,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    padding: `${(size.spacing * 3) - 4}px ${(size.spacing * 4) - 2}px 0px`,
    position: 'relative'
  },
  date: {
    paddingLeft: 20,
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      height: 4,
      top: 5,
      width: 4,
      left: 9,
      backgroundColor: palette.text.primary,
      borderRadius: '100%'
    }
  },
  content: {
    padding: `${size.spacing * 4}px`
  },
  dashboardTitle: {
    fontSize: size.headingFontSize,
    color: palette.text.default,
    fontWeight: typography.weight.bold,
    paddingBottom: `${size.spacing * 2}px`
  },
  description: {
    fontSize: size.defaultFontSize,
    color: palette.textColor,
    wordBreak: 'break-all'
  },
  left: {
    display: 'flex',
    alignItems: 'flex-end',
    lineHeight: `${size.spacing * 2}px`
  },
  SvgWrapper: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  dotsSvg: {
    fontSize: size.displayFontSize
  },
  footer: {
    padding: `0px ${(size.spacing * 4) - 2}px ${(size.spacing * 4) + 2}px`,
    display: 'flex',
    flexFlow: 'row wrap'
  },
  children: {
    color: palette.primary.main,
    fontSize: size.smallFontSize,
    backgroundColor: palette.secondary.light,
    border: `1px solid ${palette.secondary.dark}`,
    borderRadius: `${size.baseRadius * 7}px`,
    width: 95,
    padding: `${size.spacing}px ${size.spacing * 2}px`,
    marginRight: 10
  },
  iconButton: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '& svg': {
      height: 27
    }
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
    color:palette.leadTextColor,
    fontFamily: typography.fontFamily,
    fontSize: size.defaultFontSize,
    textTransform: 'lowercase'
  }
})

class DashboardsList extends Component {

  state = {
    anchorEl: null
  }

  onDelete = (item) => {
    const {deleteDashboards} = this.props
    deleteDashboards(item)
  }

  onOpen = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  onClose = () => {
    this.setState({anchorEl: null})
  }

  renderDashboards = (item) => {
    const {classes} = this.props
    const {anchorEl} = this.state
    const open = !!anchorEl
    return <Card key={item.id}>
      <div className={classes.header}>
        <div className={classes.left}>
          <div>
            4 children
          </div>
          <div className={classes.date}>
            {moment(item.createdAt).format('DD.MM.YYYY')}
          </div>
        </div>
        <Popover
          classes={{
            paper: classes.paper
          }}
          onClose={this.onClose}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          disableRestoreFocus>
          <div className={classes.edit}>
            <IconButton className={classes.iconButton} onClick={event => {
              event.preventDefault()
              this.props.onEdit(item)
            }}>
              <EditIcon/>
            </IconButton>
            <div>
              Edit
            </div>
          </div>
          <div className={classes.delete}>
            <IconButton className={classes.iconButton} onClick={() => this.onDelete(item)}>
              <DeleteIcon/>
            </IconButton>
            <div>
              Delete
            </div>
          </div>
        </Popover>
        <div className={classes.SvgWrapper}>
          <IconButton className={classes.iconButton} onClick={this.onOpen}>
            <DotsIcon className={classes.dotsSvg}/>
          </IconButton>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.dashboardTitle}>
          {item.name}
        </div>
        <div className={classes.description}>
          {item.description}
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.children}>
          sales_profit
        </div>
        <div className={classes.children}>
          sales_profit
        </div>
        <div className={classes.children}>
          sales_profit
        </div>
      </div>
    </Card>
  }

  render() {
    const {items, classes} = this.props
    return (
      <div className={classes.wrapDashboards}>
        {items.map(this.renderDashboards)}
      </div>
    )
  }
}

const mapDispatchToProps = {
  deleteDashboards
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(DashboardsList))