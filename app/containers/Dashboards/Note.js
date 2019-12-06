import React, {useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from 'presentations/Card/CardView'
import DeleteIcon from 'presentations/Icons/DeleteIcon'
import {TextField, IconButton} from '@material-ui/core'

const styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    backgroundColor: palette.background.note,
    width: 400,
    height: 300,
    padding: `${size.spacing * 2}px`,
    marginRight: size.spacing * 2,
    position: 'relative'
  },
  deleteButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
    height: '100%',
    width: '10%',
    '& svg': {
      fontSize: size.headingFontSize
    }
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '7%',
    width: '100%'
  },
  textField: {
    '& $underline': {
      backgroundColor: 'transparent',
      color: palette.text.default,
      paddingTop: 0
    },
    '& $input': {
      fontSize: size.headerFontSize,
      fontWeight: typography.weight.bold,
      lineHeight: `${size.spacing * 3}px`,
    }
  },
  underline: {},
  input: {},
  visible: {
    display: 'flex'
  },
  notVisible: {
    display: 'none'
  }
})

const Note = (props) => {
  const {classes, content} = props
  const [hover, setHover] = useState(false)
  const [item, setItem] = useState(content)

  const onValueChanged = (event) => {
    const {name, value} = event.target
    setItem({[name]: value})
  }

  const onMouseEnter = () => {
    setHover(true)
  }
  const onMouseLeave = () => {
    setHover(false)
  }
  console.log("Hover", hover)
  return (
    <Card className={classes.root}>
      <div className={classes.flexEnd}>
        <IconButton className={classes.deleteButton}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
        >
          <DeleteIcon className={hover ? classes.visible : classes.notVisible}/>
        </IconButton>
      </div>
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
        rows={'9'}
      />
    </Card>
  )
}

export default withStyles(styles)(Note)