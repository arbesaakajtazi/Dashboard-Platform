import React, {Component} from 'react'
import {connect} from 'react-redux'
import {sessionService} from 'redux-react-session'
import Content from 'anatomy/Content'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from 'presentations/Button/Button'
import {IconButton, InputAdornment, TextField, Typography} from '@material-ui/core'
import FilterIcon from 'presentations/Icons/FilterIcon'
import SearchIcon from 'presentations/Icons/SearchIcon'
import GroupDashboardsIcon from 'presentations/Icons/GroupDashboardsIcon'
import ListDashboardsIcon from 'presentations/Icons/ListDashboardIcon'
import DashboardsForm from 'containers/Dashboards/DashboardsForm'
import DashboardListView from 'presentations/DashboardList/DashboardsListView'
import DashboardsCard from 'presentations/DashboardCards/DashboardsCard'
import {deleteDashboards, fetchDashboards, filter} from 'reducers/Dashboards/DashboardsActions'
import {children, filteredDashboards} from 'reducers/Dashboards/Dashboards'
import AddIcon from '@material-ui/icons/Add'
import DashboardContent from 'containers/Dashboards/DashboardContent'

let styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    position: 'relative',
    height: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textField: {
    width: '100%',
    border: `1px solid transparent`,
    borderRadius: size.baseRadius,
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
    '& $focused': {
      color: palette.text.primary,
    }
  },
  focused: {},
  shrink: {},
  filterWrapper: {
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  filter: {
    background: palette.primary.contrastText,
    padding: `${(size.spacing * 2) - 1}px ${(size.spacing * 2) - 2}px ${(size.spacing * 2) - 2}px`,
    width: 110,
    maxHeight: 49,
    marginLeft: size.spacing,
    borderRadius: size.baseRadius,
    fontSize: size.defaultFontSize,
    lineHeight: `${(size.spacing * 2) + 3}px`,
    boxShadow: shadows[3]
  },
  filterContent: {
    display: 'flex',
    color: palette.text.default
  },
  filterText: {
    paddingLeft: size.spacing
  },
  search: {
    position: 'relative'
  },
  addButton: {
    border: 'none',
    borderRadius: '100%',
    width: 65,
    height: 65,
    padding: 0,
    boxShadow: shadows[2],
    position: 'absolute',
    bottom: 80,
    right: 0,
  },
  logOut: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& Button': {
      padding: 5,
      borderRadius: size.baseRadius
    }
  },
  groupButton: {
    stroke: palette.background.dark,
    '& svg': {
      width: 30
    }
  },
  list: {
    marginLeft: 5,
    '& svg': {
      width: 30
    }
  },
  activeClassName: {
    stroke: palette.primary.main,
  }
})

class Dashboard extends Component {

  state = {
    open: true,
    editing: undefined,
    selectedDashboard: undefined,
    active: false
  }


  componentDidUpdate(prevProps) {
    const {dashboards, match: {params: {id = ''} = {}} = {}} = this.props
    const {match: {params: {id: prevId = ''}}} = prevProps
    if (prevProps.dashboards !== dashboards || prevId !== id) {
      this.setState({
        selectedDashboard: dashboards.find(next => next.id === id)
      })
    }
  }

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

  onRequestChange = (event) => {
    if (event) {
      event.preventDefault()
    }
    this.setState((prevState) => ({
      active: !prevState.active
    }))
  }

  onRequestAdd = (event) => {
    this.setState({
      editing: {
        id: 'new'
      }
    })
    if (event) {
      event.preventDefault()
    }
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  onEdit = (item) => {
    this.setState({
      editing: item
    })
  }

  onDelete = (item) => {
    const {deleteDashboards} = this.props
    deleteDashboards(item)
    this.setState({anchorEl: null})
  }

  onCancelClicked = (event) => {
    if (event) {
      event.preventDefault()
    }
    this.setState({
      editing: undefined
    })
  }

  render() {
    const {session: {user: {username = ''} = {}} = {}, classes, search, filtered} = this.props
    const {editing = {}, selectedDashboard, active} = this.state
    const child = children(filtered, selectedDashboard)

    return (
      <Content>
        <div className={classes.root}>
          <div className={classes.logOut}>
            <Typography variant={'body1'}>Welcome {username}</Typography>
            <Button onClick={this.onLogOutClicked} variant='flat' color='primary'>Log Out</Button>
          </div>
          <div className={classes.header}>
            <div className={classes.filterWrapper}>
              <div className={classes.search}>
                <TextField
                  label='Search'
                  value={search}
                  onChange={this.onChange}
                  className={classes.textField}
                  variant='filled'
                  InputLabelProps={{classes: {focused: classes.focused, shrink: classes.shrink}}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon/>
                      </InputAdornment>)
                  }}
                />
              </div>
              <div className={classes.filter}>
                <div className={classes.filterContent}>
                  <FilterIcon/>
                  <div className={classes.filterText}>Filters</div>
                </div>
              </div>
            </div>
            <div>
              <IconButton onClick={this.onRequestChange}>
                <ListDashboardsIcon className={active ? classes.activeClassName : classes.groupButton}
                />
              </IconButton>
              <IconButton className={classes.list} onClick={this.onRequestChange}>
                <GroupDashboardsIcon className={!active ? classes.activeClassName : classes.groupButton}
                />
              </IconButton>
            </div>
          </div>
          {!active ?
            <DashboardsCard dashboards={child}
                            onEdit={this.onEdit}
                            onDelete={this.onDelete}
            /> :
            <DashboardListView dashboards={child}
                               onEdit={this.onEdit}
                               onDelete={this.onDelete}
            />}
          <DashboardsForm item={editing}
                          open={!!editing.id}
                          onCancelClicked={this.onCancelClicked}
                          parent={selectedDashboard}/>
          <Button variant='flat' color='primary' className={classes.addButton} onClick={this.onRequestAdd}>
            <AddIcon/>
          </Button>
        </div>
        {selectedDashboard && <DashboardContent/>}
      </Content>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    session: store.session,
    filtered: filteredDashboards(store.dashboards),
    dashboards: store.dashboards.dashboards,
    search: store.dashboards.filter
  }
}
const mapDispatchToProps = {
  fetchDashboards,
  deleteDashboards,
  filter
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard))