/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { Fragment, useEffect, useState, useRef, createRef } from 'react'
import { Paper, Grid, Collapse } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
import scrollIntoView from 'scroll-into-view-if-needed'
import useSize from '@react-hook/size'
import _ from 'lodash'

import { CardImage } from '@/Components'
// import { getCardPrints } from '@/Api'
import CardInfo from '../CardInfo'
import useStyles from './styles'


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  // dispatch: {}
})

const CardGridView = (props) => {
  /** VARS **/
  const {
    // classes,
    data,
    tiltEnabled,
    transform3dEnabled,
    // dispatch,
  } = props
  const cardWidth = 209
  const theme = useTheme()

  const containerRef = useRef()
  const [containerWidth,] = useSize(containerRef)
  const [cardsPerRow, setCardsPerRow] = useState(0)
  const [selectedCard, setSelectedCard] = useState({})
  const [refs, setRefs] = useState([])

  const [sortedData, setSortedData] = useState([])


  /** EFFECTS **/
  useEffect(() => {
    setSortedData(
      _.sortBy(data, card => card.type_line.replace('Legendary', ''))
    )

    setSelectedCard(selectedCard => {
      const newCard = data.find(card => card._id === selectedCard?.data?._id)

      return newCard
        ? {
          ...selectedCard,
          data: newCard,
        }
        : {
          data: undefined,
          targetCollapse: undefined,
          box: undefined,
        }
    })
  }, [data])

  useEffect(() => {
    const n = Math.floor(containerWidth / (cardWidth + 16))

    setCardsPerRow(cardsPerRow => {
      if (cardsPerRow !== n) {
        //close the collapse
        setSelectedCard(selectedCard => ({
          ...selectedCard,
          targetCollapse: undefined,
        }))
        return n
      }
      return cardsPerRow
    })
    setRefs(
      _.times(
        Math.floor(data.length / n) + 1,
        () => ({
          collapse: createRef(),
          cardInfo: createRef()
        })
      )
    )

  }, [containerWidth, cardWidth, data])


  /** HANDLERS **/
  const handleCardClick = ({ card, key }) => (e) => {
    const { data: selectedCardData, targetCollapse } = selectedCard
    const targetCollapseIdx = Math.floor(key / cardsPerRow)

    if (targetCollapse !== undefined && selectedCardData?._id === card._id) {
      // a collapse is open & the same card is clicked ->
      //                                               -> close the collapse
      setSelectedCard({
        ...selectedCard,
        targetCollapse: undefined,
        box: e.currentTarget.getBoundingClientRect(),
      })
    }
    else {
      // a new card is clicked, open the collapse
      setSelectedCard({
        data: card,
        targetCollapse: targetCollapseIdx,
        box: e.currentTarget.getBoundingClientRect(),
      })
      
      setTimeout(() => {
        refs[targetCollapseIdx]?.cardInfo?.current?.setViewIndex(0)
        refs[targetCollapseIdx]?.cardInfo?.current?.updateHeight()
        // refs[targetCollapseIdx].cardInfo?.current?.swipeableViewsRef
      }, 10)
    }
  }


  /** RENDER **/
  return (
    <Grid item container ref={containerRef} xs={12} lg={10} spacing={2} justifyContent='center'>
      {
        sortedData && sortedData.map((card, i) => {
          const targetCollapseIdx = Math.floor(i / cardsPerRow)

          return (
            <Fragment key={i}>
              {
                card &&
                <Grid item xs='auto'>
                  <CardImage packTransformButton
                    transform3dEnabled={transform3dEnabled}
                    tiltEnabled={tiltEnabled}
                    card={card}
                    width={cardWidth}
                    height={cardWidth * 1.4}
                    tiltProps={{
                      tiltMaxAngleX: 12.5,
                      tiltMaxAngleY: 12.5,
                    }}
                    imageProps={{
                      width: cardWidth,
                      height: cardWidth * 1.4,
                    }}
                    rootProps={{
                      className: 'cursor-pointer',
                      onClick: handleCardClick({ card, key: i }),
                    }}
                  />
                </Grid>
              }
              {
                (((i + 1) % cardsPerRow === 0) || (i === sortedData.length - 1)) &&
                <Grid item xs={12}>
                  <Collapse mountOnEnter
                    ref={refs[targetCollapseIdx]?.collapse}
                    timeout="auto"
                    in={targetCollapseIdx === selectedCard.targetCollapse}
                    onEntering={() => scrollIntoView(refs[targetCollapseIdx]?.collapse?.current, { scrollMode: 'if-needed', behavior: 'smooth', block: 'start' })}
                    onEntered={() => scrollIntoView(refs[targetCollapseIdx]?.collapse?.current, { scrollMode: 'if-needed', behavior: 'smooth', block: 'end' })}
                  >
                    {
                      selectedCard?.data &&
                      <CardInfo
                        refs={refs[targetCollapseIdx]?.cardInfo}
                        card={selectedCard.data}
                        rootComponent={Paper}
                        rootProps={{
                          elevation: 1,
                        }}
                        topArrowProps={{
                          style: {
                            borderTopColor: theme.palette.background.default,
                            left: `calc(${selectedCard?.box?.left + (selectedCard?.box?.width * 0.5) - containerRef?.current?.offsetLeft}px - 2.25rem)`,
                          },
                        }}
                      />
                    }
                  </Collapse>
                </Grid>
              }
            </Fragment>
          )
        })
      }
    </Grid>

  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardGridView
    )
  )