import { Paper, Chip, Divider } from '@material-ui/core'
import clsx from 'clsx'
import _ from 'lodash'


/** UTILS **/
const addLeadingZero = (date) => (
  date < 10
    ? date = '0' + date
    : date
)


/** STYLES **/
const styles = {
  mana: {
    marginRight: '0.25em',
    fontSize: '0.85em',
  },
  set: {
    fontSize: '1.25em',
  },
  flavorText: {
    fontStyle: 'italic',
    fontFamily: 'Georgia, fangsong, Times New Roman',
    whiteSpace: 'pre-wrap',
    marginTop: '0.75rem',
  },
}


/** CUSTOM ROW RENDERS **/
const renders = {
  renderCell: (card, columnName) => {
    switch (columnName) {
      case 'set':
        return renderSet(card, columnName)

      case 'signed':
      case 'altered':
      case 'foil':
        return renderBoolean(card, columnName)

      case 'amount':
        return renderAmount(card, columnName)

      case 'total_price':
      case 'price':
        return renderPrice(card, columnName)

      case 'tag':
        return renderTag(card, columnName)

      case 'mana_cost':
        return renderManaCost(card, columnName)

      case 'type_line':
      case 'type':
        return renderType(card, columnName)

      case 'date':
      case 'date_created':
      case 'date_added':
        return renderDate(card, columnName)

      case 'flavor':
      case 'flavor_text':
        return renderFlavorText(card, columnName)


      default:
        return defaultRender(card, columnName)
    }
  },

  defaultRender: (card, columnName) => (
    card[columnName].toString()
  ),

  renderSet: (card) => {
    const { set_data, rarity } = card
    const set = set_data?.parent_set_code ? set_data.parent_set_code : set_data.code
    return (
      <span
        style={styles.set}
        className={['ss', 'ss-fw', `ss-${rarity}`, `ss-${set}`].join(' ')}
      >
      </span>
    )
  },

  renderBoolean: (card, columnName) => (
    card[columnName].toString() === 'true' ? '✔' : '✖'
  ),

  renderAmount: (card, columnName) => (
    <Paper component='span' className='floating'>
      {'x' + card.amount}
    </Paper>
  ),

  renderPrice: (card, columnName) => {
    const { [columnName]: price, currency } = card
    return (
      price > 0
        ? currency === 'usd'
          ? '$' + price
          : price + '€'
        : '-'
    )
  },

  renderTag: (card, columnName) => {
    let tags = card['tag']
    // console.log(tags) //DEBUG
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

  renderManaCost: (card, columnName) => {
    const { mana_cost: manaCost } = card

    return !manaCost || manaCost === ''
      ? '-'
      : manaCost
        .replace(/(^{)|(\/)|(}$)/g, '') // remove starting '{', trailing '}' and any '/'
        .split('}{')
        .map(sym => sym ? `ms-${sym.toLowerCase()}` : '')
        .map(cost => (
          <span
            style={styles.mana}
            className={clsx('ms', 'ms-fw', 'ms-cost', 'ms-shadow', cost)} />
        ))
  },

  renderType: (card, columnName) => (
    card[columnName]
      .replace('—', '-')
      .replace('Legendary', 'Lgd.')
  ),

  renderDate: (card, columnName) => {
    const date = new Date(card[columnName])
    let [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()]
    return (
      [addLeadingZero(day), addLeadingZero(month), year].join('/')
    )
  },

  renderFlavorText: (card, columnName) => {
    let {
      [columnName]: flavorText,
      card_faces: cardFaces,
    } = card

    flavorText = _.compact(
      cardFaces?.length > 1 //isDfc
        ? [cardFaces[0].flavor_text, cardFaces[1].flavor_text]
        : [flavorText]
    )

    return (
      flavorText.length > 0 && (
        <>
          <Divider variant='middle' style={styles.flavorText} />
          {
            flavorText.map((text, i) => (
              <div key={i} style={styles.flavorText}>
                {text}
              </div>
            ))
          }
        </>
      )
    )
  },
}

/** EXPORTS **/
export default renders.renderCell

export const {
  renderCell,
  defaultRender,
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
