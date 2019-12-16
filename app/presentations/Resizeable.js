import React, { Component } from 'react'

const Resizable = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      const { width, height } = props
      this.state = {
        width: width,
        height: height
      }
    }

    componentDidMount () {
      document.addEventListener("mousemove", this.onMouseMove)
      document.addEventListener("mouseup", this.onMouseUp)
    }

    componentWillUnmount () {
      document.removeEventListener("mousemove", this.onMouseMove)
      document.removeEventListener("mouseup", this.onMouseUp)
    }

    onMouseDown = (event) => {
      event.preventDefault()
      let pageX = event.pageX
      let pageY = event.pageY
      const { width, height } = this.state
      this.setState({
        location: {
          width: pageX - width,
          height: pageY - height
        }
      })
    }

    onMouseMove = (event) => {
      const { location } = this.state
      if (!location) {
        return
      }
      event.preventDefault()

      const { pageX, pageY } = event
      this.setState({
        width: pageX - location.width,
        height: pageY - location.height
      })
    }

    onMouseUp = (event) => {
      event.preventDefault()
      this.setState(prevState => ({
        location: undefined
      }))

      const { onSizeChanged } = this.props
      if (!!onSizeChanged) {
        const { width, height } = this.state
        onSizeChanged(width, height)
      }
    }

    render() {
      const { width, height } = this.state
      // console.log('new width', width, 'new height', height)
      const resizeListeners = {
        onMouseDown: this.onMouseDown,
        onMouseMove: this.onMouseMove,
        onMouseUp: this.onMouseUp
      }
      return <Component resizeListeners={resizeListeners} {...this.props}  width={width} height={height} />
    }
  }
}

export default Resizable