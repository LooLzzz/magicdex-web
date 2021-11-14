import { Fragment, memo } from 'react'
import { useTheme, useMediaQuery, Chip, Hidden, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import _ from 'lodash'

// import { EllipsisText } from '@/Components'
import utils from './utils'
import useStyles from './styles'


/** Card render delegation helper function **/
const RenderCell = ({ card, columnName, ...rest }) => {
  columnName = columnName.replace(/[ ]+/g, '_')
  const props = { card, columnName, ...rest }

  switch (columnName) {
    case 'name':
      return <renders.RenderName {...props} />

    case 'set':
      return <renders.RenderSet {...props} />

    case 'condition':
      return <renders.RenderCondition {...props} />

    case 'power_toughness':
      return <renders.RenderPowerToughness {...props} />

    case 'oracle':
    case 'oracle_text':
      return <renders.RenderOracleText {...props} />

    case 'signed':
    case 'altered':
    case 'misprint':
    case 'foil':
      return <renders.RenderBoolean {...props} />

    case 'amount':
      return <renders.RenderAmount {...props} />

    case 'total_price':
    case 'price':
      return <renders.RenderPrice {...props} />

    case 'tag':
      return <renders.RenderTag {...props} />

    case 'mana_cost':
      return <renders.RenderManaCost {...props} />

    case 'type_line':
    case 'type':
      return <renders.RenderType {...props} />

    case 'date':
    case 'date_created':
    case 'date_added':
      return <renders.RenderDate {...props} />

    case 'flavor':
    case 'flavor_text':
      return <renders.RenderFlavorText {...props} />

    default:
      return <renders.DefaultRender {...props} />
  }
}


/** RENDERS **/
const renders = {
  DefaultRender: withStyles(useStyles)(memo(
    ({ classes, card, columnName, cardFace }) => {
      let { [columnName]: value } = cardFace !== undefined ? card.card_faces[cardFace] : card
      value = value || card[columnName]

      return (
        value
          ? <span className={classes.preWrap}>
            {value}
          </span>
          : ''
      )
    }
  )),

  RenderName: withStyles(useStyles)(memo(
    ({ classes, card, cardFace, renderStyle = 'row' }) => {
      let { name } = cardFace !== undefined ? card.card_faces[cardFace] : card
      const lgDown = useMediaQuery(theme => theme.breakpoints.down('md'))

      switch (renderStyle) {
        default:
        case 'row':
          name = name
            .replace(/—/g, '-')
            .replace(/Legendary/g, 'Lgd.')
          const arr = name
            .split('//')
            .map(v => v.trim())
          return (
            <Typography noWrap variant='body2' className={classes.widthLimit} title={lgDown ? name : ''}>
              {arr[0]}
              {
                arr.length > 1 &&
                <Hidden mdDown>{' // ' + arr[1]}</Hidden>
              }
            </Typography>
          )

        case 'content':
          return <b>{name}</b>
      }
    }
  )),

  RenderOracleText: withStyles(useStyles)(memo(
    ({ classes, card, columnName = 'oracle_text', cardFace }) => {
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
              className: classes.mana,
              style: {
                fontSize: '0.68em',
                transform: 'translateY(-1px)'
              }
            })
          )
        )

        /* handle `(http://...)` paragraphs */
        oracleText = utils.transformStringArray(
          oracleText,
          /\(http/g,
          /\)/g,
          match => {
            match = match.slice(1, -1)
            return (
              <span style={{ fontStyle: 'italic', fontSize: '0.88em', lineBreak: 'anywhere' }}>
                {'('}
                <a href={match}>{match}</a>
                {')'}
              </span>
            )
          }
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
          <div align={align} className={classes.preWrap}>
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
    }
  )),

  RenderPowerToughness: withStyles(useStyles)(memo(
    ({ classes, card, cardFace }) => {
      const { power, toughness } = cardFace !== undefined ? card.card_faces[cardFace] : card

      return power && toughness
        ?
        <span align='right' style={{ fontSize: '1rem' }}>
          {`${power}/${toughness}`}
        </span>
        : ''
    }
  )),

  RenderSet: withStyles(useStyles)(memo(
    ({ classes, card, renderStyle = 'row' }) => {
      const theme = useTheme()
      const { set_data, rarity, foil } = card
      const set = set_data?.parent_set_code ? set_data.parent_set_code : set_data.code
      return (
        <span
          className={`${classes.set} ss ss-fw ss-${rarity} ss-${set}`}
          title={renderStyle === 'content' ? `${set_data.name} - ${_.upperFirst(rarity)}${foil ? ' [F]' : ''}` : null}
          style={{
            ...(rarity === 'common' && theme.palette.type === 'dark' ? { color: '#CCCCCC' } : {})
          }}
        />
      )
    }
  )),

  RenderBoolean: withStyles(useStyles)(memo(
    ({ classes, card, columnName, renderStyle = 'row' }) => {
      const { [columnName]: value } = card

      switch (renderStyle) {
        default:
        case 'row':
          return value.toString() === 'true'
            ? <Chip className={classes.chip} label='✔' size='small' />
            : <Chip className={classes.chip} label='✖' size='small' />

        case 'content':
          return value.toString() === 'true'
            ? <Chip className={classes.chip} label='Yes' size='small' color='secondary' />
            : <Chip className={classes.chip} label='No' size='small' />
      }
    }
  )),

  RenderCondition: withStyles(useStyles)(memo(
    ({ classes, card }) => {
      const theme = useTheme()
      const cond = card.condition.toUpperCase()

      const condStyles = (cond) => {
        const toStyle = (rgb) => ({
          backgroundColor: rgb,
          color: theme.palette.getContrastText(rgb),
        })
        const colors = {
          NM: '#ffce10',
          LP: '#ff9f10',
          MP: '#ff9010',
          HP: '#e84c10',
          DAMAGED: '#c41313',
        }

        return toStyle(colors[cond])
      }

      return (
        <code className={`${classes.condition}`} style={condStyles(cond)}>
          {cond}
        </code>
      )
    }
  )),

  RenderAmount: withStyles(useStyles)(memo(
    ({ classes, card }) => (
      <Chip
        className={classes.chip}
        label={'x' + card.amount}
        size='small'
      />
    )
  )),

  RenderPrice: withStyles(useStyles)(memo(
    ({ classes, card, columnName = 'price' }) => {
      let { [columnName]: price, currency } = card
      price = utils.limitPrecision(price, 2)
      return (
        price > 0
          ? currency === 'usd'
            ? '$' + price
            : price + '€'
          : '-'
      )
    }
  )),

  RenderTag: withStyles(useStyles)(memo(
    ({ classes, card, columnName = 'tags', renderStyle = 'row' }) => {
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
    }
  )),

  RenderManaCost: withStyles(useStyles)(memo(
    ({ classes, card, columnName = 'mana_cost', cardFace, renderStyle = 'row' }) => {
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

      manaCost = manaCost.map(cost => utils.toManaFont(cost, { className: classes.mana, style: { marginRight: '0.25em', fontSize: '0.85em' } }))
      if (manaCost.length > 1)
        manaCost.splice(1, 0, ' // ') // add a separator between the two mana costs
      return (
        <Typography variant="body2" noWrap>
          {
            cmc
              ? <span title={`${cmc} Cmc`}>
                {manaCost}
              </span>
              : manaCost
          }
        </Typography>
      )
    }
  )),

  RenderType: withStyles(useStyles)(memo(
    ({ classes, card, columnName = 'type_line', cardFace, renderStyle = 'row' }) => {
      let { [columnName]: typeLine, color_indicator: colorIndicator } = cardFace !== undefined ? card.card_faces[cardFace] : card
      const lgDown = useMediaQuery(theme => theme.breakpoints.down('md'))

      switch (renderStyle) {
        default:
        case 'row':
          typeLine = typeLine
            .replace(/—/g, '-')
            .replace(/Legendary/g, 'Lgd.')
          const arr = typeLine
            .split('//')
            .map(v => v.trim())
          return (
            <Typography noWrap variant='body2' className={classes.widthLimit} title={lgDown ? typeLine : ''}>
              {arr[0]}
              {
                arr.length > 1 &&
                <Hidden mdDown>{' // ' + arr[1]}</Hidden>
              }
            </Typography>
          )

        case 'content':
          typeLine = typeLine.replace(/—/g, '-')
          colorIndicator = colorIndicator && utils.toColorIndicator(colorIndicator, { style: { marginRight: '0.25em', fontSize: '0.9em' } })
          return (
            colorIndicator
              ? <>{colorIndicator}{typeLine}</>
              : typeLine
          )
      }
    }
  )),

  RenderDate: withStyles(useStyles)(memo(
    ({ classes, card, columnName = 'date_added' }) => {
      const date = new Date(card[columnName])
      let [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]

      return (
        [utils.addLeadingZero(day), utils.addLeadingZero(month), year].join('/')
      )
    }
  )),

  RenderFlavorText: withStyles(useStyles)(memo(
    ({ classes, card, cardFace }) => {
      const { flavor_text } = cardFace !== undefined ? card.card_faces[cardFace] : card
      let align = _.words(flavor_text).length > 2 ? 'left' : 'center'

      return (
        flavor_text
          ? <div align={align} className={classes.flavorText}>
            {flavor_text}
          </div>
          : ''
      )
    }
  )),
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
