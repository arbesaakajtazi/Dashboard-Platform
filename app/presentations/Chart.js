/**
 * Created by Arbesa Kajtazi on 12/05/2019.
 */
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import classNames from 'classnames'
import echarts from 'echarts'

const styles = {
  chartWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex'
  }
}

class Chart extends React.Component {

  chart = null

  /**
   * init the chart ({@link LineChart#init}) and resize event listener
   */
  componentDidMount() {
    this.init()
    this.setOption()
  }

  componentDidUpdate(prevProps, prevState) {
    this.setOption()
  }

  /**
   * on component unmount dispose the chart ({@link LineChart#dispose})
   */
  componentWillUnmount() {
    this.dispose()
  }

  /**
   * init the chart and set chart options ({@link LineChart#setOption})
   */
  init() {
    this.chart = echarts.init(this.refs.container)
    if (this.props.onInit) {
      this.props.onInit(this.chart)
    }
  }

  setOption() {
    const { options, onOptionsChanged } = this.props
    if (!options) {
      if (this.chart) {
        this.chart.clear()
      }
      return
    }
    const padding = 32
    const graph = {
      ...options,
      grid: {
        left: padding,
        right: padding,
        top: padding,
        bottom: padding,
        ...options.grid
      },
      tooltip: {
        show: true
      },
      legend: {
        orient: 'vertical',
      }
    }
    try {
      this.chart.setOption(graph, true)
    } catch (e) {
      console.log('error setting options')
      console.log(e)
    }
    if (onOptionsChanged) {
      onOptionsChanged()
    }
  }

  /**
   * clear the chart resources
   */
  dispose() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  }

  render() {
    let { style, classes, children, className: classNameProp } = this.props
    return (
      <div className={classNames(classes.chartWrapper, classNameProp)} style={style}>
        <div className={classes.chartWrapper} ref={'container'} />
        {children}
      </div>
    )
  }
}

export default withStyles(styles)(Chart)
