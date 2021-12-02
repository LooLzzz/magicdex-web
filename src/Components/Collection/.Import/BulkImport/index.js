import { useState, useImperativeHandle } from 'react'
import { Grid, TextField, Typography, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { useSnackbar } from 'notistack'
import compact from 'lodash/compact'
import Scryfall from 'scryfall-client'

import { getCardPrints } from '@/Api'
import useStyles from './styles'


const BulkImport = ({
  /** VARS **/
  refs: ref,
  ...props
}) => {
  const {
    classes,
  } = props
  const { enqueueSnackbar } = useSnackbar()

  const [cardListText, setCardListText] = useState('')
  const [errorMessages, setErrorMessages] = useState([])


  /** METHODS **/
  useImperativeHandle(ref, () => ({
    handleSubmit,
    reset: handleReset,
  }))

  const bulkToCards = async (text) => {
    let cards = []
    const lines = text
      .trim()
      .split('\n')
      .map(line => line.trim())

    for (let line of lines) {
      let words = compact(line.split(/[\s]+/g)) // split on whitespace (greedy)
      const card = {}

      // card.amount
      if (words[0].match(/(^x[1-9][0-9]*$)|(^[1-9][0-9]x$)/g)) {
        // `x123` or `123x`
        card.amount = parseInt(words[0].replace(/x/g, ''))
        words.splice(0, 1)
      }
      else if (words[0].match(/^[1-9][0-9]*$/g)) {
        // `123` with no `x`
        card.amount = parseInt(words[0])
        words.splice(0, 1)
      }
      else
        card.amount = 1


      // card.name
      if (words[0].match(/^\[/g))
        throw new Error('Card name cannot start with `[`')

      while (words.length > 1 && words[1].match(/^[^[]/g)) // join words until we find a `[`
        words.splice(0, 2, words.slice(0, 2).join(' '))
      card.name = words.splice(0, 1)[0]


      // bracket options
      while (words.length > 0) {
        if (words[0].match(/^\[f\]$/gi))
          card.foil = true

        else if (words[0].match(/^\[\w+]$/g))
          card.set = words[0].replace(/[\]\[]/g, '')

        else if (words[0].match(/^\[#.+]$/g))
          card.collector_number = words[0].replace(/[#\]\[]/g, '')

        else if (words[0].match(/^\[@[a-z]+]$/gi))
          card.lang = words[0].replace(/[\]\[]/g, '')

        words.splice(0, 1)
      }

      cards.push(card)
    }

    // add scryfall data using fuzzy search
    cards = await Promise.all(
      cards.map(async (card) => {
        let data = {}
        let flag = true

        try {
          try {
            data = await Scryfall.getCard(card.name, 'fuzzyName')
          }
          catch {
            throw new Error(`Card name not found: ${card.name}`)
          }

          const setPrints = await getCardPrints(data, 'set')

          if (card.set) {
            flag = true
            for (const item of setPrints) {
              if (item.set === card.set) {
                delete item.foil
                data = {
                  ...data,
                  ...item,
                }
                flag = false
                break
              }
            }
            if (flag)
              throw new Error(`Set not found: ${card.set}`)
          }

          if (card.collector_number) {
            flag = true
            for (const item of setPrints) {
              if (item.collector_number === card.collector_number) {
                delete item.foil
                data = {
                  ...data,
                  ...item,
                }
                flag = false
                break
              }
            }
            if (flag)
              throw new Error(`Collector number not found: ${card.collector_number}`)
          }

          if (card.lang) {
            const setLangs = await getCardPrints(data, 'lang')
            for (const item of setLangs) {
              if (item.lang === card.lang) {
                delete item.foil
                data = {
                  ...data,
                  ...item,
                }
                break
              }
            }
          }

          return {
            ...data,
            ...card,
            foil: Boolean(card.foil),
          }
        }
        catch (error) {
          console.error(error)
          return {
            card,
            error: error.message,
          }
        }
      })
    )

    let errors = []
    cards = cards.filter(card => {
      if (card.hasOwnProperty('error')) {
        errors.push(card)
        return false
      }
      return true
    })

    return { cards, errors }
  }


  /** HANDLERS **/
  const handleSubmit = async (e) => {
    return new Promise(async (resolve, reject) => {
      if (cardListText.trim() === '')
        reject('No cards to import')
      else {
        const { cards, errors } = await bulkToCards(cardListText)

        if (errors.length > 0) {
          setErrorMessages(errors.map(err => err.error))
          reject(errors)
        }
        else
          resolve(cards)
      }
    })
  }

  const handleReset = () => {
    setErrorMessages([])
    setCardListText('')
  }


  /** RENDER **/
  return (
    <Grid container justifyContent='center' alignItems='center' spacing={1}>
      <Grid item container xs={12} direction='column' style={{ marginLeft: 8 }}>
        {
          Object.values(errorMessages).map((value, i) => (
            <Grid item key={i} component={Typography} color='error' align='left'>
              {value[0].toUpperCase() + value.slice(1)} {/* capitalize first letter */}
            </Grid>
          ))
        }
      </Grid>

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
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    BulkImport
  )