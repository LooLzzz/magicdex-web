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
    imageProps,
    buttonProps,
    tiltProps,
    tiltEnabled,
    packTransformButton,
  } = props
  const [flipped, setFlipped] = useState(false)
  const [isDfc, setIsDfc] = useState(false)


  /** EFFECTS **/
  useEffect(() => {
    setFlipped(false)
    setIsDfc(card?.card_faces && card?.card_faces.length > 1)
  }, [card])


  /** HANDLERS **/
  const handleTransform = e => {
    setFlipped(!flipped)
  }


  /** RENDER **/
  return (
    <Grid container direction="column">
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
            onClick={packTransformButton && handleTransform}
            overlayEnabled={card?.foil}
            baseSrc={
              card
                ? card?.card_faces && card?.card_faces.length > 1
                  ? card?.card_faces[flipped ? 1 : 0].image_uris.png
                  : card?.image_uris.png
                : '/cardback.png'
            }
            overlaySrc='/foil-overlay.png'
            overlayProps={{ style: { opacity: 0.65 } }}
            width={250}
            height={350}
            {...imageProps}
          />
          <span
            style={{
              display: isDfc ? 'unset' : 'none',
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
        !packTransformButton && isDfc &&
        <Grid item align='center' style={{ marginTop: 8 }}>
          <Button
            classes={{ root: 'buttonThridly-root' }}
            variant='contained'
            // color='primary'
            // color='thridly'
            size='small'
            onClick={handleTransform}
            {...buttonProps}
          >
            Transform
          </Button>
        </Grid>
      }
    </Grid >
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    CardImage
  )