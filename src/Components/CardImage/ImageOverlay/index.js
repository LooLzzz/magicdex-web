/* eslint-disable no-lone-blocks */

import { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/styles'
import clsx from 'clsx'

import useStyles from './styles'


const ImageOverlay = (props) => {
  /** VARS **/
  const {
    classes,
    baseSrc,
    baseProps,
    overlaySrc,
    overlayEnabled,
    overlayProps,
    width,
    height,
    ...rest
  } = props
  const [_baseSrc, setBase] = useState()
  const [_overlaySrc, setOverlay] = useState()


  /** EFFECTS **/
  useEffect(() => {
    if (baseSrc && baseSrc !== '')
      setBase(baseSrc)

    if (overlaySrc && overlaySrc !== '')
      setOverlay(overlaySrc)
  }, [baseSrc, overlaySrc])


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <div
      className={classes.root}
      style={{ width: width, height: height }}
      {...rest}
    >
      <img
        width={width}
        height={height}
        src={_baseSrc}
        alt='base'
        {...baseProps}
        className={clsx(classes.base, baseProps?.className)}
      />
      {
        overlayEnabled
        && <img
          width={width}
          height={height}
          src={_overlaySrc}
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