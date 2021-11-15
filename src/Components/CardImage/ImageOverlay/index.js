import { useState, useEffect } from 'react'
import { CircularProgress, FormControlLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import clsx from 'clsx'

import useStyles from './styles'


const ImageOverlay = ({
  /** VARS **/
  name = 'Loading..',
  rootProps,
  baseSrc,
  baseProps,
  overlaySrc,
  overlayEnabled,
  overlayProps,
  width,
  height,
  ...props
}) => {
  const {
    classes,
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
            // zIndex: 69, // nice
            width: width,
            height: height,
          }}
        >
          <FormControlLabel
            control={<CircularProgress />}
            labelPlacement={'bottom'}
            label={(
              <span style={{ fontSize: '0.9rem' }}>
                {name}
              </span>
            )}
          />
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