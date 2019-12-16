/**
 * Created by ArbesaKajtazi on 10/11/2019.
 */
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from 'presentations/Card/CardView'
import Chart from 'presentations/Chart'

const styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    marginRight: size.spacing * 2,
    marginBottom: size.spacing * 2,
    padding: size.spacing * 2,
    height: props=> props.height,
    width: props=> props.width
  }
})

const Graph = (props) => {
  const {classes, content} = props

  const graphData = content.data

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
    <Card className={classes.root}>
      <Chart options={options} title={'New widget'}/>
    </Card>
  )
}

export default withStyles(styles)(Graph)