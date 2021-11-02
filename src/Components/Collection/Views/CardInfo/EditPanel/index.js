/* eslint-disable no-lone-blocks */

import { useState } from 'react'
import { Grid, Button, Zoom, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updateCurrentCollection, removeCardsFromCollection } from '@/Logic/redux'
import renderCell from '@/CardRenders'
import useStyles from './styles'


// TODO: all this


/** UTILS **/
const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    /**
     * pass a list of card objects to be updated (could be new or existing ids)
     */
    updateCurrentCollection: (collection) => dispatch(updateCurrentCollection(collection)),

    /**
     * pass a list of card objects to be removed
    */
    removeCardsFromCollection: (cards) => dispatch(removeCardsFromCollection(cards)),
  }
})


const EditPanel = (props) => {
  /** VARS **/
  const {
    classes,
    dispatch,
    card,
    updateHeight: _updateHeight,
  } = props
  const updateHeight = () => setTimeout(() => _updateHeight(), 150)
  const [editEnabled, setEditEnabled] = useState(false)

  const fields = ['tag', 'amount', 'foil', 'condition', 'signed', 'altered', 'misprint', 'lang']


  /** EFFECTS **/
  { }


  /** HANDLERS **/
  const handleEditButtonClick = (e) => {
    if (editEnabled) {
      let newCard = _.cloneDeep(card)

      newCard.foil = !newCard.foil

      dispatch.updateCurrentCollection({ cards: [newCard] })
      // dispatch.removeCardsFromCollection({ cards: [card] })
    }

    setEditEnabled(editEnabled => !editEnabled)
    updateHeight()
  }

  const handleCancelButtonClick = (e) => {
    setEditEnabled(false)
    updateHeight()
  }


  /** RENDER **/
  return (
    <Grid item container xs={12} spacing={1} justifyContent='center' alignItems='center' className={classes.root}>

      <Grid item container xs={12} spacing={1} direction='row-reverse' justifyContent='flex-start' alignItems='center' className={classes.editButtonContainer}>
        <Grid item>
          <Button size='small' variant='contained' color='primary' onClick={handleEditButtonClick}>
            {editEnabled ? 'Save' : 'Edit'}
          </Button>
        </Grid>
        <Grid item>
          <Zoom in={editEnabled} style={{ transformOrigin: 'center right' }}>
            <Button size='small' variant='outlined' disabled={!editEnabled} onClick={handleCancelButtonClick}>
              cancel
            </Button>
          </Zoom>
        </Grid>

        {/* {
          editEnabled &&
          <Grid item>
            <Button size='small' variant='outlined' disabled={!editEnabled} onClick={handleCancelButtonClick}>
              cancel
            </Button>
          </Grid>
        } */}
      </Grid>

      {
        editEnabled
          ? (
            <Grid item container spacing={1} justifyContent='center' alignItems='center' direction='column'>
              <Grid item>
                pls
              </Grid>
              <Grid item>
                pls
              </Grid>
              <Grid item>
                pls
              </Grid>
              <Grid item>
                pls
              </Grid>
            </Grid>
          )
          : (
            <Grid item container spacing={1} justifyContent='center' >
              {
                _.chain(fields)
                  .map(columnName => {
                    const render = renderCell({ card, columnName, renderStyle: 'content' })
                    return render && [columnName, render]
                  })
                  .compact() // remove undefined values
                  .map(([columnName, render]) =>
                    <Grid item xs={2} key={columnName} name={columnName}>
                      {[
                        `${columnName}: `,
                        render
                      ]}
                    </Grid>
                  )
                  .value()
              }
            </Grid>
          )
      }

    </Grid >
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      EditPanel
    )
  )