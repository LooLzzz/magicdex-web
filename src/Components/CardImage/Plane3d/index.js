import { withStyles } from '@material-ui/styles'
import clsx from 'clsx'

import useStyles from './styles'


const Plane3d = (props) => {
  /** VARS **/
  const {
    classes,
    flipped,
    front: Front,
    back: Back,
    imageProps,
  } = props


  /** RENDER **/
  return (
    <div
      className={classes.cube}
      style={{
        transform: flipped ? 'rotate3d(0, 1, 0, 180deg)' : '',
        width: imageProps?.width || '250px',
        height: imageProps?.height || '350px',
      }}
    >
      <Front
        className={clsx(classes.face, classes.front)}
        {...imageProps}
      />
      <Back
        className={clsx(classes.face, classes.back)}
        {...imageProps}
      />
    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    Plane3d
  )