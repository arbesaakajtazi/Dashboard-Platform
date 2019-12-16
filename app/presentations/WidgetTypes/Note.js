import React, {useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from 'presentations/Card/CardView'
import {TextField} from '@material-ui/core'

const styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    backgroundColor: palette.background.note,
    padding: `${size.spacing * 3}px ${size.spacing * 2}px`,
    marginRight: size.spacing * 2,
    position: 'relative',
    height: props => props.height,
    width: props => props.width
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
})

const Note = (props) => {
  const {classes, content} = props
  const [item, setItem] = useState(content)

  const onValueChanged = (event) => {
    const {name, value} = event.target
    setItem({[name]: value})
  }
  return (
    <Card className={classes.root}>
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