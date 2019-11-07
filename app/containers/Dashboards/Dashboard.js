import React, {Component} from 'react'
import {connect} from 'react-redux'
import {sessionService} from 'redux-react-session'
import Content from 'anatomy/Content'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from 'presentations/Buttons/AddButton'
import {TextField} from '@material-ui/core'
import FilterIcon from 'presentations/Icons/FilterIcon'
import SearchIcon from 'presentations/Icons/SearchIcon'
import GroupDashboardsIcon from 'presentations/Icons/GroupDashboardsIcon'
import ListDashboardsIcon from 'presentations/Icons/ListDashboardIcon'
import {IconButton} from '@material-ui/core'
import DashboardsList from 'containers/Dashboards/DashboardsList'
import {fetchDashboards} from 'reducers/Dashboards/DashboardsActions'
import {filteredDashboards} from 'reducers/Dashboards/Dashboards'
import {filter} from 'reducers/Dashboards/DashboardsActions'
import DashboardsForm from "./DashboardsForm";

let styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  // root: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dashboardBtn: {
    position: 'absolute',
    bottom: 50,
    right: 80
  },
  textField: {
    width: '100%',
    maxWidth: 233,
    border: `1px solid transparent`,
    borderRadius: size.baseRadius,
    backgroundColor: palette.searchBg,
    '& label': {
      fontSize: size.defaultFontSize,
      color: palette.textColor,
      lineHeight: `${(size.spacing * 2) + 3}px`,
      transform: `translate(0, 16px) scale(1)`,
      left: size.spacing * 2
    },
    '& $shrink': {
      transform: `translate(0, 1.5px) scale(0.75)`,
    },
    '& input': {
      fontSize: size.defaultFontSize,
      padding: `${size.spacing * 2}px`
    },
    '& $focused': {
      color: palette.textColor
    },
    '& $underline': {
      color: palette.leadTextColor,
      margin: 0,
      '&:hover': {
        border: 'none'
      },
      '&:hover:not($focused):not($disabled)': {
        '&:before': {
          borderBottom: 'none',
        }
      },
      '&:after': {
        borderBottom: 'none'
      },
      '&:before': {
        border: 'none'
      }
    }
  },
  underline: {},
  focused: {},
  disabled: {},
  shrink: {},
  filterWrapper: {
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  filter: {
    background: palette.common.white,
    padding: `${(size.spacing * 2) - 1}px ${(size.spacing * 2) - 2}px ${(size.spacing * 2) - 2}px`,
    width: 110,
    marginLeft: size.spacing,
    borderRadius: size.baseRadius,
    fontSize: size.defaultFontSize,
    lineHeight: `${(size.spacing * 2) + 3}px`,
    boxShadow: shadows[3]
  },
  filterContent: {
    display: 'flex'
  },
  filterText: {
    paddingLeft: size.spacing
  },
  search: {
    position: 'relative'
  },
  searchIcon: {
    width: 25,
    height: 45,
    zIndex: 1,
    position: 'absolute',
    right: 5
  }
})

class Dashboard extends Component {

  componentDidMount() {
    const {fetchDashboards} = this.props
    fetchDashboards()
  }

  onLogOutClicked = () => {
    sessionService.deleteSession()
    sessionService.deleteUser()
  }

  onChange = (event) => {
    const {filter} = this.props
    filter(event.target.value)
  }

  render() {
    const {session: {user: {username = ''} = {}} = {}, classes, search, dashboard} = this.props
    return (
      <Content>
        <div className={classes.header}>
          <div className={classes.filterWrapper}>
            <div className={classes.search}>
              <TextField label='Search'
                         value={search}
                         onChange={this.onChange}
                         className={classes.textField}
                         InputProps={{classes: {disabled: classes.disabled, underline: classes.underline}}}
                         InputLabelProps={{classes: {focused: classes.focused, shrink: classes.shrink}}}/>
              <SearchIcon className={classes.searchIcon}/>
            </div>
            <div className={classes.filter}>
              <div className={classes.filterContent}>
                <FilterIcon/>
                <div className={classes.filterText}>Filters</div>
              </div>
            </div>
          </div>
          <div className={classes.dashboardsView}>
            <IconButton>
              <ListDashboardsIcon/>
            </IconButton>
            <IconButton>
              <GroupDashboardsIcon/>
            </IconButton>
          </div>
        </div>
        <DashboardsList items={dashboard}/>
        <DashboardsForm/>
        {/*<div>Welcome {username}</div>*/}
        {/*<button onClick={this.onLogOutClicked}>Log Out</button>*/}
        <div className={classes.dashboardBtn}>
          <Button/>
        </div>
      </Content>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    session: store.session,
    dashboard: filteredDashboards(store.dashboards),
    search: store.dashboards.filter
  }
}
const mapDispatchToProps = {
  fetchDashboards,
  filter
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard))