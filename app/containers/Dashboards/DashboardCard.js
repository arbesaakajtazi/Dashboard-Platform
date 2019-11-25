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
    width: `calc(33% - ${size.spacing * 2}px)`,
    padding: `${size.spacing * 4}px`,
    margin: `0px ${(size.spacing * 3) - 4}px ${(size.spacing * 3) - 4}px 0px`,
  },
  header: {
    fontSize: size.smallFontSize,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
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
    padding: `${size.spacing * 4}px 0px`
  },
  description: {
    paddingTop: `${size.spacing * 2}px`
  },
  left: {
    display: 'flex',
    alignItems: 'center',
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
    display: 'flex',
    flexFlow: 'row wrap'
  },
  children: {
    color: palette.primary.main,
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

class DashboardCard extends Component {

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
    const {classes, dashboard, onEditCard, onDeleteCard} = this.props
    const length = dashboard.children.length
    const {anchorEl} = this.state
    const open = !!anchorEl
    return (
      <Card className={classes.root} key={dashboard.id}>
        <div className={classes.header}>
          <div className={classes.left}>
            {!!length && <div className={classes.childrenLength}>{length} <span>children</span></div>}
              {moment(dashboard.createdAt).format('DD.MM.YYYY')}
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
          >
            <div className={classes.edit}>
              <IconButton onClick={event => {
                event.preventDefault()
                onEditCard(dashboard)
              }}>
                <EditIcon/>
              </IconButton>
              <div>
                Edit
              </div>
            </div>
            <div className={classes.delete}>
              <IconButton onClick={() => onDeleteCard(dashboard)}>
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
          <Typography variant={"body2"} className={classes.description}>
            {dashboard.description}
          </Typography>
        </div>

        <div className={classes.footer}>
          {!!dashboard.children && dashboard.children.map(next => {
            return <NavLink
              key={next.id}
              to={`/dashboards/${next.id}`}
              className={classes.children}
            >
              <Typography variant={"caption"}>
                {next.name}
              </Typography>
            </NavLink>
          })}
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(DashboardCard)
