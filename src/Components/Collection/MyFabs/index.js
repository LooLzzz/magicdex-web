/* eslint-disable no-lone-blocks */

// import { useState, useEffect } from 'react'
import { Grid, Tooltip, Fab } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import {
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
} from '@material-ui/icons'
import { connect } from 'react-redux'

import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {

  }
})


const MyFabs = ({
  /** VARS **/
  ...props
}) => {
  // const {
  //   classes,
  //   dispatch,
  // } = props


  /** EFFECTS **/
  { }


  /** HANDLERS **/
  const handleFabClick = (id) => (e) => {
    console.log({ 'handleFabClick()': { id, event: e } })
    // TODO: add a new card to the collection & update the localStorage.
    // user should choose `import from list` or a form to add a new card

    switch (id) {
      case 'import':
        break

      case 'export':
        break

      default:
        break
    }
  }


  /** RENDER **/
  return (
    <Grid container spacing={1} direction="column-reverse">
      <Grid item>
        <Tooltip arrow
          placement='left'
          title='Import Cards'
          enterDelay={250}
        >
          <Fab
            name='import'
            size='small'
            color='primary'
            onClick={handleFabClick('import')}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip arrow
          placement='left'
          title='Export Cards'
          enterDelay={250}
        >
          <Fab
            name='export'
            size='small'
            color='primary'
            onClick={handleFabClick('export')}
          >
            <CloudUploadIcon />
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      MyFabs
    )
  )