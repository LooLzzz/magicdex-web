import Scryfall from 'scryfall-client'
import filter from 'lodash/filter'

import MagicdexApi from "./MagicdexApi"
import { fetchScryfallCardData } from './MagicdexApi/utils'


/**
 * get card print information from scryfall.
 * @param {object} card - should include {'oracle_id', 'set', 'collector_number'}
 * @param {string} type - search type, one of ['set', 'lang'], default 'set'
 */
const getCardPrints = async (card, type = 'set') => {
  const { oracle_id, set, collector_number } = card
  let res = []

  switch (type) {
    case 'lang':
      try {
        res = await Scryfall.search(`oracleid:${oracle_id}+set:${set}+lang:any`, {
          unique: 'prints',
          include_multilingual: true,
          include_extras: true,
        })
        res = filter(res, { collector_number })
      }
      catch (err) {
        console.error({ error: err })
      }
      break

    default:
    case 'set':
      try {
        res = await Scryfall.search(`oracleid:${oracle_id}`, {
          unique: 'prints',
          order: 'released',
          dir: 'desc',
          include_variations: true,
          include_extras: true,
        })
      }
      catch (err) {
        console.err({ error: err })
      }
      break
  }

  res = await fetchScryfallCardData(res)
  return res
}

export {
  MagicdexApi,
  getCardPrints,
}