import { useState, useEffect, useImperativeHandle } from 'react'
import { Grid, TextField, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { useSnackbar } from 'notistack'
import compact from 'lodash/compact'
import upperFirst from 'lodash/upperFirst'
import Scryfall from 'scryfall-client'

import { getCardPrints } from '@/Api'
import useStyles from './styles'


const BulkImport = ({
  /** VARS **/
  refs: ref,
  updateHeight,
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
    let errors = []
    const lines = text
      .trim()
      .split('\n')
      .map(line => line.trim())


    for (let i = 0; i < lines.length; i++) {
      let words = compact(lines[i].split(/[\s]+/g)) // split on whitespaces (greedy)
      const card = { line: i }

      if (words.length === 0)
        continue


      // card.amount //
      if (words[0].match(/(^x[1-9][0-9]*$)|(^[1-9][0-9]*x$)/gi)) {
        // `x123` or `123x`
        card.amount = parseInt(words[0].replace(/x/gi, ''))
        words.splice(0, 1)
      }
      else if (words[0].match(/^[1-9][0-9]*$/g)) {
        // `123` with no `x`
        card.amount = parseInt(words[0])
        words.splice(0, 1)
      }
      else if (words[0].match(/(^x{2,}[0-9]+$)|(^[0-9]+x{2,}$)|(^[^x][0-9]+$)|((^[0-9]+[^x]$))/gi)) {
        errors.push({ line: i, message: `Invalid amount format.` })
      }
      else
        card.amount = 1


      // card.name //
      if (words[0].match(/^\[/g))
        errors.push({ line: i, message: `Card name cannot start with '['.` })

      while (words.length > 1 && words[1].match(/^[^[]/g)) // join words until we find a `[`
        words.splice(0, 2, words.slice(0, 2).join(' '))
      card.name = words.splice(0, 1)[0]


      // bracket options //
      while (words.length > 0) {
        //foil
        if (words[0].match(/^\[f\]$/gi))
          card.foil = true

        //set
        else if (words[0].match(/^\[\w+]$/g))
          card.set = words[0].replace(/[\]\[]/g, '')

        //collector number
        else if (words[0].match(/^\[#.+]$/g))
          card.collector_number = words[0].replace(/[#\]\[]/g, '')

        //lang
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
            throw new Error(`Card name not found: "${card.name}".`)
          }

          const setPrints = await getCardPrints(data, 'set')

          if (card.set) {
            flag = true
            for (const item of setPrints) {
              if (item.set.toLowerCase() === card.set.toLowerCase()) {
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
              throw new Error(`Set not found: "${card.set}".`)
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
              throw new Error(`Collector number not found: "${card.collector_number}".`)
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
            error: {
              line: card.line,
              message: error.message,
            },
          }
        }
      })
    )

    cards = cards.filter(card => {
      if (card.hasOwnProperty('error')) {
        errors.push(card.error)
        return false
      }
      return true
    })

    errors.sort((a, b) => a.line - b.line)
    return { cards, errors }
  }


  /** EFFECTS **/
  useEffect(() => {
    updateHeight() // update height on each render
  })


  /** HANDLERS **/
  const handleSubmit = async (e) => {
    if (cardListText.trim() === '')
      return Promise.reject(new Error('No cards to import'))

    const { cards, errors } = await bulkToCards(cardListText)

    if (errors.length > 0) {
      setErrorMessages(errors)
      return Promise.reject(new Error(errors))
    }

    return Promise.resolve(cards)
  }

  const handleReset = () => {
    setErrorMessages([])
    setCardListText('')
  }


  /** RENDER **/
  return (
    <Grid container justifyContent='center' alignItems='center' spacing={1}>
      {
        errorMessages.length > 0 &&
        <>
          <Grid item xs={12} component={Typography} color='error' variant='h6' align='left' style={{ marginLeft: 8 }}>
            We found errors in your card list
          </Grid>
          <Grid item container xs={12} direction='column' style={{ marginLeft: 8, marginBottom: 12 }}>
            {
              Object.values(errorMessages).map(({ line, message }, i) => (
                <Grid item key={i} component='li' align='left' style={{ whiteSpace: 'break-spaces', marginLeft: 12 }}>
                  <Typography color='error' align='left'>
                    {`Line ${line + 1}, \t${upperFirst(message)}`}
                  </Typography>
                </Grid>
              ))
            }
          </Grid>
        </>
      }

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