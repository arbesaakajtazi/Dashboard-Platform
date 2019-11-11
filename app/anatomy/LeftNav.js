import React, {Component} from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import Switch from '@material-ui/core/Switch'
import {changeTheme} from 'reducers/Theme/ThemeActions'

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    width: '100%',
    height: '100vh',
    maxWidth: size.drawer,
    padding: `${(size.spacing * 7) + 2}px  ${(size.spacing * 6) - 2}px`,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    overflowY: 'hidden',
    overflowX: 'hidden',
    backgroundColor: palette.primary.light,
    boxShadow: shadows[8],
    zIndex: zIndex.drawer
  },
  navHeader: {
    color: palette.primary.contrastText,
    fontSize: size.headingFontSize,
    lineHeight: '39px',
    fontWeight: typography.weight.bold
  },
  navContent: {
    color: palette.background.dark
  },
  navFooter: {
    color: palette.primary.contrastText,
    fontSize: size.headerFontSize,
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    padding: `0px ${(size.spacing * 3) - 4}px`,
  },
  switch: {
    marginLeft: 10
  },
  parentList: {
    paddingLeft: 20,
    fontSize: size.headerFontSize,
    lineHeight: '19px',
    marginTop: '28px',
    '& li': {}
  },
  childList: {
    paddingLeft: 17,
    listStyle: 'none'
  }
})

class LeftNav extends Component {

  changeTheme = () => {
    const {theme, changeTheme} = this.props
    if (theme === 'light') {
      changeTheme('dark')
    } else {
      changeTheme('light')
    }
  }

  render() {
    const {classes, theme} = this.props
    return (
      <div className={classes.root}>
        <div>
          <div className={classes.navHeader}>Overview</div>
          <div className={classes.navContent}>
            <ul className={classes.parentList}>
              <li>
                Sales Overview
                <ul className={classes.childList}>
                  <li>Sales Profit</li>
                  <li>Sales Loss</li>
                  <li>Sales 2017</li>
                </ul>
              </li>
              <li>Costumer Journey</li>
              <li>Two Column Dashboard</li>
            </ul>
          </div>
        </div>
        <div className={classes.navFooter}>
          <div>{theme} Mode</div>
          <Switch className={classes.switch} onChange={this.changeTheme}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    theme: store.theme
  }
}

const mapDispatchToProps = {
  changeTheme
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LeftNav))