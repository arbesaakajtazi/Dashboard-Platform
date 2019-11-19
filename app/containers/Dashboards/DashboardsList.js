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
import {NavLink} from 'react-router-dom'

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {},
  wrapDashboards: {
    paddingTop: size.spacing,
    display: 'flex',
    flexFlow: 'row wrap'
  },
  header: {
    fontSize: size.smallFontSize,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    padding: `${(size.spacing * 3) - 4}px ${(size.spacing * 4) - 2}px 0px`,
    position: 'relative'
  },
  childrenLength: {
    paddingRight: 20,
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      height: 4,
      top: 5,
      width: 4,
      right: 9,
      backgroundColor: palette.text.primary,
      borderRadius: '100%'
    }
  },
  content: {
    padding: `${size.spacing * 4}px`
  },
  description: {
    fontSize: size.defaultFontSize,
    color: palette.textColor,
    paddingTop: `${size.spacing * 2}px`
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
    padding: `${size.spacing}px ${size.spacing * 2}px`,
    marginRight: 10,
    textDecoration: 'none',
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
    fontSize: size.headingFontSize,
    fontWeight: typography.weight.bold,
  },
})

class DashboardsList extends Component {

  state = {
    anchorEl: null
  }

  onDelete = (item) => {
    const {deleteDashboards} = this.props
    deleteDashboards(item)
    this.setState({anchorEl: null})
  }

  onOpen = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  onClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {dashboards, classes} = this.props
    const {anchorEl} = this.state
    const open = !!anchorEl
    console.log(dashboards, "dashboards")
    return (
      <div className={classes.wrapDashboards}>
        {!!dashboards && dashboards.map(dashboard => {
          const length = dashboard.children.length
          return <Card key={dashboard.id}>
            <div className={classes.header}>
              <div className={classes.left}>
                {!!length && <div className={classes.childrenLength}>{length} <span>children</span></div>}
                <div className={classes.date}>
                  {moment(dashboard.createdAt).format('DD.MM.YYYY')}
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
                  <IconButton onClick={event => {
                    event.preventDefault()
                    this.props.onEdit(dashboard)
                  }}>
                    <EditIcon/>
                  </IconButton>
                  <div>
                    Edit
                  </div>
                </div>
                <div className={classes.delete}>
                  <IconButton onClick={() => this.onDelete(dashboard)}>
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

            <div className={classes.content}>
              <NavLink
                to={`/dashboards/${dashboard.id}`}
                className={classes.menuLink}
              >{dashboard.name}</NavLink>
              <div className={classes.description}>
                {dashboard.description}
              </div>
            </div>

            <div className={classes.footer}>
              {!!dashboard.children && dashboard.children.map(next => {
                return <NavLink
                  to={`/dashboards/${next.id}`}
                  className={classes.children}
                >{next.name}</NavLink>
              })}
            </div>
          </Card>
        })}
      </div>
    )
  }
}

const mapDispatchToProps = {
  deleteDashboards
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(DashboardsList))