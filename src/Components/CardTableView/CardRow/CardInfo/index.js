/* eslint-disable no-lone-blocks */

import { Grid, Paper, Hidden } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import clsx from 'clsx'
import _ from 'lodash'

import { CardImage } from '@/Components'
import renderCell from '@/CardRenders'
import useStyles from './styles'



const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {

  }
})

const CardInfo = (props) => {
  /** VARS **/
  const {
    classes,
    card,
    // dispatch,
  } = props


  /** EFFECTS **/
  { }


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <Grid container justifyContent='center' alignItems="center" wrap='nowrap' className={clsx(classes.root, classes.topArrow)}>
      <Hidden lgUp>
        <Grid item style={{ marginRight: '16px', width: 'fit-content' }}>
          <CardImage
            card={card}
          />
        </Grid>
      </Hidden>
      <Grid item container direction='column' xs={10} align='center'>
        <Paper elevation={3}>
          {
            Object.entries(_.pick(card, ['name', 'amount', 'set', 'cmc', 'mana_cost', 'tag', 'price', 'total_price', 'flavor_text'])).map(([key, value]) => (
              <Grid item>
                {renderCell(card, key)}
              </Grid>
            ))
          }
        </Paper>
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