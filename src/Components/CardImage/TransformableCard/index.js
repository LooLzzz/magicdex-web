import { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'
import clsx from 'clsx'

import ImageOverlay from '../ImageOverlay'
import useStyles from './styles'


const TransformableCard = (props) => {
  /** VARS **/
  const {
    classes,
    card,
    flipped: _flipped,
    width,
    height,
    imageProps,
  } = props
  const [flipped, setFlipped] = useState(_flipped)
  const [scaleX, setScaleX] = useState('1')


  /** EFFECTS **/
  useEffect(() => {
    setScaleX(_flipped ? '-1' : '1')

    setTimeout(() => {
      setFlipped(_flipped)
    }, 150)

  }, [_flipped])


  /** RENDER **/
  return (
    <div
      className={classes.root}
      style={{
        width: width || '250px',
        height: height || '350px',
        transform: `scaleX(${scaleX})`,
      }}
    >

      <div className={clsx(classes.face, classes.front)} style={{ display: flipped ? 'none' : 'unset' }}>
        <ImageOverlay
          overlayEnabled={card.foil}
          baseProps={{ alt: card?.name }}
          baseSrc={card.card_faces[0].image_uris.png}
          overlaySrc='/foil-overlay.png'
          overlayProps={{ style: { opacity: 0.65 } }}
          width={250}
          height={350}
          {...imageProps}
        />
      </div>

      <div className={clsx(classes.face, classes.back)} style={{ display: !flipped ? 'none' : 'unset' }}>
        <ImageOverlay
          overlayEnabled={card.foil}
          baseProps={{ alt: card?.name }}
          baseSrc={card.card_faces[1].image_uris.png}
          overlaySrc='/foil-overlay.png'
          overlayProps={{ style: { opacity: 0.65 } }}
          width={250}
          height={350}
          {...imageProps}
        />
      </div>

    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    TransformableCard
  )