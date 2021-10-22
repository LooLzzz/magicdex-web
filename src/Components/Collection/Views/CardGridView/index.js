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


//TODO: all this


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  // dispatch: {}
})

const CardGridView = (props) => {
  /** VARS **/
  const {
    // classes,
    data,
    // dispatch,
  } = props
  const cardWidth = 209
  const theme = useTheme()

  const containerRef = useRef()
  const [containerWidth,] = useSize(containerRef)
  const [cardsPerRow, setCardsPerRow] = useState(0)
  const [selectedCard, setSelectedCard] = useState({})
  const [collapseRefs, setCollapseRefs] = useState([])

  const [sortedData, setSortedData] = useState([])


  /** EFFECTS **/
  useEffect(() => {
    setSortedData(
      _.sortBy(data, card => card.type_line.replace('Legendary', ''))
    )

    // close the collapse
    setSelectedCard({
      ...selectedCard,
      targetCollapse: undefined,
    })
  }, [data])

  useEffect(() => {
    const n = Math.floor(containerWidth / (cardWidth + 16))

    setCardsPerRow(n)
    setCollapseRefs(
      _.times(Math.floor(data.length / n) + 1, () => createRef())
    )
  }, [containerWidth, cardWidth, data])


  /** HANDLERS **/
  const handleCardClick = ({ card, key }) => (e) => {
    const { data: selectedCardData, targetCollapse } = selectedCard
    const targetCollapseIdx = Math.floor(key / cardsPerRow)

    if (targetCollapse !== undefined && selectedCardData?._id === card._id) {
      // a collapse is open & the same card is clicked -> close the collapse
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
    }

    // DEBUG
    // console.log({
    //   lang: (await getCardPrints(card, 'lang')).map(({ lang }) => lang),
    //   prints: (await getCardPrints(card)).map(({ set }) => set),
    // })
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
                  <CardImage
                    packTransformButton
                    tiltEnabled
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
                    card={card}
                  />
                </Grid>
              }
              {
                (((i + 1) % cardsPerRow === 0) || (i === sortedData.length - 1)) &&
                <Grid item xs={12}>
                  <Collapse //unmountOnExit
                    ref={collapseRefs[targetCollapseIdx]}
                    timeout="auto"
                    in={targetCollapseIdx === selectedCard.targetCollapse}
                    onEntered={() => scrollIntoView(collapseRefs[targetCollapseIdx]?.current, { scrollMode: 'if-needed', behavior: 'smooth', block: 'end' })}
                    onEntering={() => scrollIntoView(collapseRefs[targetCollapseIdx]?.current, { behavior: 'smooth', block: 'start' })}
                  >
                    {
                      selectedCard?.data &&
                      <CardInfo
                        rootComponent={Paper}
                        card={selectedCard.data}
                        rootProps={{
                          elevation: 1,
                        }}
                        topArrowProps={{
                          style: {
                            borderTopColor: theme.palette.background.default,
                            left: `calc(${selectedCard?.box?.left + (selectedCard?.box?.width * 0.5) - containerRef.current.offsetLeft}px - 2.5rem)`,
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