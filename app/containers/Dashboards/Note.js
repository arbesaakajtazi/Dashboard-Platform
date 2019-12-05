import React, {useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from 'presentations/Card/CardView'
import DotsIcon from 'presentations/Icons/DotsIcon'
import {Popover} from '@material-ui/core'
import Button from 'presentations/Button/Button'
import DeleteIcon from 'presentations/Icons/DeleteIcon'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

const styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    backgroundColor: palette.background.note,
    width: 400,
    height: 300,
    padding: `${size.spacing * 2}px`,
    marginRight: size.spacing * 2
  },
  dotsIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  paper: {
    backgroundColor: palette.primary.contrastText,
    padding: `${size.spacing * 2}px ${size.spacing * 2}px 0`,
    overflow: 'hidden',
    boxShadow: shadows[5],
    fontFamily: typography.fontFamily,
    fontSize: size.defaultFontSize,
    textTransform: 'lowercase',
    '& button': {
      '& span': {
        color: palette.text.default,
      }
    }
  },
  textField: {
    '& $underline': {
      backgroundColor: 'transparent',
      color: palette.text.default,
    },
    '& $input': {
      fontSize: size.headerFontSize,
      fontWeight: typography.weight.bold,
      lineHeight: `${size.spacing * 3}px`
    }
  },
  underline: {},
  input: {}
})

const Note = (props) => {
  const {classes, content} = props
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [item, setItem] = useState(content)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onValueChanged = (event) => {
    const {name, value} = event.target
    setItem({[name]: value})
  }

  return (
    <Card className={classes.root}>
      <div className={classes.dotsIcon}>
        <IconButton onClick={handleClick}>
          <DotsIcon/>
        </IconButton>
      </div>
      <Popover
        classes={{
          paper: classes.paper
        }}
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Button>
          <DeleteIcon/><span>delete</span>
        </Button>
      </Popover>
      <TextField
        className={classes.textField}
        InputProps={{classes: {underline: classes.underline, input: classes.input}}}
        fullWidth
        name='note'
        placeholder="Write a note..."
        multiline={true}
        variant={'filled'}
        onChange={onValueChanged}
        value={item.text}
        rows={'10'}
      />
    </Card>
  )
}

export default withStyles(styles)(Note)