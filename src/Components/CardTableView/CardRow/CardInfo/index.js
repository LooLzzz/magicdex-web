/* eslint-disable no-lone-blocks */

import { Grid, Paper, Hidden, Divider } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
import clsx from 'clsx'
import _ from 'lodash'

import { CardImage } from '@/Components'
import renderCell from '@/CardRenders'
import useStyles from './styles'


/** UTILS **/
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {

  }
})

const renderWithFields = ({ fields, gridProps, ...rest }) => {
  const res = fields.map((columnName, i) =>
    <Grid item name={columnName} key={i} {...gridProps}>
      {renderCell({ columnName, ...rest })}
    </Grid>
  )

  return _.filter(res,
    item => item.props.children && item.props.children !== '-'
  )
}


const CardInfo = (props) => {
  /** VARS **/
  const {
    classes,
    card,
    // dispatch,
  } = props
  const theme = useTheme()
  const cardFields = ['name', 'amount', 'set', 'cmc', 'mana_cost', 'type_line', 'oracle_text', 'power_toughness', 'tag', 'price', 'total_price', 'flavor_text']
  const cardFaceFields = {
    faces: ['name', 'mana_cost', 'type_line', 'oracle_text', 'power_toughness', 'flavor_text'],
    both: ['amount', 'set', 'tag', 'price', 'total_price'],
  }


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
      <Grid item container xs={11} justifyContent='center' align='center' spacing={card.is_dfc ? 2 : 1} component={Paper} elevation={3} className={classes.content}>
        {
          card.is_dfc
            ?
            <>
              {/* Front Face */}
              <Grid item container direction='column' spacing={1} xs={12} lg={6}>
                {renderWithFields({ card, fields: cardFaceFields['faces'], theme, renderStyle: 'content', cardFace: 0 })}
              </Grid>

              <Hidden lgUp>
                <Divider style={{ width: '98%' }} />
              </Hidden>
              <Hidden mdDown>
                <Divider flexItem orientation='vertical' />
              </Hidden>

              {/* Back Face */}
              <Grid item container direction='column' spacing={1} xs={12} lg={6}>
                {renderWithFields({ card, fields: cardFaceFields['faces'], theme, renderStyle: 'content', cardFace: 1 })}
              </Grid>

              <Divider variant='middle' style={{ width: '98%' }} />

              {/* Fields that are shared between the two faces */}
              <Grid item container justifyContent='center' alignItems='center' spacing={1} xs={12}>
                {renderWithFields({ card, fields: cardFaceFields['both'], theme, renderStyle: 'content' })}
              </Grid>
            </>

            : /* Single faced card */
            renderWithFields({ card, fields: cardFields, theme, renderStyle: 'content', gridProps: { xs: 12 } })
        }
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