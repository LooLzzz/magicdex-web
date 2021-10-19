import { Paper, Chip } from '@material-ui/core'
import _ from 'lodash'

import styles from './styles'
import utils from './utils'


/** Card render delegation helper function **/
const renderCell = ({ card, columnName, ...rest }) => {
  switch (columnName) {
    case 'name':
      return renders.renderName({ card, columnName, ...rest })

    case 'set':
      return renders.renderSet({ card, columnName, ...rest })

    case 'power_toughness':
      return renders.renderPowerToughness({ card, columnName, ...rest })

    case 'oracle':
    case 'oracle_text':
      return renders.renderOracleText({ card, columnName, ...rest })

    case 'signed':
    case 'altered':
    case 'foil':
      return renders.renderBoolean({ card, columnName, ...rest })

    case 'amount':
      return renders.renderAmount({ card, columnName, ...rest })

    case 'total_price':
    case 'price':
      return renders.renderPrice({ card, columnName, ...rest })

    case 'tag':
      return renders.renderTag({ card, columnName, ...rest })

    case 'mana_cost':
      return renders.renderManaCost({ card, columnName, ...rest })

    case 'type_line':
    case 'type':
      return renders.renderType({ card, columnName, ...rest })

    case 'date':
    case 'date_created':
    case 'date_added':
      return renders.renderDate({ card, columnName, ...rest })

    case 'flavor':
    case 'flavor_text':
      return renders.renderFlavorText({ card, columnName, ...rest })

    default:
      return renders.defaultRender({ card, columnName, ...rest })
  }
}


/** RENDERS **/
const renders = {
  defaultRender: ({ card, columnName, cardFace }) => {
    const { [columnName]: value } = cardFace !== undefined ? card.card_faces[cardFace] : card
    return (
      <span style={{ whiteSpace: 'pre-wrap' }}>
        {value}
      </span>
    )
  },

  renderName: ({ card, cardFace, renderStyle }) => {
    const { name } = cardFace !== undefined ? card.card_faces[cardFace] : card

    return renderStyle === 'content'
      ? <b>{name}</b>
      : name
  },

  renderOracleText: ({ card, columnName, cardFace, renderStyle }) => {
    let { [columnName]: oracleText } = cardFace !== undefined ? card.card_faces[cardFace] : card

    if (oracleText) {
      oracleText = [oracleText]

      /* handle `{X}` symbols */
      oracleText = utils.transformStringArray(
        oracleText,
        /\{/g,
        /\}/g,
        match => (
          utils.textToManaFont(match, {
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

      /* handle `\n` characters */
      oracleText = oracleText
        .map(text =>
          typeof text === 'string' && text.includes('\n')
            ? text.split('\n').map(line => <span>{line}<div style={{ height: '0.2rem' }} /></span>)
            : text
        )
    }

    return oracleText
      ? <span style={{ whiteSpace: 'pre-wrap' }}>
        {oracleText}
      </span>
      : ''
  },

  renderPowerToughness: ({ card, cardFace }) => {
    const { power, toughness } = cardFace !== undefined ? card.card_faces[cardFace] : card

    return power && toughness
      ? `${power}/${toughness}`
      : ''
  },

  renderSet: ({ card, theme }) => {
    const { set_data, rarity } = card
    const set = set_data?.parent_set_code ? set_data.parent_set_code : set_data.code
    return (
      <span
        className={['ss', 'ss-fw', `ss-${rarity}`, `ss-${set}`].join(' ')}
        style={{
          ...styles.set,
          ...(rarity === 'common' && theme.palette.type === 'dark' ? { color: '#CCCCCC' } : {})
        }}
      />
    )
  },

  renderBoolean: ({ card, columnName }) => (
    card[columnName].toString() === 'true' ? '✔' : '✖'
  ),

  renderAmount: ({ card }) => (
    <Paper component='span' className='floating'>
      {'x' + card.amount}
    </Paper>
  ),

  renderPrice: ({ card, columnName }) => {
    const { [columnName]: price, currency } = card
    return (
      price > 0
        ? currency === 'usd'
          ? '$' + price
          : price + '€'
        : '-'
    )
  },

  renderTag: ({ card, columnName }) => {
    let { [columnName]: tags } = card

    return (
      tags.length > 0
        ? //tags.join('; ')
        tags.map((tag, i) =>
          <Chip
            onDelete={() => {/*TODO: add delete functionality to tag chips */ }}
            label={tag}
            size='small'
            key={i}
          />
        )
        : '-'
    )
  },

  renderManaCost: ({ card, columnName, cardFace }) => {
    let { [columnName]: manaCost } = cardFace !== undefined ? card.card_faces[cardFace] : card

    if (!(manaCost instanceof Array))
      manaCost = [manaCost]
    manaCost = _.compact(manaCost)

    if (manaCost.length === 0)
      return '-'

    manaCost = manaCost.map(cost => utils.textToManaFont(cost))
    if (manaCost.length > 1)
      manaCost.splice(1, 0, ' // ') // add a separator between the two mana costs
    return manaCost
  },

  renderType: ({ card, columnName, cardFace, renderStyle }) => {
    const { [columnName]: typeLine } = cardFace !== undefined ? card.card_faces[cardFace] : card

    return renderStyle === 'content'
      ? typeLine
        .replace(/—/g, '-')
      : typeLine
        .replace(/—/g, '-')
        .replace(/Legendary/g, 'Lgd.')
  },

  renderDate: ({ card, columnName }) => {
    const date = new Date(card[columnName])
    let [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]

    return (
      [utils.addLeadingZero(day), utils.addLeadingZero(month), year].join('/')
    )
  },

  renderFlavorText: ({ card, cardFace }) => {
    const { flavor_text } = cardFace !== undefined ? card.card_faces[cardFace] : card

    return (
      flavor_text &&
      <div style={styles.flavorText}>
        {flavor_text}
      </div>
    )
  },
}

/** EXPORTS **/
export default renderCell

export const {
  defaultRender,
  renderName,
  renderOracleText,
  renderPowerToughness,
  renderSet,
  renderBoolean,
  renderAmount,
  renderPrice,
  renderTag,
  renderManaCost,
  renderType,
  renderDate,
  renderFlavorText,
} = renders
