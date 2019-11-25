import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import DashboardListView from 'containers/Dashboards/DashboardListView'

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    paddingTop: size.spacing,
  },
  childrenDashboard: {
    marginLeft: `${size.spacing * 3}px`,
  }
})

class DashboardsListView extends Component {

  render() {
    const {dashboards, classes, onEdit, onDelete} = this.props

    const createRow = (dashboards, index) => {
      const notNull = dashboards.length > 0
      return (
        notNull && <div>
          {dashboards.map(dashboard => (
            <div key={dashboard.id} className={index && classes.childrenDashboard}>
              <DashboardListView dashboard={dashboard}
                                 onEditListView={onEdit}
                                 onDeleteListView={onDelete}/>
              {dashboard.children.length > 0 ? createRow(dashboard.children, index + 1) : null}
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className={classes.root}>
        {createRow(dashboards, 0)}
      </div>
    )
  }
}

export default withStyles(styles)(DashboardsListView)