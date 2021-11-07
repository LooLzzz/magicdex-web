/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react'
import { Button, Grid, useMediaQuery, Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import Tilt from 'react-parallax-tilt'
import clsx from 'clsx'

import RenderCell from '@/CardRenders'
import ImageOverlay from './ImageOverlay'
import TransformableCard from './TransformableCard'
import useStyles from './styles'


/** CUSTOM TOOLTIP **/
const MyTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.type === 'dark' ? '#787878' : '#909090',
    fontSize: theme.typography.pxToRem(12.25),
    boxShadow: theme.shadows[2],
  },
  arrow: {
    color: theme.palette.type === 'dark' ? '#787878' : '#909090',
  }
}))(({
  arrow = true,
  enterDelay = 500,
  placement = 'right',
  ...props
}) =>
  <Tooltip placement={placement} arrow={arrow} enterDelay={enterDelay} {...props} />
)


const CardImage = (props) => {
  /** VARS **/
  const {
    classes,
    card,
    width = 250,
    height = 350,
    rootProps,
    imageProps,
    buttonProps,
    tiltProps,
    tiltEnabled = false,
    showPrice = false,
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

      {/** IMAGE PREVIEW **/}
      <Grid item
        className={classes.imageContainer}
        style={{
          transform: flipped && (
            card.is_split
              ? `rotate(90deg) scale(0.825) translateX(-35%) translateY(${md ? '2%' : '7%'})`
              : card.is_flip
                ? 'rotate(180deg)'
                : ''
          ),
        }}
      >
        <Tilt
          tiltEnable={tiltEnabled}
          glareEnable={tiltEnabled}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareBorderRadius='4.75% / 3.5%'
          glarePosition='all'
          glareMaxOpacity={0.13}
          onEnter={(card?.is_transform || card?._isDoublesided) && packTransformButton && handleTransform(true)}
          onLeave={(card?.is_transform || card?._isDoublesided) && packTransformButton && handleTransform(false)}
          {...tiltProps}
        >
          {
            (card?.is_transform || card?._isDoublesided)
              // double faced card
              ? transform3dEnabled
                ? <TransformableCard
                  flipped={flipped}
                  width={width}
                  height={height}
                  card={card}
                  imageProps={imageProps}
                />
                : <ImageOverlay
                  overlayEnabled={card?.foil}
                  baseProps={{ alt: card?.name }}
                  baseSrc={
                    card
                      ? card.card_faces[flipped ? 1 : 0].image_uris?.png ?? card.card_faces[flipped ? 1 : 0].image_uris?.large ?? card.card_faces[flipped ? 1 : 0].image_uris?.normal
                      : '/cardback.png'
                  }
                  overlaySrc='/foil-overlay.png'
                  overlayProps={{ style: { opacity: 0.65 } }}
                  width={width}
                  height={height}
                  {...imageProps}
                />
              :
              // single faced card
              <ImageOverlay
                overlayEnabled={card?.foil}
                baseProps={{ alt: card?.name }}
                baseSrc={
                  card
                    ? card.image_uris?.png ?? card.image_uris?.large ?? card.image_uris?.normal
                    : '/cardback.png'
                }
                overlaySrc='/foil-overlay.png'
                overlayProps={{ style: { opacity: 0.65 } }}
                width={width}
                height={height}
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
              display: (packTransformButton && (card?.is_transform || card?._isDoublesided)) ? 'unset' : 'none',
            }}
          />
        </Tilt>
      </Grid>

      {/** PRICE **/}
      {
        showPrice &&
        <Grid item align='center' className={classes.priceContainer}>
          {
            card.price > 0
              ? card.amount > 1
                ? [
                  <MyTooltip key='one' title='Price for x1' placement='left'>
                    <span>
                      <RenderCell
                        card={card}
                        columnName='price'
                      />
                    </span>
                  </MyTooltip>,
                  ' / ',
                  <MyTooltip key='multiple' title={`Price for x${card.amount}`}>
                    <span>
                      <RenderCell
                        card={card}
                        columnName='total_price'
                      />
                    </span>
                  </MyTooltip>,
                ]
                : <MyTooltip title='Price for x1'>
                  <span>
                    <RenderCell
                      card={card}
                      columnName='price'
                    />
                  </span>
                </MyTooltip>
              : <MyTooltip title='No Price Available'>
                <span>
                  {'-'}
                </span>
              </MyTooltip>
          }
        </Grid>
      }

      {/** TRANSFORM BUTTON **/}
      {
        ((card?.is_transform || card?._isDoublesided) || card?.is_split || card?.is_flip) && !packTransformButton && (
          <Grid item align='center' className={classes.buttonContainer}>
            <Button
              className={classes.buttonThridly}
              variant='contained'
              size='small'
              onClick={handleTransform()}
              {...buttonProps}
            >
              {
                (
                  (card?.is_transform || card?._isDoublesided)
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