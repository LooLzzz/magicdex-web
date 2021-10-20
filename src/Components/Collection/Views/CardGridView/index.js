/* eslint-disable no-lone-blocks */

import { Fragment, useEffect, useState, useRef } from 'react'
import { Paper, Grid, Collapse } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
import useSize from '@react-hook/size'
import _ from 'lodash'

import { CardImage } from '@/Components'
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
    classes,
    data,
    // dispatch,
  } = props
  const cardWidth = 209
  const theme = useTheme()

  const containerRef = useRef()
  const [containerWidth, containerHeight] = useSize(containerRef)
  const [cardsPerRow, setCardsPerRow] = useState(0)
  const [selectedCard, setSelectedCard] = useState({})

  const [sortedData, setSortedData] = useState([])


  /** EFFECTS **/
  useEffect(() => {
    setSortedData(
      _.sortBy(data, card => card.type_line.replace('Legendary', ''))
    )
  }, [data])

  useEffect(() => {
    setCardsPerRow(
      Math.floor(containerWidth / (cardWidth + 16))
    )
  }, [containerWidth, cardWidth])


  /** HANDLERS **/
  const handleCardClick = ({ card, key }) => (e) => {
    const { data: selectedCardData, targetCollapse } = selectedCard

    if (targetCollapse !== undefined && selectedCardData?._id === card._id) {
      // a collapse is open & the same card is clicked -> close the collapse
      setSelectedCard({
        ...selectedCard,
        targetCollapse: undefined,
      })
    }
    else {
      // a new card is clicked, open the collapse
      setSelectedCard({
        data: card,
        targetCollapse: Math.floor(key / cardsPerRow),
        box: e.currentTarget.getBoundingClientRect(),
      })
    }
  }


  /** RENDER **/
  return (
    <Grid item container ref={containerRef} xs={12} lg={10} spacing={2} justifyContent='center'>
      {
        sortedData && sortedData.map((card, i) =>
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
                    onClick: handleCardClick({ card, key: i }),
                  }}
                  card={card}
                />
              </Grid>
            }
            {
              (((i + 1) % cardsPerRow === 0) || (i === sortedData.length - 1)) &&
              <Grid item xs={12}>
                <Collapse unmountOnExit
                  timeout="auto"
                  in={Math.floor(i / cardsPerRow) === selectedCard.targetCollapse}
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