/* eslint-disable no-lone-blocks */

// import { useState } from 'react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updateCurrentCollection } from '@/Logic/redux'
import renderCell from '@/CardRenders'
import useStyles from './styles'


// TODO: all this


/** UTILS **/
const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    updateCurrentCollection: (collection) => dispatch(updateCurrentCollection(collection)),
  }
})


const EditPanel = (props) => {
  /** VARS **/
  const {
    classes,
    // dispatch,
    card,
  } = props
  const fields = ['price', 'tag', 'amount', 'foil', 'condition', 'signed', 'altered', 'misprint', 'lang']


  /** EFFECTS **/
  { }


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <Grid item container xs spacing={1} justifyContent='center' alignItems='center'>
      {
        _.chain(fields)
          .map(columnName =>
            [columnName, renderCell({ card, columnName, renderStyle: 'content' })]
          )
          .compact() // remove undefined values
          .map(([columnName, render]) =>
            <Grid item key={columnName} name={columnName}>
              {render}
            </Grid>
          )
          .value()
      }
    </Grid>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      EditPanel
    )
  )