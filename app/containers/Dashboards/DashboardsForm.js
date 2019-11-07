import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core'
import Textarea from '@material-ui/core/InputBase/'
import Button from 'presentations/Button/Button'

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    backgroundColor: palette.modalBg
  },
  dialogTitle: {
    '& h6': {
      fontSize: size.displayFontSize,
      fontWeight: typography.weight.bold
    },
    padding: `${(size.spacing * 5) + 4}px ${size.spacing * 6}px ${(size.spacing * 7) - 2}px`
  },
  paper: {
    width: `calc(33% - ${size.spacing * 2}px)`,
  },
  dialogContent: {
    padding: `0px ${size.spacing * 6}px`
  },
  dialogActions: {
    padding: `${size.spacing * 2}px ${size.spacing * 6}px ${size.spacing * 7}px`,
    margin: 0
  },
  textField: {
    width: '100%',
    border: `1px solid transparent`,
    borderRadius: size.baseRadius,
    backgroundColor: palette.searchBg,
    '& label': {
      fontSize: size.defaultFontSize,
      color: palette.textColor,
      lineHeight: `${(size.spacing * 2) + 3}px`,
      transform: `translate(0, 16px) scale(1)`,
      left: size.spacing * 2
    },
    '& $shrink': {
      transform: `translate(0, 1.5px) scale(0.75)`,
    },
    '& input': {
      fontSize: size.defaultFontSize,
      padding: `${size.spacing * 2}px`
    },
    '& $focused': {
      color: palette.textColor
    },
    '& $underline': {
      color: palette.leadTextColor,
      margin: 0,
      '&:hover': {
        border: 'none'
      },
      '&:hover:not($focused):not($disabled)': {
        '&:before': {
          borderBottom: 'none',
        }
      },
      '&:after': {
        borderBottom: 'none'
      },
      '&:before': {
        border: 'none'
      }
    }
  },
  underline: {},
  focused: {},
  disabled: {},
  shrink: {},
  textArea: {
    height: 200,
    display: 'block',
    background: palette.searchBg,
    borderRadius: size.baseRadius,
    padding: `${(size.spacing * 2) - 2}px ${size.spacing * 2}px`,
    fontSize: size.defaultFontSize
  },
  saveBtn: {
    backgroundColor: palette.primaryColor,
    color: palette.common.white,
    textTransform: 'none'
  }
})

class DashboardsForm extends Component {
  render() {
    const {classes} = this.props
    return (
      <Dialog open={false} className={classes.root} classes={{paper: classes.paper}}>
        <DialogTitle className={classes.dialogTitle}>
          Create new project
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField className={classes.textField}
                     InputProps={{classes: {disabled: classes.disabled, underline: classes.underline}}}
                     InputLabelProps={{classes: {focused: classes.focused, shrink: classes.shrink}}}
                     fullWidth
                     margin='normal'
                     name='name'
                     onChange={this.onValueChanged}
                     placeholder='Name'
          />
          <Textarea className={classes.textArea}
                    fullWidth
                    margin='normal'
                    name='description'
                    onChange={this.onValueChanged}
                    placeholder='Description'/>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant='flat' color='default'>
            Cancel
          </Button>
          <Button variant='flat' color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(DashboardsForm)