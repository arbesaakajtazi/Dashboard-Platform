import React, {Component} from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import Switch from '@material-ui/core/Switch'
import {changeTheme} from 'reducers/Theme/ThemeActions'
import {fetchDashboards} from 'reducers/Dashboards/DashboardsActions'
import {dashboardChildren} from 'reducers/Dashboards/Dashboards'
import {NavLink} from 'react-router-dom'
import classNames from 'classnames'

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    width: '100%',
    height: '100vh',
    maxWidth: size.drawer,
    padding: `${(size.spacing * 7) + 2}px  ${size.spacing * 5}px`,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    overflowY: 'hidden',
    overflowX: 'hidden',
    backgroundColor: palette.primary.light,
    boxShadow: shadows[8],
    zIndex: zIndex.drawer
  },
  navHeader: {
    color: palette.primary.contrastText,
    fontSize: size.headingFontSize,
    lineHeight: '39px',
    fontWeight: typography.weight.bold,
    textDecoration: 'none'
  },
  navFooter: {
    color: palette.primary.contrastText,
    fontSize: size.headerFontSize,
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    padding: `0px ${(size.spacing * 3) - 4}px`,
    textTransform: 'capitalize'
  },
  switch: {
    marginLeft: size.spacing
  },
  children: {
    padding: `0 ${(size.spacing * 2) + 2}px`,
    fontSize: size.menuLinks,
  },
  menuLink: {
    color: palette.background.dark,
    textDecoration: 'none',
  },
  activeMenuLink: {
    color: palette.primary.main
  },
  index: {
    listStyle: 'none',
  }
})

class LeftNav extends Component {

  componentDidMount() {
    const {fetchDashboards} = this.props
    fetchDashboards()
  }

  changeTheme = () => {
    const {theme, changeTheme} = this.props
    if (theme === 'light') {
      changeTheme('dark')
    } else {
      changeTheme('light')
    }
  }

  render() {
    const {classes, theme, dashboards} = this.props

    const buildHierarchy = (dashboards, index) => {
      const notNull = dashboards.length > 0
      return (
        notNull && <ul className={classNames(classes.children, index && classes.index)}>
          {dashboards.map(dashboard => (
            <li key={dashboard.id}>
              <NavLink
                to={`/dashboards/${dashboard.id}`}
                className={classes.menuLink}
                activeClassName={classes.activeMenuLink}
              >{dashboard.name.substring(0, 20)}</NavLink>
              {dashboard.children.length > 0 ? buildHierarchy(dashboard.children, index + 1) : null}
            </li>
          ))}
        </ul>
      )
    }
    return (
      <div className={classes.root}>
        <div>
          <NavLink
            className={classes.navHeader}
            to={`/`}
          >Overview</NavLink>
          {buildHierarchy(dashboards, 0)}
        </div>
        <div className={classes.navFooter}>
          <div>{theme} Mode</div>
          <Switch className={classes.switch} onChange={this.changeTheme}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    theme: store.theme,
    dashboards: dashboardChildren(store)
  }
}

const mapDispatchToProps = {
  changeTheme,
  fetchDashboards,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LeftNav))