import { useState, useRef, useImperativeHandle } from 'react'
import { IconButton, Grid, Paper, Hidden, Divider, useMediaQuery } from '@material-ui/core'
import { ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'
import SwipeableViews from 'react-swipeable-views'

import { CardImage } from '@/Components'
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
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'))
  const [currentViewIndex, setCurrentViewIndex] = useState(0)


  /** EFFECTS **/
  useImperativeHandle(refs, () => ({
    setViewIndex: index => { setCurrentViewIndex(index) },
    updateHeight: swipeableViewsRef.current?.updateHeight || (() => { }),
  }))

  // useEffect(() => {
  //   // onMount
  //   swipeableViewsRef?.current?.updateHeight()
  // }, [])


  /** HANDLERS **/
  const handleViewIndexChange = value => e => {
    setCurrentViewIndex(value)
  }


  /** RENDER **/
  return (
    <div style={{ position: 'relative' }}>
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
              tiltEnabled
              transform3dEnabled={transform3dEnabled}
              card={card}
            />
          </Grid>
        </Hidden>
        <Hidden mdUp xsDown>
          <Grid item style={{ marginBottom: 16 }}>
            <CardImage
              tiltEnabled
              transform3dEnabled={transform3dEnabled}
              card={card}
            />
          </Grid>
        </Hidden>

        <Grid item xs={12} md={10} lg={8} xl={6}
          align='center'
          component={Paper}
          elevation={3}
          className={classes.content}
        >
          <SwipeableViews
            ref={swipeableViewsRef}
            animateHeight
            index={currentViewIndex}
            onChangeIndex={index => handleViewIndexChange(index)}
            slideStyle={{ overflow: 'hidden' }}
          >

            {/* VIEW 1 */}
            <Grid container justifyContent='center' alignItems='center' wrap='nowrap' style={{ paddingRight: 1 }}>
              {
                card.is_transform || card.is_split || card.is_flip
                  ?
                  <Grid item container justifyContent='center' alignItems='stretch' spacing={mdDown ? 0 : 2}>
                    {/* Front Face */}
                    <Grid item container justifyContent='center' xs={12} sm={11} lg style={{ marginLeft: 1 }}>
                      <FieldsPanel
                        card={card}
                        cardFace={0}
                      />
                    </Grid>

                    <Hidden lgUp>
                      <Grid container wrap='nowrap' alignItems='center' style={{ alignSelf: 'center' }}>
                        <Grid item xs component={Divider} />
                        <Grid item style={{ paddingLeft: 4 }}>
                          <IconButton size='small' onClick={handleViewIndexChange(1)}>
                            <ChevronRightIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Hidden>
                    <Hidden mdDown>
                      <Divider flexItem orientation='vertical' />
                    </Hidden>

                    {/* Back Face */}
                    <Grid item container justifyContent='center' xs={12} sm={11} lg style={{ marginLeft: 1 }}>
                      <FieldsPanel
                        card={card}
                        cardFace={1}
                      />
                    </Grid>

                    <Hidden mdDown>
                      <Grid item style={{ alignSelf: 'center', paddingLeft: 0 }}>
                        <IconButton size='small' onClick={handleViewIndexChange(1)}>
                          <ChevronRightIcon />
                        </IconButton>
                      </Grid>
                    </Hidden>
                  </Grid>

                  : /* Single faced card */
                  <>
                    <Grid item style={{ marginRight: 'auto' }} />
                    <Grid item container justifyContent='center' xs={12} md={10} lg={9} xl={8}>
                      <FieldsPanel
                        card={card}
                      />
                    </Grid>
                    <Grid item style={{ marginLeft: 'auto' }}>
                      <IconButton size='small' onClick={handleViewIndexChange(1)}>
                        <ChevronRightIcon />
                      </IconButton>
                    </Grid>
                  </>
              }
            </Grid>

            {/* VIEW 2 */}
            <Grid container justifyContent='center' alignItems='center' wrap='nowrap'>
              <Grid item>
                <IconButton size='small' onClick={handleViewIndexChange(0)}>
                  <ChevronLeftIcon />
                </IconButton>
              </Grid>

              <Grid item container xs>
                <EditPanel
                  card={card}
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
