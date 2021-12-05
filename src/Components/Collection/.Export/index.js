/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { useState, useEffect } from 'react'
import { Grid, Box, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Description as ExportIcon } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { setCurrentTab, setCurrentCollection } from '@/Logic/redux'
import { pickCardFields } from '@/Api/MagicdexApi/utils'
import { BaseForm } from '@/Components'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
  collection: state.actions.activeUser.collection,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setCurrentTab: (tab) => dispatch(setCurrentTab({ tab })),
    setCurrentCollection: (collection) => dispatch(setCurrentCollection({ collection })),
  }
})


const Export = ({
  /** VARS **/
  ...props
}) => {
  const {
    classes,
    dispatch,
    username,
    collection,
  } = props
  const history = useHistory()


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab('collection')
  }, [])

  useEffect(() => {
    if (!username)
      return history.push('/login')
  }, [username])


  /** HANDLERS **/
  const handleSubmit = () => {
    // TODO: handle export submit
  }


  /** RENDER **/
  return (
    <div className={classes.root}>
      <BaseForm
        onSubmit={handleSubmit}
        instantValidate={false}
        style={{ width: '100%' }}

        header='Export Data'
        headerProps={{ align: 'left' }}
        icon={<ExportIcon style={{ fontSize: '1em' }} />}

        content={() => (
          <>todo</>
        )}
        // contentProps={{
        //   style: {
        //     paddingRight: '8px',
        //   },
        // }}

        actions={() => (
          <Box paddingTop={2} marginLeft={1.5} marginRight={1.5}>
            <Grid container justifyContent='flex-end' alignItems='center' spacing={1}>
              <Grid item xs align='left'>
                <Button variant='contained' color='secondary'>
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button variant='outlined'>
                  Back
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' type='submit' color='primary'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      />
    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Export
    )
  )