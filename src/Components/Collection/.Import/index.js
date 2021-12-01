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
import SwipeableViews from 'react-swipeable-views'

import { setCurrentTab, setCurrentCollection } from '@/Logic/redux'
import { BaseForm } from '@/Components'
import ImportWizard from './ImportWizard'
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


const Import = ({
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
  const viewRef = useRef()
  const wizardRef = useRef()

  const [currentViewIndex, _setCurrentViewIndex] = useState(1)
  const [wizardBackdrop, setWizardBackdrop] = useState(false)
  const [cardListText, setCardListText] = useState('')


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
    setTimeout(() => viewRef.current?.updateHeight(), 10)
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

  const handleSubmit = (source) => async (e, resolve, reject) => {
    switch (source) {
      case 'bulk':
        try {
          // TODO: add bulk import logic
          await new Promise(r => setTimeout(r, 500))
          setCurrentViewIndex(1)
          setCardListText('')
        }
        catch (e) {
          reject()
        }
        finally {
          resolve()
          break
        }

      case 'wizard':
        try {
          const newCards = await wizardRef.current?.handleSubmit(e) // will reject if invalid
          setWizardBackdrop(true)

          // TODO: remove setTimeout and implement a loading state
          await new Promise(r => setTimeout(r, 500))

          setCurrentViewIndex(1)
          wizardRef.current?.reset()
        }
        catch {
          reject()
        }
        finally {
          setWizardBackdrop(false)
          resolve()
          break
        }

      default:
        reject()
        break
    }
  }


  /** RENDER **/
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} component={Paper}>
        <SwipeableViews animateHeight ignoreNativeScroll
          ref={viewRef}
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
                <Grid container justifyContent='center' alignItems='center'>
                  <Grid item xs={12}>
                    <TextField multiline fullWidth
                      color='secondary'
                      rows={20}
                      variant='filled'
                      label='Card List'
                      value={cardListText}
                      onChange={e => setCardListText(e.target.value)}
                      placeholder={[
                        "Paste your collection here, the supported format is:",
                        "\tx2 cardname [setid] [#collectorNumber] [@lang] [isFoil]",
                        "",
                        "Fuzzy named search is supported.",
                        "",
                        "------------------------",
                        "",
                        "2 fireball [m12] [f]",
                        "atraxa [@fr]",
                        "3x Garruk's Gorehorn [#306]",
                        "1x Garruk's Gorehorn [#108]",
                        "...",
                      ].join('\n')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              )}
              contentProps={{
                style: {
                  paddingRight: '8px',
                },
              }}

              actions={() => (
                <Box paddingTop={2}>
                  <Grid container justifyContent='flex-end' alignItems='center' spacing={1}>
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
                <ImportWizard refs={wizardRef} updateHeight={viewRef.current?.updateHeight} />
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
                      <Button variant='contained' color='secondary' onClick={wizardRef.current?.reset}>
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