import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from 'presentations/Card/CardView'

const styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    marginRight: size.spacing * 2,
    marginBottom: size.spacing * 2,
    padding: size.spacing * 2,
    width: 400,
    minHeight: 300
  }
})

const Graph = (props) => {
  const {classes, content} = props

  const graphData = content.data
  console.log('graphData', graphData)

  const withAxis = {
    xAxis: {
      type: 'category',
      data: content.data.map(next => next.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: graphData,
        type: content.type.toLowerCase()
      }
    ]
  }
  const noAxis = {
    series: [
      {
        name: 'Data',
        data: graphData,
        type: content.type.toLowerCase()
      }
    ]
  }

  const options = (content.type === 'PIE' || content.type === 'TREEMAP') ? noAxis : withAxis

  return (
    <Card className={classes.root} options={options} {...props} title={'New widget'}/>
  )
}

export default withStyles(styles)(Graph)