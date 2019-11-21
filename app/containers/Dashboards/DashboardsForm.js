import React, {Component} from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core'
import Button from 'presentations/Button/Button'
import {addDashboards, updateDashboards} from 'reducers/Dashboards/DashboardsActions'
import Typography from "@material-ui/core/Typography";

let styles = ({size, palette, shadows, typography, zIndex}) => ({
  root: {
    backgroundColor: palette.primary.dark,
  },
  dialogTitle: {
    '& h2': {
      fontSize: size.displayFontSize,
      fontWeight: typography.weight.bold
    },
    padding: `${(size.spacing * 5) + 4}px ${size.spacing * 6}px ${(size.spacing * 7) - 2}px`,
    color: palette.secondary.contrastText
  },
  paper: {
    width: `calc(33% - ${size.spacing * 2}px)`,
    backgroundColor: palette.primary.contrastText
  },
  dialogContent: {
    padding: `0px ${size.spacing * 6}px`,
    overflow: 'hidden'
  },
  dialogActions: {
    padding: `${size.spacing * 2}px ${size.spacing * 6}px ${size.spacing * 7}px`,
    margin: 0,
    '& button': {
      padding: size.spacing * 2,
      borderRadius: size.baseRadius,
      lineHeight: '19px'
    }
  }
})

class DashboardsForm extends Component {

  state = {
    items: {}
  }

  componentDidMount() {
    this.setState({
      item: this.props.items
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item.id !== this.props.item.id && this.props.item) {
      console.log('prevProps', prevProps.item)
      console.log('thisProps', this.props.item)
      this.setState({
        item: this.props.item
      })
    }
  }


  onValueChanged = (event) => {
    const {name, value} = event.target
    this.setState((prevState) => ({
      item: {
        ...prevState.item,
        [name]: value
      }
    }))
  }

  onSaveClicked = (event) => {
    event.preventDefault()
    const {addDashboards, updateDashboards, onCancelClicked} = this.props
    const {item} = this.state
    let isNew = this.state.item.id === 'new'
    if (isNew) {
      if (item.name && item.description) {
        addDashboards(item)
      }
    } else {
      updateDashboards(item)
    }
    onCancelClicked()
  }

  render() {
    const {classes, open, onCancelClicked} = this.props
    const {item = {}} = this.state

    return (
      <Dialog open={open} className={classes.root} classes={{paper: classes.paper}}>
        <DialogTitle className={classes.dialogTitle}>
          Create new project
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField fullWidth
                     variant='filled'
                     margin='normal'
                     name='name'
                     onChange={this.onValueChanged}
                     placeholder='Name'
                     value={item.name}
          />
          <TextField fullWidth
                     margin='normal'
                     name='description'
                     onChange={this.onValueChanged}
                     placeholder='Description'
                     value={item.description}
                     multiline={true}
                     variant='filled'
                     rows={9}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant='flat' color='default' onClick={onCancelClicked}>
            <Typography variant={"body2"}>Cancel</Typography>
          </Button>
          <Button variant='flat' color='primary' onClick={this.onSaveClicked}>
            <Typography variant={"body2"}>Save</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapDispatchToProps = ({
  addDashboards,
  updateDashboards
})

export default withStyles(styles)(connect(null, mapDispatchToProps)(DashboardsForm))