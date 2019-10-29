/**
 * Created by ArbesaKajtazi on 23/10/2019
 */
import React, {Component} from 'react'
import Wrapper from 'presentations/Wrapper'
import withStyles from '@material-ui/core/styles/withStyles'
import {Button} from '@material-ui/core'
import {fade} from '@material-ui/core/styles/colorManipulator'

let styles = ({theme, size, palette, shadows, typography}) => ({
  root: {
    height: 'auto',
    minHeight: size.spacing * 20,
    boxShadow: shadows[16],
    borderRadius: size.spacing * 2,
    backgroundColor: palette.common.white,
    padding: size.spacing * 4,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: size.headingFontSize,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: size.spacing * 2,
    fontFamily: typography.secondaryFontFamily
  },
  content: {
    fontSize: size.headerFontSize,
    color: palette.textColor,
    marginBottom: size.spacing * 2,
    fontFamily: typography.fontFamily
  },
  btn: {
    backgroundColor: palette.primaryColor,
    color: palette.common.white,
    width: 100,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: fade(palette.primaryColor, 0.85)
    }
  }
})

class PageNotFound extends Component {
  goBack = (event) => {
    event.preventDefault()
    const {history: {goBack}} = this.props
    if (goBack) {
      goBack()
    }
  }
  render() {
    const {classes, goBack} = this.props
    console.log(goBack, "GOBACK")
    return (
      <Wrapper>
        <div className={classes.root}>
          <div className={classes.header}>404 Page not found</div>
          <div className={classes.content}>Check that you typed the address correctly</div>
          <Button className={classes.btn}
                  onClick={this.goBack}>Go back</Button>
        </div>
      </Wrapper>
    )
  }
}

export default withStyles(styles)(PageNotFound)