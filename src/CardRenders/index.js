import { Fragment, useEffect } from 'react'
import { useTheme, Paper, Chip, Hidden } from '@material-ui/core'
import _ from 'lodash'

import { EllipsisText } from '@/Components'
import utils from './utils'
import styles from './styles'


/** Card render delegation helper function **/
const RenderCell = ({ card, columnName, ...rest }) => {
  columnName = columnName.replace(/[ ]+/g, '_')

  switch (columnName) {
    case 'name':
      return renders.RenderName({ card, columnName, ...rest })

    case 'set':
      return renders.RenderSet({ card, columnName, ...rest })

    case 'power_toughness':
      return renders.RenderPowerToughness({ card, columnName, ...rest })

    case 'oracle':
    case 'oracle_text':
      return renders.RenderOracleText({ card, columnName, ...rest })

    case 'signed':
    case 'altered':
    case 'misprint':
    case 'foil':
      return renders.RenderBoolean({ card, columnName, ...rest })

    case 'amount':
      return renders.RenderAmount({ card, columnName, ...rest })

    case 'total_price':
    case 'price':
      return renders.RenderPrice({ card, columnName, ...rest })

    case 'tag':
      return renders.RenderTag({ card, columnName, ...rest })

    case 'mana_cost':
      return renders.RenderManaCost({ card, columnName, ...rest })

    case 'type_line':
    case 'type':
      return renders.RenderType({ card, columnName, ...rest })

    case 'date':
    case 'date_created':
    case 'date_added':
      return renders.RenderDate({ card, columnName, ...rest })

    case 'flavor':
    case 'flavor_text':
      return renders.RenderFlavorText({ card, columnName, ...rest })

    default:
      return renders.DefaultRender({ card, columnName, ...rest })
  }
}


/** UTILS **/
const limitPrecision = (num, precision = 2) => {
  precision = 10 ** precision

  return Math.round(Number(num) * precision) / precision
}


