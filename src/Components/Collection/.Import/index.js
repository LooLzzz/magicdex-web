/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useRef } from 'react'
import { Grid, Typography, Paper, Divider, Button, TextField, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import {
  ImportExport as ImportExportIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'
import SwipeableViews from 'react-swipeable-views'

import Config from '@/Config'
import { setCurrentTab, setCurrentCollection, updateCollection } from '@/Logic/redux'
import { MagicdexApi } from '@/Api'
import { BaseForm } from '@/Components'
import ImportWizard from './ImportWizard'
import BulkImport from './BulkImport'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setCurrentTab: (tab) => dispatch(setCurrentTab({ tab })),
    setCurrentCollection: (collection) => dispatch(setCurrentCollection({ collection })),
    updateCollection: (cards) => dispatch(updateCollection({ cards })),
  }
})


const Import = ({
  /** VARS **/
  ...props
}) => {
  const {
    classes,
    dispatch,
    username,
  } = props
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()

  const refs = {
    viewRef: useRef(),
    wizardRef: useRef(),
    bulkRef: useRef(),
  }

  const [currentViewIndex, _setCurrentViewIndex] = useState(1)
  const [wizardBackdrop, setWizardBackdrop] = useState(false)

  const updateHeight = () => setTimeout(refs.viewRef.current?.updateHeight, 10)


  /** FUNCTIONS **/
  const updateCollection = async (newCards) => {
    if (Config.MODIFY_DB_ALLOWED) {
      try {
        const res = await MagicdexApi.updateCards(newCards)
        const actions = _.countBy(res, 'action')

        dispatch.updateCollection(res.map(item => item.card))

        actions['CREATED'] && enqueueSnackbar(`Created ${actions['CREATED']} card entries`, { variant: 'success' })
        actions['UPDATED'] && enqueueSnackbar(`Updated ${actions['UPDATED']} card entries`, { variant: 'info' })
      }
      catch (error) {
        enqueueSnackbar(`Error updating cards`, { variant: 'error' })
        console.error({ error })
      }
    }
    else {
      dispatch.updateCollection([{ action: 'UPDATED', cards: newCards }])
      enqueueSnackbar(`Updated ${newCards.length} card entries`, { variant: 'info' })
    }
  }


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
  const setCurrentViewIndex = (index) => {
    _setCurrentViewIndex(index)
    updateHeight()
    
    switch (index) {
      case 0:
        setTimeout(refs.bulkRef.current?.focus, 350)
        break

      default:
      case 1:
        break

      case 2:
        setTimeout(refs.wizardRef.current?.focus, 350)
        break
    }
  }

  const handleImportTypeClick = (source) => (e) => {
    switch (source) {
      case 'bulk':
        setCurrentViewIndex(0)
        break

      case 'wizard':
        setCurrentViewIndex(2)
        break

      default:
        setCurrentViewIndex(1)
        break
    }
  }

  const handleSubmit = (source) => async (e) => {
    let formRef = null
    let res = []

    switch (source) {
      case 'bulk':
        formRef = refs.bulkRef.current
        break

      case 'wizard':
        formRef = refs.wizardRef.current
        break

      default:
        break
    }

    try {
      const newCards = (await formRef.handleSubmit(e))
        .map(card => ({
          ...card,
          amount: `+${card.amount}`,
        }))
      setWizardBackdrop(true)

      await updateCollection(newCards)
      setCurrentViewIndex(1)
      formRef.reset()

      res = Promise.resolve(newCards)
    }
    catch (err) {
      res = Promise.reject(err)
    }
    finally {
      setWizardBackdrop(false)
      return res
    }
  }


  /** RENDER **/
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} component={Paper}>
        <SwipeableViews animateHeight ignoreNativeScroll
          ref={refs.viewRef}
          index={currentViewIndex}
          slideStyle={{
            overflow: 'hidden',
          }}
          style={{ overflow: 'hidden' }}
        >

          {/** VIEW 0 - BULK IMPORT **/}
          <Grid container justifyContent='center' alignItems='center' spacing={2} className={classes.view2Container}>
            <BaseForm
              onSubmit={handleSubmit('bulk')}
              instantValidate={false}
              elevation={0}
              style={{ width: '100%' }}

              header='Bulk Import'
              headerProps={{ align: 'left' }}
              icon={() => (
                <Box marginBottom={-2}>
                  <ImportExportIcon style={{ fontSize: '1.5em' }} />
                </Box>
              )}

              content={() => (
                <BulkImport refs={refs.bulkRef} updateHeight={updateHeight} />
              )}
              contentProps={{
                style: {
                  paddingRight: '8px',
                },
              }}

              actions={() => (
                <Box paddingTop={2} marginLeft={1.5} marginRight={1.5}>
                  <Grid container justifyContent='flex-end' alignItems='center' spacing={1}>
                    <Grid item xs align='left'>
                      <Button variant='contained' color='secondary' onClick={refs.bulkRef.current?.reset}>
                        Reset
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant='outlined' onClick={() => setCurrentViewIndex(1)}>
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
          </Grid>


          {/** VIEW 1 - CHOOSE IMPORT TYPE **/}
          <Grid container justifyContent='center' alignItems='center' className={`MuiPaper-rounded ${classes.view1Container}`}>
            <Grid item container xs component={Button} style={{ height: '100%', borderRadius: 0 }} onClick={handleImportTypeClick('bulk')}>
              <Grid item style={{ marginTop: 6, marginRight: 12 }}>
                <ChevronLeftIcon fontSize='large' />
              </Grid>
              <Grid item component={Typography} variant="h5">
                Bulk Import
              </Grid>
            </Grid>
            <Divider flexItem orientation='vertical' />
            <Grid item container xs component={Button} style={{ height: '100%', borderRadius: 0 }} onClick={handleImportTypeClick('wizard')}>
              <Grid item component={Typography} variant="h5">
                Import Wizard
              </Grid>
              <Grid item style={{ marginTop: 6, marginLeft: 12 }}>
                <ChevronRightIcon fontSize='large' />
              </Grid>
            </Grid>
          </Grid>


          {/** VIEW 2 - IMPORT WIZARD **/}
          <Grid container justifyContent='center' alignItems='center' spacing={2} className={classes.view2Container}>
            <BaseForm
              onSubmit={handleSubmit('wizard')}
              disableBackdrop={!wizardBackdrop}
              instantValidate={false}
              elevation={0}
              style={{ width: '100%' }}

              header={() =>
                <>
                  Import Wizard <span style={{ fontSize: '0.5em' }}>(of the coast™)</span>
                </>
              }
              headerProps={{ align: 'left' }}
              icon={() => (
                <Box marginBottom={2}>
                  🧙‍♂️
                </Box>
              )}

              content={() => (
                <ImportWizard refs={refs.wizardRef} updateHeight={updateHeight} />
              )}
              contentProps={{
                style: {
                  paddingRight: '8px',
                },
              }}

              actions={() => (
                <Box paddingTop={2} marginLeft={1.5} marginRight={1.5}>
                  <Grid container justifyContent='flex-end' alignItems='center' spacing={1}>
                    <Grid item xs align='left'>
                      <Button variant='contained' color='secondary' onClick={refs.wizardRef.current?.reset}>
                        Reset
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant='outlined' onClick={() => setCurrentViewIndex(1)}>
                        Back
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant='contained' color='primary' type='submit'>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            />
          </Grid>

        </SwipeableViews>
      </Grid>
    </Grid>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Import
    )
  )