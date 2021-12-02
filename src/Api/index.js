import Scryfall from 'scryfall-client'
import filter from 'lodash/filter'

import MagicdexApi from "./MagicdexApi"
import { fetchScryfallCardData } from './MagicdexApi/utils'


/**
 * get card print information from scryfall.
 * @param {object} card - should include {'oracle_id', 'set', 'collector_number'}
 * @param {string} type - search type, one of ['set', 'lang', 'both'], default 'set'
 */
const getCardPrints = async (card, type = 'set') => {
  const { oracle_id, set, collector_number } = card
  let res = []

  /** METHODS **/
  const getLangs = async () => {
    res = await Scryfall.search(`oracleid:${oracle_id}+set:${set}+lang:any`, {
      unique: 'prints',
      include_multilingual: true,
      include_extras: true,
    })
    res = filter(res, { collector_number })
    return res
  }

  const getSets = async () => {
    res = await Scryfall.search(`oracleid:${oracle_id}`, {
      unique: 'prints',
      order: 'released',
      dir: 'desc',
      include_variations: true,
      include_extras: true,
    })
    return res
  }

  /** FUNCTION MAPPING **/
  switch (type) {
    case 'both':
      try {
        res = {
          lang: await getLangs(),
          set: await getSets(),
        }
      }
      catch (err) {
        console.error({ error: err })
      }
      break

    case 'lang':
      try {
        res = await getLangs()
      }
      catch (err) {
        console.error({ error: err })
      }
      break

    default:
    case 'set':
      try {
        res = await getSets()
      }
      catch (err) {
        console.error({ error: err })
      }
      break
  }

  /** RETURN VALUE **/
  res = await fetchScryfallCardData(res)
  return res
}

export {
  MagicdexApi,
  getCardPrints,
}