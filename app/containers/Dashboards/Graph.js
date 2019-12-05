import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from 'presentations/Card/CardView'

const styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    marginRight: size.spacing * 2,
    padding: size.spacing * 2,
    width: 400,
    height: 500
  }
})

const Graph = (props) => {
  const {classes, content} = props

  const graphData = content.data.map(next => {
    return {
      name: next.category,
      value: next.value
    }
  })

  const options = {
    xAxis: {
      type: 'category',
      data: content.data.map(next => next.category)
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
  return (
    <Card className={classes.root} options={options} {...props} title={'New widget'}/>
  )
}

export default withStyles(styles)(Graph)