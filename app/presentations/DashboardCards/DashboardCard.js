import React, {Component} from 'react'
import moment from 'moment'
import withStyles from '@material-ui/core/styles/withStyles'
import {IconButton, Popover} from '@material-ui/core'
import EditIcon from 'presentations/Icons/EditIcon'
import DeleteIcon from 'presentations/Icons/DeleteIcon'
import DotsIcon from 'presentations/Icons/DotsIcon'
import {NavLink} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Card from 'presentations/Card/CardView'
import Button from 'presentations/Button/Button'


let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    width: `calc(33% - ${size.spacing * 2}px)`,
    padding: `${size.spacing * 4}px`,
    margin: `0px ${(size.spacing * 3) - 4}px ${(size.spacing * 3) - 4}px 0px`,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between'
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
    paddingTop: `${size.spacing * 2}px`,
    overflow: 'hidden',
    height: 55
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: `${size.spacing * 2}px`
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
  paper: {
    height: 80,
    width: 95,
    backgroundColor: palette.primary.contrastText,
    padding: `${size.spacing * 2}px`,
    overflow: 'hidden',
    boxShadow: shadows[5],
    fontFamily: typography.fontFamily,
    fontSize: size.defaultFontSize,
    textTransform: 'lowercase',
    '& button': {
      '& span': {
        color: palette.text.default,
      }
    }
  },
  menuLink: {
    textDecoration: 'none',
    color: palette.text.default,
    fontSize: size.headingFontSize,
    fontWeight: typography.weight.bold,
  },
  footer: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  navLink: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
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
        <div>
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
              <Button onClick={event => {
                event.preventDefault()
                onEditCard(dashboard)
                this.onClose()
              }}>
                <EditIcon/>
                <span>
                edit
              </span>
              </Button>
              <Button onClick={() => {
                onDeleteCard(dashboard)
                this.onClose()
              }}>
                <DeleteIcon/>
                <span>
                  delete
                </span>
              </Button>
            </Popover>
            <IconButton onClick={this.onOpen}>
              <DotsIcon/>
            </IconButton>
          </div>

          <div className={classes.content}>
            <div className={classes.navLink}>
              <NavLink
              to={`/dashboards/${dashboard.id}`}
              className={classes.menuLink}
            >{dashboard.name}</NavLink>
            </div>
            <Typography variant={"body2"} className={classes.description}>
              {dashboard.description}
            </Typography>
          </div>
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
