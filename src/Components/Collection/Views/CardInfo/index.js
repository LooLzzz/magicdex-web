/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useRef, useImperativeHandle } from 'react'
import { IconButton, Grid, Paper, Hidden, Divider, useMediaQuery } from '@material-ui/core'
import { ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'
import SwipeableViews from 'react-swipeable-views'

// import { xs, sm, md, lg, xl } from '@/Config'
import { CardImage } from '@/Components'
import { addCardPrice, addLayoutKeywords } from '@/Providers'
import FieldsPanel from './FieldsPanel'
import EditPanel from './EditPanel'
import useStyles from './styles'


const CardInfo = (props) => {
  /** VARS **/
  const {
    classes,
    refs,
    card,
    rootComponent,
    rootProps,
    topArrowProps,
    transform3dEnabled = true,
  } = props
  const swipeableViewsRef = useRef()
  // const xsDown = useMediaQuery(theme => theme.breakpoints.down('xm'))
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'))
  // const lgDown = useMediaQuery(theme => theme.breakpoints.down('lg'))
  // const xlDown = useMediaQuery(theme => theme.breakpoints.down('xl'))
  const [currentViewIndex, setCurrentViewIndex] = useState(0)
  const [menuHoverItem, setMenuHoverItem] = useState()


  /** EFFECTS **/
  useImperativeHandle(refs, () => ({
    setViewIndex: index => { setCurrentViewIndex(index) },
    updateHeight: swipeableViewsRef.current?.updateHeight || (() => { }),
  }))

  // useEffect(() => {
  //   // onMount
  //   const params = new URLSearchParams(location.search)
  //   params.set('card_id', card._id)
  //   history.push({
  //     search: params.toString()
  //   })

  //   // onUnmount
  //   return () => {
  //     const params = new URLSearchParams(location.search)
  //     params.delete('card_id')
  //     history.push({
  //       search: params.toString()
  //     })
  //   }
  // }, [card])


  /** HANDLERS **/
  const handleViewIndexChange = value => e => {
    setCurrentViewIndex(value)
  }

  const onMenuHover = hoverItem => {
    if (hoverItem) {
      // hoverItem.foil = card.foil
      hoverItem = addCardPrice(hoverItem, card.currency)
      hoverItem = addLayoutKeywords(hoverItem)
      setMenuHoverItem(hoverItem)
    }
    else
      setMenuHoverItem(null)
  }


  /** RENDER **/
  return (
    <div className={classes.baseContainer}>
      <div
        className={classes.topArrow}
        {...topArrowProps}
      />

      <Grid container
        justifyContent='center'
        alignItems={smDown ? 'center' : 'flex-start'}
        direction={smDown ? 'column' : 'row'}
        component={rootComponent}
        wrap='nowrap'
        className={classes.root}
        {...rootProps}
      >

        {/* CARD PREVIEW */}
        <Hidden smDown>
          <Grid item className={classes.image}>
            <CardImage
              showPrice
              tiltEnabled
              transform3dEnabled={transform3dEnabled}
              card={menuHoverItem || card}
            />
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item style={{ marginBottom: 16 }}>
            <CardImage
              showPrice
              tiltEnabled
              transform3dEnabled={transform3dEnabled}
              card={menuHoverItem || card}
            />
          </Grid>
        </Hidden>

        <Grid item xs={12} md={9} lg={8} xl={7}
          align='center'
          component={Paper}
          elevation={3}
          className={classes.content}
        >
          <SwipeableViews ignoreNativeScroll
            ref={swipeableViewsRef}
            animateHeight
            index={currentViewIndex}
            onChangeIndex={index => handleViewIndexChange(index)}
            slideStyle={{ overflow: 'hidden' }}
          >

            {/* VIEW 1 */}
            <Grid container justifyContent='center' alignItems='center' wrap='nowrap' style={{ padding: 1.5 }}>
              <Grid item xs={12}>
                {
                  card.is_transform || card.is_split || card.is_flip
                    ?
                    <Grid item container justifyContent='center' alignItems='stretch' spacing={mdDown ? 0 : 2}>
                      {/* Front Face */}
                      <Grid item container justifyContent='center' xs={12} sm={11} lg>
                        <FieldsPanel
                          card={card}
                          cardFace={0}
                        />
                      </Grid>

                      <Hidden lgUp>
                        <Grid container wrap='nowrap' alignItems='center' style={{ alignSelf: 'center' }}>
                          <Grid item xs component={Divider} style={{ marginBottom: 8 }} />
                        </Grid>
                      </Hidden>
                      <Hidden mdDown>
                        <Divider flexItem orientation='vertical' />
                      </Hidden>

                      {/* Back Face */}
                      <Grid item container justifyContent='center' xs={12} sm={11} lg>
                        <FieldsPanel
                          card={card}
                          cardFace={1}
                        />
                      </Grid>
                    </Grid>

                    : /* Single faced card */
                    <Grid item container justifyContent='center' xs={12} md={10} lg={9} xl={8}>
                      <FieldsPanel
                        card={card}
                      />
                    </Grid>
                }
              </Grid>

              <Grid item style={{ alignSelf: 'flex-start' }}>
                <IconButton size='small' onClick={handleViewIndexChange(1)}>
                  <ChevronRightIcon />
                </IconButton>
              </Grid>
            </Grid>

            {/* VIEW 2 */}
            <Grid container justifyContent='center' alignItems='center' wrap='nowrap' style={{ padding: 1.5 }}>
              <Grid item style={{ alignSelf: 'flex-start' }}>
                <IconButton size='small' onClick={handleViewIndexChange(0)}>
                  <ChevronLeftIcon />
                </IconButton>
              </Grid>

              <Grid item container xs>
                <EditPanel
                  card={card}
                  updateHeight={swipeableViewsRef.current?.updateHeight}
                  onMenuHover={onMenuHover}
                />
              </Grid>

            </Grid>

          </SwipeableViews>
        </Grid>

      </Grid>
    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    CardInfo
  )
