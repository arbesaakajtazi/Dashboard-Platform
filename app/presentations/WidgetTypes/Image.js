/**
 * Created by ArbesaKajtazi on 10/11/2019.
 */
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from 'presentations/Card/CardView'

const styles = ({theme, size, palette, shadows, typography, zIndex}) => ({
  root: {
    marginRight: size.spacing * 2
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 'inherit'
  }
})

const Image = (props) => {
  const {classes, content} = props
  return (
    <Card className={classes.root}>
      <img alt={'image'} src={content.url} className={classes.image}/>
    </Card>
  )
}

export default withStyles(styles)(Image)