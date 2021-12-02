import { Fragment, useState } from 'react'
import { withStyles } from '@material-ui/styles'
import { Menu, TextField, MenuItem, ListItemIcon, Grid, Button, Modal, Typography, Paper, Fade } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
  Edit as EditIcon,
  LocalOffer as TagIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import { connect } from 'react-redux'
import _ from 'lodash'
import clsx from 'clsx'

import {
  updateCollection, addSelectedCardIds, setSelectedCardIds,
  setCurrentOpenCardId, setViewIndex_CardInfo, setEditEnabled_CardInfo
} from '@/Logic/redux'
import { MagicdexApi } from '@/Api'
import Config from '@/Config'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  collection: state.actions.activeUser.collection,
  selectedCardIds: state.actions.app.collection.selectedCardIds,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    updateCollection: (cards) => dispatch(updateCollection({ cards })),
    addSelectedCardId: (id) => dispatch(addSelectedCardIds({ id })),
    setSelectedCardIds: (ids) => dispatch(setSelectedCardIds({ selectedCardIds: ids })),
    setCurrentOpenCardId: (id) => dispatch(setCurrentOpenCardId({ id })),
    setViewIndex: (index) => dispatch(setViewIndex_CardInfo({ index })),
    setEditEnabled: (enabled) => dispatch(setEditEnabled_CardInfo({ enabled })),
  }
})


