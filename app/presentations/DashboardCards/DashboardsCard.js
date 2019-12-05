import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import DashboardCard from 'presentations/DashboardCards/DashboardCard'

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    paddingTop: size.spacing,
    display: 'flex',
    flexFlow: 'row wrap'
  }
})

class DashboardsCard extends Component {

  render() {
    const {dashboards, classes, onEdit, onDelete} = this.props
    return (
      <div className={classes.root}>
        {!!dashboards && dashboards.map(dashboard => {
          return <DashboardCard key={dashboard.id}
                                dashboard={dashboard}
                                onEditCard={onEdit}
                                onDeleteCard={onDelete}
          />
        })}
      </div>
    )
  }
}


export default withStyles(styles)(DashboardsCard)