/** RENDERS **/
const renders = {
  DefaultRender: ({ card, columnName, cardFace }) => {
    let { [columnName]: value } = cardFace !== undefined ? card.card_faces[cardFace] : card
    value = value || card[columnName]

    return (
      value &&
      <span style={{ whiteSpace: 'pre-wrap' }}>
        {value}
      </span>
    )
  },

  RenderName: ({ card, cardFace, renderStyle = 'row' }) => {
    let { name } = cardFace !== undefined ? card.card_faces[cardFace] : card

    switch (renderStyle) {
      default:
      case 'row':
        return (
          name.includes('//')
            ? name
              .split('//')
              .map((value, i) => {
                value = value.trim()
                return i === 0
                  ?
                  <EllipsisText key={i}
                    text={value}
                  />
                  : <Hidden lgDown key={i}>
                    {' // ' + value}
                  </Hidden>
              })
            : name
        )

      case 'content':
        return <b>{name}</b>
    }
  },

  RenderOracleText: ({ card, columnName = 'oracle_text', cardFace }) => {
    let { [columnName]: oracleText } = cardFace !== undefined ? card.card_faces[cardFace] : card
    let align = _.words(oracleText).length > 2 ? 'left' : 'center'

    if (oracleText) {
      oracleText = [oracleText]

      /* handle `{X}` symbols */
      oracleText = utils.transformStringArray(
        oracleText,
        /\{/g,
        /\}/g,
        match => (
          utils.toManaFont(match, {
            style: {
              fontSize: '0.68em',
              transform: 'translateY(-1px)'
            }
          })
        )
      )

      /* handle `(...)` paragraphs */
      oracleText = utils.transformStringArray(
        oracleText,
        /\(/g,
        /\)/g,
        match => (
          <span style={{ fontStyle: 'italic', fontSize: '0.88em' }}>{match}</span>
        )
      )
    }

    return (
      oracleText
        ?
        <div align={align} style={{ whiteSpace: 'pre-wrap' }}>
          {
            oracleText.map((text, i) =>
              <Fragment key={i}>
                {text}
              </Fragment>
            )
          }
        </div>
        : ''
    )
  },

  RenderPowerToughness: ({ card, cardFace }) => {
    const { power, toughness } = cardFace !== undefined ? card.card_faces[cardFace] : card

    return power && toughness
      ?
      <span align='right' style={{ fontSize: '1rem' }}>
        {`${power}/${toughness}`}
      </span>
      : ''
  },

  RenderSet: ({ card, renderStyle = 'row' }) => {
    const theme = useTheme()
    const { set_data, rarity, foil } = card
    const set = set_data?.parent_set_code ? set_data.parent_set_code : set_data.code
    return (
      <span
        className={`ss ss-fw ss-${rarity} ss-${set}`}
        title={renderStyle === 'content' ? `${set_data.name} - ${_.upperFirst(rarity)}${foil ? ' [F]' : ''}` : null}
        style={{
          ...styles.set,
          ...(rarity === 'common' && theme.palette.type === 'dark' ? { color: '#CCCCCC' } : {})
        }}
      />
    )
  },

  RenderBoolean: ({ card, columnName, renderStyle = 'row' }) => {
    const { [columnName]: value } = card

    switch (renderStyle) {
      default:
      case 'row':
        return value.toString() === 'true' ? '✔' : '✖'

      case 'content':
        return value
          ? <Chip label='Yes' size='small' color='primary' />
          : ''
    }
  },

  RenderAmount: ({ card }) => (
    <Paper component='span' className='floating'>
      {'x' + card.amount}
    </Paper>
  ),

  RenderPrice: ({ card, columnName = 'price' }) => {
    let { [columnName]: price, currency } = card
    price = limitPrecision(price, 2)
    return (
      price > 0
        ? currency === 'usd'
          ? '$' + price
          : price + '€'
        : '-'
    )
  },

  RenderTag: ({ card, columnName = 'tags', renderStyle = 'row' }) => {
    let { [columnName]: tags } = card

    return (
      tags.length > 0
        ? tags.map((tag, i) =>
          <Chip
            key={i}
            label={tag}
            size='small'
          />
        )
        : ''
    )
  },

  RenderManaCost: ({ card, columnName = 'mana_cost', cardFace, renderStyle = 'row' }) => {
    let { [columnName]: manaCost, cmc } = cardFace !== undefined ? card.card_faces[cardFace] : card
    manaCost = manaCost || []

    if (!(manaCost instanceof Array))
      if (manaCost.includes('//'))
        manaCost = manaCost.split('//').map(v => v.trim())
      else
        manaCost = [manaCost]
    manaCost = _.compact(manaCost)

    if (manaCost.length === 0)
      return renderStyle === 'row' ? '-' : ''

    manaCost = manaCost.map(cost => utils.toManaFont(cost))
    if (manaCost.length > 1)
      manaCost.splice(1, 0, ' // ') // add a separator between the two mana costs
    return (
      cmc
        ? <span title={`${cmc} Cmc`}>
          {manaCost}
        </span>
        : manaCost
    )
  },

  RenderType: ({ card, columnName = 'type_line', cardFace, renderStyle = 'row' }) => {
    let { [columnName]: typeLine, color_indicator: colorIndicator } = cardFace !== undefined ? card.card_faces[cardFace] : card

    switch (renderStyle) {
      default:
      case 'row':
        typeLine = typeLine
          .replace(/—/g, '-')
          .replace(/Legendary/g, 'Lgd.')
        return (
          typeLine.includes('//')
            ? typeLine
              .split('//')
              .map((type, i) => {
                type = type.trim()
                return i === 0
                  ? <Fragment key={i}>{type}</Fragment>
                  : <Hidden lgDown key={i}>{' // ' + type}</Hidden>
              })
            : typeLine
        )

      case 'content':
        typeLine = typeLine.replace(/—/g, '-')
        colorIndicator = colorIndicator && utils.toColorIndicator(colorIndicator)
        return (
          colorIndicator
            ? <>{colorIndicator}{typeLine}</>
            : typeLine
        )
    }
  },

  RenderDate: ({ card, columnName = 'date_added' }) => {
    const date = new Date(card[columnName])
    let [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]

    return (
      [utils.addLeadingZero(day), utils.addLeadingZero(month), year].join('/')
    )
  },

  RenderFlavorText: ({ card, cardFace }) => {
    const { flavor_text } = cardFace !== undefined ? card.card_faces[cardFace] : card
    let align = _.words(flavor_text).length > 2 ? 'left' : 'center'

    return (
      flavor_text &&
      <div align={align} style={styles.flavorText}>
        {flavor_text}
      </div>
    )
  },
}

/** EXPORTS **/
export default RenderCell

export const {
  DefaultRender,
  RenderName,
  RenderOracleText,
  RenderPowerToughness,
  RenderSet,
  RenderBoolean,
  RenderAmount,
  RenderPrice,
  RenderTag,
  RenderManaCost,
  RenderType,
  RenderDate,
  RenderFlavorText,
} = renders
