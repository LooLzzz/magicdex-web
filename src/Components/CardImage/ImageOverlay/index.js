import { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import clsx from 'clsx'

import useStyles from './styles'


const ImageOverlay = (props) => {
  /** VARS **/
  const {
    classes,
    rootProps,
    baseSrc,
    baseProps,
    overlaySrc,
    overlayEnabled,
    overlayProps,
    width,
    height,
    ...rest
  } = props
  const [isLoaded, setLoaded] = useState(false)


  /** EFFECTS **/
  useEffect(() => {
    setLoaded(false)
  }, [baseSrc])


  /** RENDER **/
  return (
    <div
      className={classes.root}
      style={{ width: width, height: height }}
      {...rootProps}
      {...rest}
    >
      {
        !isLoaded &&
        <div
          className={classes.loading}
          style={{
            background: 'url(cardback.png) 0 0 / cover',
            // background: 'linear-gradient(rgba(60,60,60,0.7),rgba(60,60,60,0.7)), url(cardback.png) 0 0 / cover',
            opacity: 0.65,
            backgroundSize: 'cover',
            borderRadius: '4.75% / 3.5%',
            width: width,
            height: height,
          }}
        >
          <CircularProgress />
        </div>
      }

      <img
        width={width}
        height={height}
        src={baseSrc}
        alt='base'
        {...baseProps}
        className={clsx(classes.base, baseProps?.className)}
        onLoad={(e) => setLoaded(true)}
        style={{ display: isLoaded ? '' : 'none' }}
      />

      {
        overlayEnabled &&
        <img
          width={width}
          height={height}
          src={overlaySrc}
          alt='overlay'
          {...overlayProps}
          className={clsx(classes.overlay, overlayProps?.className)}
        />
      }
    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    ImageOverlay
  )