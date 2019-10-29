/**
 * Created by ArbesaKajtazi on 21/10/2019
 */
import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import LogoIcon from 'presentations/Icons/PrimeIcon'
import Wrapper from 'presentations/Wrapper'
import {Button, TextField} from '@material-ui/core'
import {fade} from '@material-ui/core/styles/colorManipulator'
import LogoTextIcon from 'presentations/Icons/LogoTextIcon'
import {connect} from 'react-redux'
import {login} from 'reducers/Auth/AuthActions'
import authentication from "../reducers/Auth/Auth";

//TODO: Make this a component if needed once more
let styles = ({theme, size, palette, shadows, typography}) => ({
  root: {
    width: 300,
    height: 'auto',
    minHeight: size.spacing * 20,
    boxShadow: shadows[16],
    borderRadius: size.spacing * 2,
    backgroundColor: palette.common.white
  },
  header: {
    padding: `${size.spacing * 5}px  ${size.spacing * 4}px 0px`
  },
  logo: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center'
  },
  logoIconWithText: {
    height: size.logoTextIconHeight,
    width: size.logoTextIconWidth,
    marginBottom: size.spacing
  },
  svgIcon: {
    fontSize: size.spacing * 5
  },
  textField: {
    '&:first-child': {
      marginBottom: size.spacing * 2
    },
    width: '100%',
    '& label': {
      left: size.spacing,
      fontSize: size.smallFontSize,
    },
    '& input': {
      paddingLeft: size.spacing,
      fontSize: size.defaultFontSize
    },
    '& $focused': {
      color: palette.primaryColor
    },
    '& $underline': {
      color: palette.leadTextColor,
      '&:hover:not($focused):not($disabled)': {
        '&:before': {
          borderBottom: `1px solid ${palette.textColor}`,
        }
      },
      '&:after': {
        borderBottom: `1px solid ${palette.primaryColor}`,
      }
    }
  },
  underline: {},
  focused: {},
  disabled: {},
  contentWrapper: {
    padding: `${size.spacing * 5}px  ${size.spacing * 4}px`,
  },
  actionWrapper: {
    padding: `0px ${size.spacing * 4}px  ${size.spacing * 5}px`,
    display: 'flex',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: palette.primaryColor,
    minWidth: 140,
    color: palette.common.white,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: fade(palette.primaryColor, 0.85)
    }
  }
})

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  onSubmitHandler = (event) => {
    event.preventDefault(event)
    const {login} = this.props
    const {username, password} = this.state
    if (username && password) {
      login(username, password)
    }
  }

  render() {
    const {classes} = this.props
    const {username, password} = this.state
    return (
      <Wrapper>
        <div className={classes.root}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <LogoIcon className={classes.svgIcon}/>
              <LogoTextIcon className={classes.logoIconWithText}/>
            </div>
          </div>
          <div className={classes.contentWrapper}>
            <TextField className={classes.textField}
                       InputProps={{classes: {underline: classes.underline, disabled: classes.disabled}}}
                       InputLabelProps={{classes: {focused: classes.focused}}}
                       name="username"
                       label="username"
                       value={username}
                       onChange={this.handleChange}
            />
            <TextField className={classes.textField}
                       InputProps={{classes: {underline: classes.underline, disabled: classes.disabled}}}
                       InputLabelProps={{classes: {focused: classes.focused}}}
                       name="password"
                       label="password"
                       type="password"
                       value={password}
                       onChange={this.handleChange}
            />
          </div>
          <div className={classes.actionWrapper}>
            <Button
              variant='contained'
              className={classes.btn}
              onClick={this.onSubmitHandler}
            >
              Login
            </Button>
          </div>
        </div>
      </Wrapper>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isAuthenticated: store.authReducer.isAuthenticated
  }
}

const mapDispatchToProps = {
  login
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login))