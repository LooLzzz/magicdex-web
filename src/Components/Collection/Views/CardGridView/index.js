/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment, useEffect, useState, useRef, createRef } from 'react'
import { Portal, MenuItem, ListItemText, Paper, Grid, Collapse } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
// import scrollIntoView from 'scroll-into-view-if-needed'
import useSize from '@react-hook/size'
import _ from 'lodash'

import {
  addSelectedCardIds, removeSelectedCardIds, setViewIndex_CardInfo,
  toggleTiltEnabled_GridView, toggleTransform3dEnabled_GridView
} from '@/Logic/redux'
import { CardImage } from '@/Components'
import CardInfo from '../CardInfo'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  tiltEnabled: state.actions.app.collection.gridView.tiltEnabled,
  transform3dEnabled: state.actions.app.collection.gridView.transform3dEnabled,
  // cardsSelectableEnabled: state.actions.app.collection.cardsSelectableEnabled,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    toggleTiltEnabled: () => dispatch(toggleTiltEnabled_GridView()),
    toggleTransform3dEnabled: () => dispatch(toggleTransform3dEnabled_GridView()),
    addSelectedCardIds: (payload) => dispatch(addSelectedCardIds(payload)),
    removeSelectedCardIds: (payload) => dispatch(removeSelectedCardIds(payload)),
    setViewIndex: (index) => dispatch(setViewIndex_CardInfo({ index })),
  }
})


// TODO: add context menu support for this component


const CardGridView = (props) => {
  /** VARS **/
  const {
    // classes,
    dispatch,
    data,
    menuItemRef,
    tiltEnabled,
    transform3dEnabled,
    cardWidth = 209,
  } = props
  const theme = useTheme()

  const containerRef = useRef()
  const [containerWidth,] = useSize(containerRef)
  const [cardsPerRow, setCardsPerRow] = useState()
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
    let n = Math.floor(containerWidth / (cardWidth + 16))
    n = n > 0 ? n : 1
    setCardsPerRow(n)

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
    const targetCollapseIdx = Math.floor(key / cardsPerRow) || 0

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
        dispatch.setViewIndex(0)
        refs[targetCollapseIdx]?.cardInfo?.current?.updateHeight()
      }, 10)
    }
  }


  /** RENDER **/
  return (
    <>
      {
        <Portal container={menuItemRef.current}>
          <MenuItem onClick={dispatch.toggleTiltEnabled}>
            <ListItemText
              primary='Card Tilt'
              secondary={tiltEnabled ? 'Enabled' : 'Disabled'}
            />
          </MenuItem>
          <MenuItem onClick={dispatch.toggleTransform3dEnabled}>
            <ListItemText
              primary='3D Transform'
              secondary={transform3dEnabled ? 'Enabled' : 'Disabled'}
            />
          </MenuItem>
        </Portal>
      }

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
                    <Collapse mountOnEnter unmountOnExit
                      ref={refs[targetCollapseIdx]?.collapse}
                      timeout="auto"
                      in={targetCollapseIdx === selectedCard.targetCollapse}
                    // onEntering={() => scrollIntoView(refs[targetCollapseIdx]?.collapse?.current, { scrollMode: 'if-needed', behavior: 'smooth', block: 'start' })}
                    // onEntered={() => scrollIntoView(refs[targetCollapseIdx]?.collapse?.current, { scrollMode: 'if-needed', behavior: 'smooth', block: 'end' })}
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
    </>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardGridView
    )
  )