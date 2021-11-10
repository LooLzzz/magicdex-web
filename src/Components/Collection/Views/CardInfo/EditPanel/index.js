/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment, useState, useEffect } from 'react'
import { Tooltip, Chip, useMediaQuery, Accordion, AccordionDetails, AccordionSummary, InputAdornment, Divider, Typography, Paper, Modal, Backdrop, CircularProgress, Grid, IconButton, Button, Fade, Zoom, FormControlLabel, TextField, Checkbox, MenuItem } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import { Delete as DeleteIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import { connect } from 'react-redux'
import lodash from 'lodash'

import { updateCollection, removeCardsFromCollection, addFilters } from '@/Logic/redux'
import { getCardPrints } from '@/Api'
import RenderCell from '@/CardRenders'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  tagFilters: state.actions.app.collection.filters.tag || [],
})
const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    updateCollection: (payload) => dispatch(updateCollection(payload)),
    removeCardsFromCollection: (payload) => dispatch(removeCardsFromCollection(payload)),
    addFilters: (payload) => dispatch(addFilters(payload)),
  }
})


const EditPanel = (props) => {
  /** VARS **/
  const {
    classes,
    dispatch,
    card,
    updateHeight: _updateHeight,
    onMenuHover,
    tagFilters,
  } = props
  const { enqueueSnackbar } = useSnackbar()
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const updateHeight = () => setTimeout(() => _updateHeight(), 150)
  const [editEnabled, setEditEnabled] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const [newCard, setNewCard] = useState({})
  const [printsSet, setPrintsSet] = useState([])
  const [printsLang, setPrintsLang] = useState([])
  const [rulings, setRulings] = useState(undefined)


  /** FUNCTIONS **/
  const resetNewCard = () => {
    setPrintsSet([])
    setPrintsLang([])
    onMenuHover(null)
    setModalOpen(false)
    setEditEnabled(false)

    setNewCard({
      id: card.id,
      tag: card.tag,
      amount: card.amount,
      foil: card.foil,
      condition: card.condition,
      signed: card.signed,
      altered: card.altered,
      misprint: card.misprint,
      set: card.set,
      collector_number: card.collector_number,
      lang: card.lang,
    })

    Promise
      .all([
        getCardPrints(card, 'set'),
        getCardPrints(card, 'lang'),
      ])
      .then(([set, lang]) => {
        setPrintsSet(set)
        setPrintsLang(lang)
      })
  }


  /** EFFECTS **/
  useEffect(() => {
    resetNewCard()

    fetch(card.rulings_uri)
      .then(res => res.json())
      .then(data => {
        setRulings(lodash
          .chain(data['data'])
          .reverse()
          .map(item => Object.assign(item, { published_at: new Date(item.published_at) }))
          .sortBy('published_at')
          .value()
        )
      })
  }, [card])


  /** HANDLERS **/
  const handleChipClick = (tag) => (e) => {
    if (Array.isArray(tagFilters)) {
      dispatch.addFilters({
        filters: {
          tag: tagFilters.includes(tag)
            ? tagFilters.filter(item => item !== tag)
            : tagFilters.concat(tag)
        }
      })
    }
    else
      dispatch.addFilters({
        filters: { tag: [tag] }
      })
  }

  const handleEditButtonClick = async (e) => {
    if (editEnabled) {
      // save changes
      let clone = Object.assign(lodash.cloneDeep(card), newCard)

      dispatch.updateCollection({ cards: [clone] })
      onMenuHover(null)
      enqueueSnackbar(`Updated ${card.name} [${card.set.toUpperCase()}]`, { variant: 'info' })
    }

    setEditEnabled(editEnabled => !editEnabled)
    updateHeight()
  }

  const handleCancelButtonClick = (e) => {
    resetNewCard()
    onMenuHover(null)
    setEditEnabled(false)
    updateHeight()
  }

  const handleDeleteButtonClick = (confirm) => (e) => {
    if (confirm) {
      dispatch.removeCardsFromCollection({ cards: [card] })
      enqueueSnackbar(`Deleted ${card.name} [${card.set.toUpperCase()}]`, { variant: 'success' })
    }
    else
      setModalOpen(true)
  }

  const handleCardInfoChange = (field, value) => {
    switch (field) {
      case 'amount':
        if (value > 0) {
          setNewCard(card => ({ ...card, amount: value }))
          onMenuHover({ ...card, ...newCard, amount: value })
        }
        break

      case 'foil':
        setNewCard(card => ({ ...card, foil: value }))
        onMenuHover({ ...card, ...newCard, foil: value })
        break

      case 'condition':
      case 'signed':
      case 'altered':
      case 'misprint':
        setNewCard(card => ({ ...card, [field]: value }))
        break

      case 'tag':
        value = lodash.chain(value)
          .map(v => v.trim())
          .compact()
          .uniqBy(v => v.toLowerCase())
          .uniq()
          .value()
        setNewCard(card => ({ ...card, tag: value }))
        break

      case 'set':
        const [selectedSet, selectedCollectorNumber] = value.split(':')
        const { foil, ...rest } = printsSet.find(card => card.set === selectedSet && card.collector_number === selectedCollectorNumber)
        setNewCard(card => ({
          ...card,
          ...rest,
        }))

        // onMenuHover(null)
        setPrintsLang([])
        getCardPrints(rest, 'lang')
          .then(setPrintsLang)
        break

      case 'lang':
        const { foil: _, ..._rest } = printsLang.find(item => item.lang === value)
        setNewCard(card => ({
          ...card,
          ..._rest,
        }))
        break

      default:
        break
    }
  }


  /** RENDER **/
  return (
    <>
      <Grid item container xs={12} spacing={1} justifyContent='center' alignItems='center' className={classes.root}>

        <Grid item container xs={12} spacing={1} direction='row-reverse' justifyContent='flex-start' alignItems='center' className={classes.editButtonContainer}>
          <Grid item>
            <Button size='small' variant='contained' color='primary' onClick={handleEditButtonClick}>
              {editEnabled ? 'Save' : 'Edit'}
            </Button>
          </Grid>
          <Grid item>
            <Zoom in={editEnabled} style={{ transformOrigin: 'center right' }}>
              <Button size='small' variant='outlined' onClick={handleCancelButtonClick}>
                cancel
              </Button>
            </Zoom>
          </Grid>
          <Grid item>
            <Zoom in={editEnabled} style={{ transformOrigin: 'center right' }}>
              <IconButton title='Delete' size='small' onClick={handleDeleteButtonClick(false)}>
                <DeleteIcon />
              </IconButton>
            </Zoom>
          </Grid>
        </Grid>

        {
          editEnabled
            ? (
              <Grid item container justifyContent='center' alignItems='flex-start' spacing={1}>
                <Grid item container direction='column' justifyContent='center' alignItems='flex-start' style={{ maxWidth: 'min-content' }}>
                  <Grid item>
                    <TextField
                      size='small'
                      variant='outlined'
                      type='number'
                      label='Amount'
                      color='secondary'
                      value={newCard.amount}
                      onChange={e => handleCardInfoChange('amount', e.target.value)}
                      style={{ marginLeft: 0 }}
                    />
                  </Grid>

                  <Grid item style={{ width: '9em', paddingTop: 8 }}>
                    <TextField select
                      color='secondary'
                      variant='outlined'
                      margin='dense'
                      size='small'
                      align='left'
                      label='Condition'
                      value={newCard.condition}
                      onChange={e => handleCardInfoChange('condition', e.target.value)}
                      style={{ marginLeft: 0 }}
                    >
                      {
                        [['NM', 'NM'], ['LP', 'LP'], ['MP', 'MP'], ['HP', 'HP'], ['DAMAGED', 'Damaged']]
                          .map(cond =>
                            <MenuItem key={cond[0]} value={cond[0]}>{cond[1]}</MenuItem>)
                      }
                    </TextField>
                  </Grid>

                  <Grid item>
                    <FormControlLabel
                      label='Foil'
                      control={
                        <Checkbox
                          checked={newCard.foil}
                          onChange={e => handleCardInfoChange('foil', e.target.checked)}
                        />
                      }
                    />
                  </Grid>

                  <Grid item>
                    <FormControlLabel
                      label='Signed'
                      control={
                        <Checkbox
                          checked={newCard.signed}
                          onChange={e => handleCardInfoChange('signed', e.target.checked)}
                        />
                      }
                    />
                  </Grid>

                  <Grid item>
                    <FormControlLabel
                      label='Altered'
                      control={
                        <Checkbox
                          checked={newCard.altered}
                          onChange={e => handleCardInfoChange('altered', e.target.checked)}
                        />
                      }
                    />
                  </Grid>

                  <Grid item>
                    <FormControlLabel
                      label='Misprint'
                      control={
                        <Checkbox
                          checked={newCard.misprint}
                          onChange={e => handleCardInfoChange('misprint', e.target.checked)}
                        />
                      }
                    />
                  </Grid>
                </Grid>

                <Grid item container direction='column' spacing={1} xs={12} sm={10} md>
                  <Grid item container wrap='nowrap' spacing={1}>
                    <Grid item xs style={{ width: '1px' }}>
                      <TextField select
                        color='secondary'
                        variant='outlined'
                        margin='dense'
                        size='small'
                        align='left'
                        disabled={printsSet.length === 0}
                        label='Set'
                        value={`${newCard.set}:${newCard.collector_number}`}
                        onChange={e => handleCardInfoChange('set', e.target.value)}
                        SelectProps={{
                          onClose: e => onMenuHover({ ...card, ...newCard })
                        }}
                        InputProps={printsSet.length === 0
                          ? {
                            startAdornment: (
                              <InputAdornment position='start'>
                                <CircularProgress size={20} />
                              </InputAdornment>
                            )
                          }
                          : {}
                        }
                      >
                        {
                          (printsSet || [])
                            .map(item =>
                              <MenuItem
                                key={`${item.set}:${item.collector_number}`}
                                value={`${item.set}:${item.collector_number}`}
                                onMouseEnter={e => onMenuHover({ ...item, foil: newCard.foil })}
                                onMouseLeave={e => onMenuHover({ ...card, ...newCard })}
                              >
                                {`${item.set_name} - #${item.collector_number}`}
                              </MenuItem>
                            )
                        }
                      </TextField>
                    </Grid>

                    <Grid item>
                      <TextField select
                        color='secondary'
                        variant='outlined'
                        margin='dense'
                        size='small'
                        align='left'
                        label='Language'
                        disabled={printsLang.length === 0}
                        value={newCard.lang}
                        style={{ width: '6em' }}
                        onChange={e => handleCardInfoChange('lang', e.target.value)}
                        SelectProps={{
                          onClose: e => onMenuHover({ ...card, ...newCard })
                        }}
                        InputProps={printsLang.length === 0
                          ? {
                            startAdornment: (
                              <InputAdornment position='start'>
                                <CircularProgress size={20} />
                              </InputAdornment>
                            )
                          }
                          : {}
                        }
                      >
                        {
                          (printsLang || [])
                            .map(item =>
                              <MenuItem
                                key={item.lang}
                                value={item.lang}
                                onMouseEnter={e => onMenuHover({ ...item, foil: newCard.foil })}
                                onMouseLeave={e => onMenuHover({ ...card, ...newCard })}
                              >
                                {item.lang}
                              </MenuItem>
                            )
                        }
                      </TextField>
                    </Grid>
                  </Grid>

                  <Grid item style={{ marginRight: 11 }}>
                    <Autocomplete multiple freeSolo disableClearable //autoSelect
                      limitTags={4}
                      label='Tags'
                      variant='outlined'
                      margin='dense'
                      size='small'
                      color='secondary'
                      options={[]}
                      value={newCard.tag}
                      onChange={(e, newValue) => { handleCardInfoChange('tag', newValue) }}
                      onInputChange={(e, newInputValue) => {
                        if (newInputValue?.match(/[;,]$/))
                          handleCardInfoChange('tag', newCard.tag.concat(newInputValue.slice(0, -1)))
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
                </Grid>
              </Grid>
            )
            : (
              <Grid item container spacing={2}>
                <Grid item xs={4} component='table' style={{ borderSpacing: 8, height: 'fit-content' }}>
                  <tbody>
                    {
                      ['amount', 'condition', '', 'foil', 'signed', 'altered', 'misprint']
                        .map((columnName, i) =>
                          <tr key={i} style={{ verticalAlign: columnName === 'condition' ? 'baseline' : 'middle' }}>
                            {
                              columnName
                                ? <>
                                  <td style={{ width: 0 }}>
                                    <Typography>
                                      {lodash.upperFirst(columnName)}
                                    </Typography>
                                  </td>
                                  <td align='center'>
                                    <RenderCell
                                      card={card}
                                      columnName={columnName}
                                      renderStyle='content'
                                    />
                                  </td>
                                </>
                                : <td colSpan={2}>
                                  <Divider />
                                </td>
                            }
                          </tr>
                        )
                    }
                  </tbody>
                </Grid>

                <Grid item container xs justifyContent='flex-start' alignItems='flex-start'>
                  <Grid item container xs={12} spacing={1}>
                    <Grid item xs={12} component={Typography} variant='h6' align='left'>
                      <Tooltip arrow placement='right'
                        title={card.tag.length > 0 ? <>Click a tag's chip to search <br /> for more cards with that tag</> : ''}
                      >
                        <span>Tags</span>
                      </Tooltip>
                    </Grid>
                    <Grid item container spacing={1} style={{ paddingLeft: 16 }} >
                      {
                        card.tag.length > 0
                          ? card.tag.map((tag, i) =>
                            <Grid item key={i}>
                              <Chip
                                label={tag}
                                color={Array.isArray(tagFilters) && tagFilters.includes(tag) ? 'secondary' : ''}
                                onClick={handleChipClick(tag)}
                                size='small'
                                variant='outlined'
                              />
                            </Grid>
                          )
                          : <Typography style={{ fontFamily: 'Determination Mono' }}>
                            * But nobody came.
                          </Typography>
                      }
                    </Grid>
                  </Grid>
                </Grid>

                {
                  rulings?.length > 0 &&
                  <>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item container style={{ paddingTop: 12 }}>
                      <Accordion
                        className={classes.accordion}
                        classes={{ expanded: classes['accordion-expanded'] }}
                        TransitionProps={{
                          onEntering: updateHeight,
                          onEntered: updateHeight,
                          onExiting: updateHeight,
                          onExited: updateHeight,
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                          <Typography variant='h6'>
                            {smDown ? 'Rulings' : 'Additional Rulings'}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ padding: 0 }}>
                          <ul className={classes.listing}>
                            {
                              rulings.map((rule, i) =>
                                <li key={i}>
                                  <RenderCell
                                    card={{ oracle_text: rule.comment }}
                                    columnName='oracle_text'
                                  />
                                </li>
                              )
                            }
                          </ul>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </>
                }
              </Grid>
            )
        }
      </Grid>

      <Grid container component={Modal}
        spacing={5}
        justifyContent='center'
        alignItems='center'
        closeAfterTransition
        onClose={e => setModalOpen(false)}
        open={modalOpen}
        backdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Grid item component={Fade} in={modalOpen}>
          <Paper>
            <Grid container justifyContent='center' alignItems='center' spacing={2}>
              <Grid item xs={12} align='center'>
                <Typography variant='h6'>
                  Are you sure you want to delete this card?
                </Typography>
                <Typography variant='h7'>
                  This action is irreversible.
                </Typography>
              </Grid>
              <Grid item>
                <Button variant='outlined' onClick={e => setModalOpen(false)}>
                  HECK NO
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' color='secondary' onClick={handleDeleteButtonClick(true)}>
                  OH YEH
                </Button>
              </Grid>
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
      EditPanel
    )
  )