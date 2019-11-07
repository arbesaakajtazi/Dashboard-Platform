import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const buttonVariants = {
  flat: 'flat'
}
const buttonColors = {
  primary: 'primary',
}

let styles = ({size, palette, shadows, typography, zIndex, transitions}) => ({
  root: {
    cursor: 'pointer',
    display: 'inline-flex',
    transition: transitions.common,
    lineHeight: 1,
    border: 'none',
    textAlign: 'center',
    justifyContent: 'center',
    '&:focus': {
      outline: 'none'
    },
    '&$disabled': {
      cursor: 'not-allowed',
      opacity: 0.6
    },
    '&:active:not($disabled), &$pressed:not($disabled)': {
      transition: 'none',
    },
  },
  flat: {
    '&:hover:not($disabled), &$pressed:not($disabled)': {
      backgroundColor: 'transparent'
    },
    '&$default': {
      color: palette.textColor,
      backgroundColor: 'transparent'
    },
    '&$primary': {
      color: palette.common.white,
      backgroundColor: palette.primaryColor,
      '&:hover:not($disabled), &$pressed:not($disabled)': {
        backgroundColor: palette.primaryColor
      }
    },
  },
  default: {},
  primary: {},
})

export class Button extends React.Component {

  static get defaultProps() {
    return {
      variant: buttonVariants.flat,
      color: buttonColors.default,
    }
  }

  render() {
    const {children, className: classNameProp, classes, variant, color, ...props} = this.props


    const className = classNames(
      classes.root,
      color ? classes[color] : classes.default,
      variant ? classes[variant] : classes.flat,
      classNameProp
    )

    return (
      <button className={className} {...props}>
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  variant: PropTypes.oneOf(Object.keys(buttonVariants)),
  color: PropTypes.oneOf(Object.keys(buttonColors)),
  classes: PropTypes.object,
}

export default withStyles(styles)(Button)