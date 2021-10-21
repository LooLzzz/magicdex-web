/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react'
import { Button, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import Tilt from 'react-parallax-tilt'
import clsx from 'clsx'

import ImageOverlay from './ImageOverlay'
import useStyles from './styles'


const CardImage = (props) => {
  /** VARS **/
  const {
    classes,
    card,
    rootProps,
    imageProps,
    buttonProps,
    tiltProps,
    tiltEnabled,
    packTransformButton,
  } = props
  const [flipped, setFlipped] = useState(false)


  /** EFFECTS **/
  useEffect(() => {
    setFlipped(false)
  }, [card])


  /** HANDLERS **/
  const handleRootClick = e => {
    rootProps?.onClick && rootProps.onClick(e)

    // e.preventDefault()
    // e.stopPropagation()
  }

  const handleTransform = e => {
    setFlipped(!flipped)
  }


  /** RENDER **/
  return (
    <Grid container direction="column" {...rootProps} onClick={handleRootClick}>
      <Grid item className={classes.imageContainer}>
        <Tilt
          tiltEnable={tiltEnabled ?? false}
          glareEnable={tiltEnabled ?? false}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareBorderRadius={'4.75% / 3.5%'}
          glarePosition='all'
          // glareColor='#E1D6AA'
          // glareColor='#F4F3A8'
          // glareMaxOpacity={0.35}
          glareMaxOpacity={0.13}
          onEnter={packTransformButton ? () => setFlipped(true) : null}
          onLeave={packTransformButton ? () => setFlipped(false) : null}
          {...tiltProps}
        >
          <ImageOverlay
            overlayEnabled={card?.foil}
            baseSrc={
              card
                ? card.is_transform
                  ? card.card_faces[flipped ? 1 : 0].image_uris.png
                  : card.image_uris.png
                : '/cardback.png'
            }
            overlaySrc='/foil-overlay.png'
            overlayProps={{ style: { opacity: 0.65 } }}
            width={250}
            height={350}
            {...imageProps}
          />
          <span
            onClick={packTransformButton && handleTransform}
            style={{
              display: packTransformButton && card?.is_transform ? 'unset' : 'none',
              fontSize: '1.5em'
            }}
            className={clsx(
              classes.dfcSymbol,
              'ms', 'ms-fw', 'ms-cost', 'ms-shadow', 'ms-duo', 'ms-duo-color',
              { 'ms-dfc-modal-face': !flipped },
              { 'ms-dfc-modal-back': flipped },
            )}
          />
        </Tilt>
      </Grid>
      {
        card?.is_transform && !packTransformButton && (
          <Grid item align='center' className={classes.button}>
            <Button
              // classes={{ root: 'buttonThridly-root' }}
              className={classes.buttonThridly}
              variant='contained'
              // color='primary'
              // color='thridly'
              size='small'
              onClick={handleTransform}
              {...buttonProps}
            >
              {
                'Transform' + (flipped ? ' ↪' : ' ↩')
              }
            </Button>
          </Grid>
        )
      }
    </Grid >
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    CardImage
  )