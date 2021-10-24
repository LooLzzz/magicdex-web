/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react'
import { Button, Grid, useMediaQuery } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import Tilt from 'react-parallax-tilt'
import clsx from 'clsx'

import Plane3d from './Plane3d'
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
    transform3dEnabled,
  } = props
  const md = useMediaQuery(theme => theme.breakpoints.down('md'))
  const [flipped, setFlipped] = useState(false)


  /** EFFECTS **/
  useEffect(() => {
    setFlipped(false)
  }, [card])


  /** HANDLERS **/
  const handleRootClick = e => {
    rootProps?.onClick && rootProps.onClick(e)
  }

  const handleTransform = (setValueTo = undefined) => (e) => {
    setFlipped(setValueTo ?? !flipped)
  }


  /** RENDER **/
  return (
    <Grid container direction="column" {...rootProps} onClick={handleRootClick}>
      <Grid item
        className={classes.imageContainer}
        style={{
          transform: flipped && (
            card.is_split
              ? `rotate(90deg) scale(0.85) translateX(-16.25%) translateY(${md ? '0.8%' : '7%'})`
              : card.is_flip
                ? 'rotate(180deg)'
                : ''
          ),
        }}
      >
        <Tilt
          tiltEnable={tiltEnabled ?? false}
          glareEnable={tiltEnabled ?? false}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareBorderRadius='4.75% / 3.5%'
          glarePosition='all'
          glareMaxOpacity={0.13}
          onEnter={card?.is_transform && packTransformButton && handleTransform(true)}
          onLeave={card?.is_transform && packTransformButton && handleTransform(false)}
          {...tiltProps}
        >
          {
            card?.is_transform
              // double faced card
              ? transform3dEnabled
                ? <Plane3d
                  flipped={flipped}
                  imageProps={imageProps}
                  front={props =>
                    <ImageOverlay
                      overlayEnabled={card.foil}
                      baseSrc={card.card_faces[0].image_uris.png}
                      overlaySrc='/foil-overlay.png'
                      overlayProps={{ style: { opacity: 0.65 } }}
                      width={250}
                      height={350}
                      {...props}
                    />
                  }
                  back={props =>
                    <ImageOverlay
                      overlayEnabled={card.foil}
                      baseSrc={card.card_faces[1].image_uris.png}
                      overlaySrc='/foil-overlay.png'
                      overlayProps={{ style: { opacity: 0.65 } }}
                      width={250}
                      height={350}
                      {...props}
                    />
                  }
                />
                : <ImageOverlay
                  overlayEnabled={card?.foil}
                  baseSrc={
                    card
                      ? card.card_faces[flipped ? 1 : 0].image_uris.png
                      : '/cardback.png'
                  }
                  overlaySrc='/foil-overlay.png'
                  overlayProps={{ style: { opacity: 0.65 } }}
                  width={250}
                  height={350}
                  {...imageProps}
                />
              :
              // single faced card
              <ImageOverlay
                overlayEnabled={card?.foil}
                baseSrc={
                  card
                    ? card.image_uris.png
                    : '/cardback.png'
                }
                overlaySrc='/foil-overlay.png'
                overlayProps={{ style: { opacity: 0.65 } }}
                width={250}
                height={350}
                {...imageProps}
              />
          }
          <span
            onClick={packTransformButton && handleTransform()}
            className={clsx(
              classes.dfcSymbol,
              'ms', 'ms-fw', 'ms-cost', 'ms-shadow', 'ms-duo', 'ms-duo-color',
              { 'ms-dfc-modal-face': !flipped },
              { 'ms-dfc-modal-back': flipped },
            )}
            style={{
              display: (packTransformButton && card?.is_transform) ? 'unset' : 'none',
            }}
          />
        </Tilt>
      </Grid>
      {
        (card?.is_transform || card?.is_split || card?.is_flip) && !packTransformButton && (
          <Grid item align='center' className={classes.button}>
            <Button
              className={classes.buttonThridly}
              variant='contained'
              size='small'
              onClick={handleTransform()}
              {...buttonProps}
            >
              {
                (
                  card.is_transform
                    ? 'Transform'
                    : card.is_split
                      ? 'Rotate'
                      : card.is_flip
                        ? 'Flip'
                        : ''
                ) + (flipped ? ' ↪' : ' ↩')
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