import Scryfall from 'scryfall-client'
import filter from 'lodash/filter'

import MagicdexApi from "./MagicdexApi"
import { fetchScryfallCardData } from './MagicdexApi/utils'


/**
 * get card print information from scryfall.
 * @param {object} card
 * @param {string} type - search type, one of ['set', 'lang'], default 'set'
 */
const getCardPrints = async (card, type = 'set') => {
  const { oracle_id, set, collector_number } = card
  let res = []

  switch (type) {
    case 'lang':
      res = await Scryfall.search(`oracleid:${oracle_id}+set:${set}+lang:any+-is:digital`, {
        unique: 'prints',
        include_multilingual: true,
        include_extras: true,
      })
      res = filter(res, { collector_number })
      break

    default:
    case 'set':
      res = await Scryfall.search(`oracleid:${oracle_id}+-is:digital`, {
        unique: 'prints',
        order: 'released',
        dir: 'desc',
        include_variations: true,
        include_extras: true,
      })
      break
  }

  res = await fetchScryfallCardData(res)
  return res
}

export {
  MagicdexApi,
  getCardPrints,
}