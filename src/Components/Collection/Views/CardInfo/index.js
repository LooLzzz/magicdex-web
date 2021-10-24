/* eslint-disable no-lone-blocks */

import { Box, Grid, Paper, Hidden, Divider, Typography } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'

import { updateCurrentCollection } from '@/Logic/redux'
import { CardImage } from '@/Components'
import renderCell from '@/CardRenders'
import useStyles from './styles'


/** UTILS **/
const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    updateCurrentCollection: (collection) => dispatch(updateCurrentCollection(collection)),
  }
})

const renderGameFields = ({ card, renderStyle = 'content', ...rest }) => {
  let [name, manaCost, typeLine, set, oracleText, flavorText, artist, collectorNumber, powerToughness] = [
    renderCell({ card, columnName: 'name', renderStyle, ...rest }),
    renderCell({ card, columnName: 'mana_cost', renderStyle, ...rest }),
    renderCell({ card, columnName: 'type_line', renderStyle, ...rest }),
    renderCell({ card, columnName: 'set', renderStyle, ...rest }),
    renderCell({ card, columnName: 'oracle_text', renderStyle, ...rest }),
    renderCell({ card, columnName: 'flavor_text', renderStyle, ...rest }),
    renderCell({ card, columnName: 'artist', renderStyle, ...rest }),
    renderCell({ card, columnName: 'collector_number', renderStyle, ...rest }),
    renderCell({ card, columnName: 'power_toughness', renderStyle, ...rest }),
  ]

  return (
    <Grid item container justifyContent='center' direction='column'>
      <Grid item container justifyContent='center' spacing={2}>
        <Grid item name='name'>
          {name}
        </Grid>
        {manaCost && <Grid item name='mana-cost'>
          {manaCost}
        </Grid>}
      </Grid>
      <Grid item container component={Box} justifyContent='center' spacing={1} flexGrow={1}>
        <Grid item name='type-line'>
          {typeLine}
        </Grid>
        <Grid item name='set'>
          {set}
        </Grid>
      </Grid>
      {oracleText && <Grid item name='oracle-text' component={Box} paddingTop={1} flexGrow={1}>
        {oracleText}
      </Grid>}
      {flavorText && <Grid item name='flavor-text' component={Box} align='left' flexGrow={1} paddingTop='0.45em'>
        {flavorText}
      </Grid>}
      <Grid item container justifyContent='space-between' alignItems='baseline' wrap='nowrap' component={Typography} variant='overline' style={{ marginTop: '0.3em' }}>
        <Grid item container spacing={1}>
          <Grid item name='collector-number'>
            #{collectorNumber}
          </Grid>
          <Grid item name='artist'>
            <span className='ms ms-shadow ms-artist-nib' />{artist}
          </Grid>
        </Grid>
        {powerToughness && <Grid item name='power-toughness'>
          {powerToughness}
        </Grid>}
      </Grid>
    </Grid>
  )
}


const CardInfo = (props) => {
  /** VARS **/
  const {
    classes,
    // dispatch,
    card,
    rootComponent,
    rootProps,
    topArrowProps,
    transform3dEnabled = true,
  } = props
  const theme = useTheme()


  /** EFFECTS **/
  { }


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <div style={{ position: 'relative' }}>
      <div
        className={classes.topArrow}
        {...topArrowProps}
      />

      <Grid container justifyContent='center' alignItems='flex-start'
        component={rootComponent}
        wrap='nowrap'
        className={classes.root}
        {...rootProps}
      >

        {/* CARD PREVIEW */}
        <Hidden smDown>
          <Grid item className={classes.image}>
            <CardImage
              transform3dEnabled={transform3dEnabled}
              card={card}
            />
          </Grid>
        </Hidden>

        {/* CARD INFO */}
        <Grid item container xs={12} md={10} lg={8} xl={6} justifyContent='center' align='center' spacing={card.is_transform || card.is_split ? 2 : 1} component={Paper} elevation={3} className={classes.content}>
          {
            card.is_transform || card.is_split || card.is_flip
              ?
              <>
                {/* Front Face */}
                <Grid item container justifyContent='center' xs={12} sm={11} lg={true}>
                  {renderGameFields({ card, theme, cardFace: 0 })}
                </Grid>

                <Hidden lgUp>
                  <Divider style={{ width: '100%' }} />
                </Hidden>
                <Hidden mdDown>
                  <Divider flexItem orientation='vertical' />
                </Hidden>

                {/* Back Face */}
                <Grid item container justifyContent='center' xs={12} sm={11} lg={true}>
                  {renderGameFields({ card, theme, cardFace: 1 })}
                </Grid>
              </>

              : /* Single faced card */
              <Grid item container justifyContent='center' xs={12} md={10} lg={9} xl={8}>
                {renderGameFields({ card, theme })}
              </Grid>
          }

          <Divider variant='middle' style={{ width: '100%' }} />

          {/* EDITABLE FIELDS */}
          {/* TODO: render editable files & add edit button functionality */}
          <Grid item container justifyContent='center' direction='column' xs={12}>
            <Grid item>
              {renderCell({ card, columnName: 'tag', renderStyle: 'content' })}
            </Grid>
            <Grid item>
              {renderCell({ card, columnName: 'price', renderStyle: 'content' })}
            </Grid>
            <Grid item>
              TBA
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardInfo
    )
  )