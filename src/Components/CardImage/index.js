/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react'
import { Button, Grid } from '@material-ui/core'
import Tilt from 'react-parallax-tilt'
// import { withStyles } from '@material-ui/styles'

import { ImageOverlay } from '@/Components'
// import useStyles from './styles'


const CardImage = (props) => {
  /** VARS **/
  const [flipped, setFlipped] = useState(false)
  const {
    // classes,
    card,
    imageProps,
    buttonProps,
    tiltEnabled,
  } = props


  /** EFFECTS **/
  useEffect(() => {
    setFlipped(false)
  }, [card])


  /** HANDLERS **/
  const handleTransform = e => {
    setFlipped(!flipped)
  }

  /** RENDER **/
  return (
    <Grid container direction="column">
      <Grid item>
        <Tilt
          tiltEnable={tiltEnabled ?? false}
          glareEnable={tiltEnabled ?? false}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareBorderRadius={'4.75% / 3.5%'}
          glarePosition='all'
          // glareColor='#E1D6AA'
          // glareColor='#F4F3A8'
          glareMaxOpacity={0.35}
        >
          <ImageOverlay
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
        </Tilt>
      </Grid>
      {
        card?.card_faces && card?.card_faces.length > 1 &&
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
    </Grid>
  )
}

/** EXPORT **/
export default
  // withStyles(useStyles)(
  CardImage
  // )