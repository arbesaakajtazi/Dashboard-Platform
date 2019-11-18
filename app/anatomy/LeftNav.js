import React, {Component} from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import Switch from '@material-ui/core/Switch'
import {changeTheme} from 'reducers/Theme/ThemeActions'
import {fetchDashboards} from 'reducers/Dashboards/DashboardsActions'
import {dashboardChildren} from 'reducers/Dashboards/Dashboards'
import {NavLink} from "react-router-dom";

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    width: '100%',
    height: '100vh',
    maxWidth: size.drawer,
    padding: `${(size.spacing * 7) + 2}px  ${(size.spacing * 6) - 2}px`,
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
    fontWeight: typography.weight.bold
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
    fontSize: size.headerFontSize
  },
  menuLink: {
    color: palette.background.dark,
    textDecoration: 'none'
  },
  activeMenuLink: {
    color: palette.primary.main
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
    const DashboardsHierarchy = ({dashboard}) => {
      const hasDashboards = dashboards.length > 0
      const nestedChildren = (dashboard.children).map(dashboard => {
        return <DashboardsHierarchy key={dashboard.id} dashboard={dashboard}/>
      })
      return (
        hasDashboards && <ul className={classes.children}>
          <li>
            <NavLink
              to={`/dashboards/${dashboard.id}`}
              className={classes.menuLink}
              activeClassName={classes.activeMenuLink}
            >{dashboard.name}</NavLink>
            {nestedChildren}
          </li>
        </ul>
      )
    }
    return (
      <div className={classes.root}>
        <div>
          <div className={classes.navHeader}>Overview</div>
            {dashboards.map((dashboard) => {
              return (
                <DashboardsHierarchy key={dashboard.id} dashboard={dashboard}/>
              )
            })}
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