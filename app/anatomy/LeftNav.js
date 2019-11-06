import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Switch from '@material-ui/core/Switch'

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    width: '100%',
    height: '100vh',
    color: palette.textColor,
    maxWidth: 300,
    padding: `${(size.spacing * 7)+2}px  ${(size.spacing * 6)-2}px`,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    overflowY: 'hidden',
    overflowX: 'hidden',
    backgroundColor: palette.navBarBgColor,
    boxShadow: shadows[8],
    zIndex: zIndex.drawer
  },
  navHeader: {
    color: palette.common.white,
    fontSize: size.headingFontSize,
    lineHeight: '39px',
    fontWeight: typography.weight.bold
  },
  navContent: {},
  navFooter: {
    color: palette.common.white,
    fontSize: size.headerFontSize,
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    padding: `0px ${(size.spacing * 3)-4}px`,
  },
  switch: {
    marginLeft: 10,
    '& $icon': {
      width: 37,
      height: 37,
      backgroundColor: palette.common.white,
      boxShadow: shadows[1]
    },
    '& $bar': {
      width: 69,
      height: 42,
      top: '21%',
      left: '32%',
      backgroundColor: palette.buttonBg,
      borderRadius: '100px',
      opacity: 1
    },
    '& $checked': {
      transform: 'translateX(26px)',
    },
    '& $colorSecondary': {
      '&$checked': {
        '& + $bar': {
          backgroundColor: palette.primaryColor,
          opacity: 1
        }
      }
    }
  },
  icon: {},
  bar: {},
  checked: {},
  colorSecondary: {},
  parentList: {
    paddingLeft: 20,
    fontSize: size.headerFontSize,
    lineHeight: '19px',
    marginTop: '28px',
    '& li': {
    }
  },
  childList: {
    paddingLeft: 17,
    listStyle: 'none'
  }
})

class LeftNav extends Component {

  render() {
    const {classes} = this.props
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
          <div>Dark Mode</div>
          <Switch className={classes.switch} classes={{
            icon: classes.icon,
            bar: classes.bar,
            checked: classes.checked,
            colorSecondary: classes.colorSecondary
          }}/>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(LeftNav)