const ContextMenu = ({
  /** VARS **/
  mouseY,
  mouseX,
  setState,
  clearSelectedCards,
  card,
  onEditClick,
  clearSelectedCardsOnExit = false,
  ...props
}) => {
  const {
    classes,
    dispatch,
    selectedCardIds,
    collection,
    ...rest
  } = props
  const { enqueueSnackbar } = useSnackbar()
  const [modalOpen, setModalOpen] = useState(false)
  const [tagArray, setTagArray] = useState([])


  /** HANDLERS **/
  const closeMenu = () => {
    setState(state => ({
      ...state,
      mouseY: null,
      mouseX: null
    }))
    setModalOpen(false)
  }

  const handleTagChange = (value) => {
    setTagArray(state => (
      _.chain(value)
        .map(v => v.trim())
        .compact()
        .uniqBy(v => v.toLowerCase())
        .value()
    ))
  }

  const handleKeyDown = (id) => (e) => {
    switch (id) {
      case 'tag':
        if (e.key === 'Enter' && e.target.value === '')
          handleMenuItemClick('tag', true)()
        break

      default:
        break
    }
  }

  const handleMenuItemClick = (id, confirmAction = false) => (e) => {
    switch (id) {
      case 'edit':
        onEditClick && onEditClick()
        dispatch.setCurrentOpenCardId(selectedCardIds[0])
        setTimeout(() => {
          dispatch.setEditEnabled(true)
          dispatch.setViewIndex(1)
        }, 300)
        closeMenu()
        break

      case 'delete':
        if (confirmAction) {
          const len = selectedCardIds.length
          if (len > 0) {
            const clonedArr = selectedCardIds.map(_id => ({
              _id,
              amount: 0,
            }))

            if (Config.MODIFY_DB_ALLOWED)
              MagicdexApi.updateCards(clonedArr)
                .then(res => {
                  dispatch.updateCollection(res)
                  const actions = _.countBy(res, 'action')
                  actions['DELETED'] && enqueueSnackbar(`Deleted ${actions['DELETED']} card entries`, { variant: 'success' })
                })
                .catch(error => {
                  enqueueSnackbar(`Failed to delete ${len} card entries`, { variant: 'error' })
                })
            else {
              dispatch.updateCollection(clonedArr.map(card => ({ action: 'UPDATED', card })))
              enqueueSnackbar(`Deleted ${len} card entries`, { variant: 'success' })
            }
          }
          closeMenu()
        }
        else
          setModalOpen('delete')
        break

      case 'tag':
        if (confirmAction) {
          const len = selectedCardIds.length
          if (len > 0) {
            const clonedArr = selectedCardIds.map(_id => ({
              _id,
              tag: tagArray,
            }))

            if (Config.MODIFY_DB_ALLOWED)
              MagicdexApi.updateCards(clonedArr)
                .then(res => {
                  dispatch.updateCollection(res)
                  const actions = _.countBy(res, 'action')
                  actions['DELETED'] && enqueueSnackbar(`Deleted ${actions['DELETED']} card entries`, { variant: 'success' })
                  actions['UPDATED'] && enqueueSnackbar(`Updated ${actions['UPDATED']} card entries`, { variant: 'info' })
                })
                .catch(error => {
                  enqueueSnackbar(`Failed to tag ${len} card entries`, { variant: 'error' })
                })
            else {
              dispatch.updateCollection(clonedArr.map(card => ({ action: 'UPDATED', card })))
              enqueueSnackbar(`Updated ${len} card entries`, { variant: 'success' })
            }
          }
          closeMenu()
        }
        else {
          setTagArray(_.chain(collection)
            .filter(card => selectedCardIds.includes(card._id))
            .flatMap(card => card.tag)
            .uniqBy(v => v.toLowerCase())
            .value()
          )
          setModalOpen('tag')
        }
        break

      default:
        closeMenu()
        break
    }
  }


  /** RENDER **/
  return (
    <>
      <Menu keepMounted disableAutoFocusItem
        onContextMenu={e => e.preventDefault()}
        open={Boolean(mouseY && mouseX)}
        onClose={closeMenu}
        anchorReference='anchorPosition'
        anchorPosition={
          mouseY && mouseX
            ? { top: mouseY - 4, left: mouseX - 2 }
            : undefined
        }
        MenuListProps={{
          dense: true,
        }}
        {...rest}
        className={clsx(classes.root, props.className)}
      >
        {
          selectedCardIds.length === 1 &&
          <MenuItem onClick={handleMenuItemClick('edit')}>
            <ListItemIcon style={{ minWidth: 40 }}>
              <EditIcon fontSize='small' />
            </ListItemIcon>
            Edit
          </MenuItem>
        }
        <MenuItem onClick={handleMenuItemClick('tag')}>
          <ListItemIcon style={{ minWidth: 40 }}>
            <TagIcon fontSize='small' />
          </ListItemIcon>
          Assign Tags
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick('delete')}>
          <ListItemIcon style={{ minWidth: 40 }}>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>


      {/* "ARE YOU SURE" MODAL */}
      <Grid container spacing={5} justifyContent='center' alignItems='center'
        component={Modal} closeAfterTransition
        onClose={closeMenu}
        open={Boolean(modalOpen)}
        BackdropProps={{ timeout: 500 }}
      >
        <Grid item xs={8} sm={6} lg={4} component={Fade} in={Boolean(modalOpen)}>
          <Paper>
            <Grid container justifyContent='center' alignItems='center' spacing={1} className={classes.modal}>
              {
                ((value) => {
                  switch (value) {
                    case 'delete':
                      return <>
                        <Grid item xs={12} align='center'>
                          <Typography noWrap variant='h5' align='left'>
                            Confirm Action
                          </Typography>
                          <Typography noWrap variant='body1' align='left'>
                            {
                              `Are you sure you want to delete the selected ${selectedCardIds.length > 1 ? 'cards' : 'card'}?`
                            }
                          </Typography>
                          <Typography noWrap variant='body2' align='left' color='error'>
                            This action is irreversible.
                          </Typography>
                        </Grid>
                        <Grid item container justifyContent='flex-end' xs={12} spacing={1}>
                          <Grid item>
                            <Button variant='outlined' onClick={closeMenu}>
                              Nop
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant='contained' color='secondary' onClick={handleMenuItemClick('delete', true)}>
                              Yep
                            </Button>
                          </Grid>
                        </Grid>
                      </>

                    case 'tag':
                      return <>
                        <Grid item xs={12} align='left' component={Typography} variant='h5'>
                          Assign Tags
                        </Grid>
                        <Grid item xs={12} align='left' component={Typography} variant='body2'>
                          {`The following tags will be assigned to the selected ${selectedCardIds.length > 1 ? 'cards' : 'card'}:`}
                        </Grid>
                        <Grid item xs={12} sm={10} md={9} lg={7}>
                          <Autocomplete multiple freeSolo
                            label='Tags'
                            variant='outlined'
                            margin='dense'
                            size='small'
                            color='secondary'
                            options={[]}
                            value={tagArray}
                            onChange={(e, newValue) => { handleTagChange(newValue) }}
                            onKeyDown={handleKeyDown('tag')}
                            onInputChange={(e, newInputValue) => {
                              if (newInputValue?.match(/[;,]/g)) {
                                const values = _
                                  .chain(newInputValue)
                                  .split(/[;,]/)
                                  .map(v => v.trim())
                                  .compact()
                                  .uniqBy(v => v.toLowerCase())
                                  .value()
                                if (values.length > 0)
                                  handleTagChange(tagArray.concat(values))
                                else
                                  handleTagChange(tagArray)
                              }
                            }}
                            renderInput={(props) => (
                              <TextField multiline
                                {...props}
                                color='secondary'
                                variant='outlined'
                                label='Tags'
                                helperText={
                                  ['Tags are seperated by ', <code>{'Enter'}</code>, ' or ', <code>{'[;,]'}</code>]
                                    .map((item, i) =>
                                      <Fragment key={i}>{item}</Fragment>
                                    )
                                }
                              />
                            )}
                          />
                        </Grid>

                        <Grid item container justifyContent='flex-end' spacing={1} xs={12}>
                          <Grid item>
                            <Button variant='outlined' onClick={closeMenu}>
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant='contained' color='secondary' onClick={handleMenuItemClick('tag', true)}>
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                      </>

                    default:
                      return <></>
                  }
                })(modalOpen)
              }
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      ContextMenu
    )
  )