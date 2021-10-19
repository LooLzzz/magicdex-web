/* eslint-disable no-lone-blocks */

import { Box, Grid, Paper, Hidden, Divider } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
import clsx from 'clsx'

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
  const [name, manaCost, typeLine, set, oracleText, flavorText, powerToughness] = [
    renderCell({ card, columnName: 'name', renderStyle, ...rest }),
    renderCell({ card, columnName: 'mana_cost', renderStyle, ...rest }),
    renderCell({ card, columnName: 'type_line', renderStyle, ...rest }),
    renderCell({ card, columnName: 'set', renderStyle, ...rest }),
    renderCell({ card, columnName: 'oracle_text', renderStyle, ...rest }),
    renderCell({ card, columnName: 'flavor_text', renderStyle, ...rest }),
    renderCell({ card, columnName: 'power_toughness', renderStyle, ...rest }),
  ]

  return (
    <Grid item container justifyContent='center'>
      <Grid item container justifyContent='center' spacing={2} xs={12}>
        <Grid item>
          {name}
        </Grid>
        {manaCost && <Grid item>
          {manaCost}
        </Grid>}
      </Grid>
      <Grid item container justifyContent='center' spacing={1} xs={12}>
        <Grid item>
          {typeLine}
        </Grid>
        <Grid item>
          {set}
        </Grid>
      </Grid>
      {oracleText && <Grid component={Box} item xs={12} paddingTop={1}>
        {oracleText}
      </Grid>}
      {flavorText && <Grid item xs={12} align='left'>
        {flavorText}
      </Grid>}
      {powerToughness && <Grid item xs={12} align='right'>
        {powerToughness}
      </Grid>}
    </Grid>
  )
}


const CardInfo = (props) => {
  /** VARS **/
  const {
    classes,
    card,
    dispatch,
  } = props
  const theme = useTheme()


  /** EFFECTS **/
  { }


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <Grid container justifyContent='center' alignItems='flex-start' wrap='nowrap' className={clsx(classes.root, classes.topArrow)}>

      {/* CARD PREVIEW */}
      <Hidden lgUp>
        <Grid item className={classes.image}>
          <CardImage
            card={card}
          />
        </Grid>
      </Hidden>

      {/* CARD INFO */}
      <Grid item container xs={12} md={10} lg={8} xl={6} justifyContent='center' align='center' spacing={card.is_dfc ? 2 : 1} component={Paper} elevation={3} className={classes.content}>
        {
          card.is_dfc
            ?
            <>
              {/* Front Face */}
              <Grid item container justifyContent='center' xs={12} lg={true}>
                {renderGameFields({ card, theme, cardFace: 0 })}
              </Grid>

              <Hidden lgUp>
                <Divider style={{ width: '100%' }} />
              </Hidden>
              <Hidden mdDown>
                <Divider flexItem orientation='vertical' />
              </Hidden>

              {/* Back Face */}
              <Grid item container justifyContent='center' xs={12} lg={true}>
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
            wat3
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardInfo
    )
  )