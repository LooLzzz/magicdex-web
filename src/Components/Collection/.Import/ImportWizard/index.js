/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment, useState, useEffect, useRef, useImperativeHandle } from 'react'
import { Grid, Paper, Fade, Modal, Typography, TextField, MenuItem, FormControlLabel, Checkbox, InputAdornment, CircularProgress, Button, Tooltip, Divider } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import Scryfall from 'scryfall-client'
import cloneDeep from 'lodash/cloneDeep'
import pick from 'lodash/pick'

import { getCardPrints } from '@/Api'
import useStyles from './styles'


const ImportWizard = ({
  /** VARS **/
  refs: ref,
  updateHeight = () => { },
  ...props
}) => {
  const {
    classes,
  } = props
  const refs = {
    cardName: {
      autocomplete: useRef(),
      input: useRef(),
      listbox: useRef(),
    },
  }

  const [card, setCard] = useState({})
  const [newCards, setNewCards] = useState([])

  const [printsSet, setPrintsSet] = useState([])
  const [printsLang, setPrintsLang] = useState([])
  const [cardNames, setCardNames] = useState([])
  const [listboxOpen, setListboxOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)


  /** METHODS **/
  useImperativeHandle(ref, () => ({
    handleSubmit,
    reset: handleReset,
  }))


  /** FUNCTIONS **/
  const resetCard = () => {
    setPrintsSet([])
    setPrintsLang([])
    setCardNames([])
    setCard({})

    // onMenuHover(null)
    // dispatch.setEditEnabled(false)
  }


  /** EFFECTS **/
  useEffect(() => {
    if (!card.name) {
      resetCard()
      return
    }

    Scryfall.getCardNamed(card.name)
      .then(newCard => {
        setCard((card) => ({
          ...card,
          ...newCard,
          amount: card.amount || 1,
          condition: card.condition || 'NM',
          foil: card.foil || false,
          signed: card.signed || false,
          altered: card.altered || false,
          misprint: card.misprint || false,
        }))

        setPrintsSet([])
        setPrintsLang([])

        Promise
          .all([
            getCardPrints(newCard, 'set'),
            getCardPrints(newCard, 'lang'),
          ])
          .then(([set, lang]) => {
            setPrintsSet(set)
            setPrintsLang(lang)
          })
      })
  }, [card.name])

  useEffect(() => {
    if (card.set) {
      setPrintsLang([])
      getCardPrints(card, 'lang')
        .then(lang => {
          handleCardInfoChange({ lang: lang[0].lang })
          setPrintsLang(lang)
        })
    }
  }, [card.set])


  /** HANDLERS **/
  const handleSubmit = async (e) => {
    return new Promise((resolve, reject) => {
      const cardName = refs.cardName.input.current?.value.trim() || ''

      if (cardName === '' && newCards.length > 0) {
        setModalOpen({
          source: 'submit',
          reject,
          resolve: () => {
            resolve(newCards)
            closeModal()
          }
        })
      }
      else {
        if (cardName === card.name) {
          handleAddToNewCards()
        }
        else if (cardName && cardNames.length > 0 && cardNames[0].toLowerCase().startsWith(cardName.toLowerCase())) {
          handleCardInfoChange({ name: cardNames[0] })
          setListboxOpen(false)
        }

        reject()
      }
    })
  }

  const handleReset = () => {
    setNewCards([])
    resetCard()
    updateHeight()
  }

  const handleAddToNewCards = () => {
    const cardName = refs.cardName.input.current?.value.trim() || ''

    if (cardName && cardName === card.name && card.set && card.lang) {
      setNewCards(cards => [...cards, cloneDeep(card)])
      resetCard()
      updateHeight()
    }
  }

  const closeModal = () => {
    if (modalOpen.hasOwnProperty('reject'))
      modalOpen.reject()
    setModalOpen(false)
  }

  const onMenuHover = () => {

  }

  const handleCardInfoChange = ({ ...data }) => {
    setCard(card => ({ ...card, ...data }))
  }

  const handleCardNameChange = async (cardName) => {
    try {
      if (cardName)
        setCardNames(
          await Scryfall.autocomplete(cardName)
        )
      else
        throw Error()
    }
    catch (err) {
      setCardNames([])
    }
  }


  /** RENDER **/
  return (
    <>
      <Grid item container justifyContent='center' alignItems='flex-start' spacing={2} xs={12} className={classes.root}>
        <Grid item container justifyContent='center' alignItems='flex-start' spacing={1} xs={12} sm={10} md={8}>
          <Grid item container justifyContent='center' alignItems='center' xs={12}>
            <Grid item xs>
              <Autocomplete clearOnEscape
                ref={refs.cardName.autocomplete}
                handleHomeEndKeys={false}
                open={listboxOpen}
                onOpen={() => setListboxOpen(true)}
                onClose={() => setListboxOpen(false)}
                label='Card Name'
                variant='outlined'
                margin='dense'
                size='small'
                color='secondary'
                options={cardNames}
                value={card?.name || ''}
                onChange={(e, v) => { handleCardInfoChange({ name: v }) }}
                onInputChange={(e, v) => { handleCardNameChange(v) }}

                renderInput={(props) => (
                  <TextField
                    {...props}
                    color='secondary'
                    variant='outlined'
                    label='Card Name'
                    style={{ marginLeft: 0 }}
                    inputRef={refs.cardName.input}
                    InputProps={{
                      ...props.InputProps,
                      endAdornment: (
                        <Fragment>
                          {cardNames === null && <CircularProgress size={20} />}
                          {props.InputProps.endAdornment}
                        </Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item style={{ margin: '0 8px' }}>
              <Tooltip arrow placement='top' title='Add card to import list'>
                <Button
                  disabled={!card.name}
                  variant='contained'
                  color='secondary'
                  onClick={handleAddToNewCards}
                  style={{ minWidth: 0, width: '3em' }}
                >
                  <AddIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid item container direction='column' justifyContent='center' alignItems='flex-start' style={{ maxWidth: 'min-content' }}>
            <Grid item>
              <TextField
                disabled={!card?.name}
                size='small'
                variant='outlined'
                type='number'
                label='Amount'
                color='secondary'
                value={card?.amount || ''}
                inputProps={{
                  inputMode: 'numeric',
                  min: 1,
                }}
                onChange={e => handleCardInfoChange({ amount: e.target.value })}
                style={{ marginLeft: 0 }}
              />
            </Grid>

            <Grid item style={{ width: '9em', paddingTop: 8 }}>
              <TextField select
                disabled={!card?.name}
                color='secondary'
                variant='outlined'
                margin='dense'
                size='small'
                align='left'
                label='Condition'
                value={card?.condition || ''}
                onChange={e => handleCardInfoChange({ condition: e.target.value })}
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
                disabled={!card?.name}
                label='Foil'
                control={
                  <Checkbox
                    checked={Boolean(card?.foil)}
                    onChange={e => handleCardInfoChange({ foil: e.target.checked })}
                  />
                }
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                disabled={!card?.name}
                label='Signed'
                control={
                  <Checkbox
                    checked={Boolean(card?.signed)}
                    onChange={e => handleCardInfoChange({ signed: e.target.checked })}
                  />
                }
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                disabled={!card?.name}
                label='Altered'
                control={
                  <Checkbox
                    checked={Boolean(card?.altered)}
                    onChange={e => handleCardInfoChange({ altered: e.target.checked })}
                  />
                }
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                disabled={!card?.name}
                label='Misprint'
                control={
                  <Checkbox
                    checked={Boolean(card?.misprint)}
                    onChange={e => handleCardInfoChange({ misprint: e.target.checked })}
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
                  disabled={!card.name || printsSet?.length <= 1}
                  label='Set'
                  value={((!card.name && []) || printsSet || []).length === 0 ? '' : JSON.stringify(pick(card, ['id', 'set', 'collector_number']))}
                  onChange={e => {
                    const value = JSON.parse(e.target.value)
                    handleCardInfoChange(value)
                  }}
                  SelectProps={{
                    onClose: e => onMenuHover(card)
                  }}
                  InputProps={card?.name && printsSet?.length === 0
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
                          key={item.id}
                          value={JSON.stringify(pick(item, ['id', 'set', 'collector_number']))}
                          onMouseEnter={e => onMenuHover({ ...item, foil: card?.foil })}
                          onMouseLeave={e => onMenuHover(card)}
                        >
                          {`${item.set_name} [#${item.collector_number}]`}
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
                  label={card?.name ? 'Language' : 'Lang'}
                  disabled={!card.name || printsLang?.length <= 1}
                  value={((!card.name && []) || printsLang || []).length === 0 ? '' : card?.lang}
                  style={{ width: '6em' }}
                  onChange={e => handleCardInfoChange({ lang: e.target.value })}
                  SelectProps={{
                    onClose: e => onMenuHover(card)
                  }}
                  InputProps={card?.name && printsLang?.length === 0
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
                          onMouseEnter={e => onMenuHover({ ...item, foil: card?.foil })}
                          onMouseLeave={e => onMenuHover(card)}
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
                disabled={!card?.name}
                limitTags={4}
                label='Tags'
                variant='outlined'
                margin='dense'
                size='small'
                color='secondary'
                options={[]}
                value={card?.tag || []}
                onChange={(e, newValue) => { handleCardInfoChange({ tag: newValue }) }}
                onInputChange={(e, newInputValue) => {
                  if (newInputValue?.match(/[;,]/g)) {
                    const values = lodash
                      .chain(newInputValue)
                      .split(/[;,]/)
                      .map(v => v.trim())
                      .compact()
                      .uniqBy(v => v.toLowerCase())
                      .value()
                    if (values.length > 0)
                      handleCardInfoChange({ tag: card?.tag.concat(values) })
                    else
                      handleCardInfoChange({ tag: card?.tag })
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
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item container direction='row' justifyContent='flex-start' alignItems='center' xs={12} spacing={1}>
          <Grid item xs={12} align='left' component={Typography}>
            {
              newCards.length === 0
                ? <>
                  <Typography gutterBottom variant='h6'>
                    No new cards to add.
                  </Typography>
                  <Typography color='textSecondary' variant='body1'>
                    Start adding cards by entering a card name above and filling the appropriate fields.<br />
                    You may use the keyboard to navigate the fields and to select options.<br />
                    Press enter while the search bar is focused to add the current card to the list. If no text is present in the search bar, pressing enter will submit the form instead.
                  </Typography>
                </>
                : <Typography gutterBottom variant='h6'>
                  {
                    newCards.length === 1
                      ? `${newCards.length} card entry:`
                      : `${newCards.length} card entires:`
                  }
                </Typography>
            }
          </Grid>
          <Grid item component='ul' style={{ textAlign: 'left' }}>
            {
              newCards.map((card, i) => (
                <Typography component='li' variant='body1' key={i}>
                  {[
                    `x${card.amount}`,
                    card.name,
                    `[${card.set.toUpperCase()}]`,
                    `[#${card.collector_number}]`,
                    `[@${card.lang}]`,
                    card.foil ? `[F]` : '',
                  ].join(' ')}
                </Typography>
              ))
            }
          </Grid>
        </Grid>
      </Grid>


      {/* "ARE YOU SURE" MODAL */}
      <Grid container spacing={5} justifyContent='center' alignItems='center'
        component={Modal} closeAfterTransition
        onClose={closeModal}
        open={Boolean(modalOpen)}
        BackdropProps={{ timeout: 500 }}
      >
        <Grid item xs={8} sm={6} lg={4} component={Fade} in={Boolean(modalOpen)}>
          <Paper>
            <Grid container justifyContent='center' alignItems='center' spacing={1} className={classes.modal}>
              {
                (({ source, resolve, reject }) => {
                  switch (source) {
                    case 'delete':
                      return <>
                        <Grid item xs={12} align='center'>
                          <Typography noWrap variant='h5' align='left'>
                            Confirm Action
                          </Typography>
                          <Typography noWrap variant='body1' align='left'>
                            Are you sure you want to delete the selected card?
                          </Typography>
                          <Typography noWrap variant='body2' align='left' color='error'>
                            This action is irreversible.
                          </Typography>
                        </Grid>
                        <Grid item container justifyContent='flex-end' xs={12} spacing={1}>
                          <Grid item>
                            <Button variant='outlined' onClick={closeModal}>
                              Nop
                            </Button>
                          </Grid>
                          <Grid item>
                            {/* TODO: handle card delete */}
                            <Button variant='contained' color='secondary'>
                              Yep
                            </Button>
                          </Grid>
                        </Grid>
                      </>

                    case 'submit':
                      return <>
                        <Grid item xs={12} align='center'>
                          <Typography noWrap variant='h5' align='left'>
                            Confirm Action
                          </Typography>
                          <Typography noWrap variant='body1' align='left'>
                            Update {newCards.length} card {newCards.length > 1 ? 'entries' : 'entry'}?
                          </Typography>
                        </Grid>
                        <Grid item container justifyContent='flex-end' xs={12} spacing={1}>
                          <Grid item>
                            <Button variant='outlined' onClick={closeModal}>
                              Nop
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant='contained' color='secondary' onClick={() => resolve()}>
                              Yep
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
    ImportWizard
  )