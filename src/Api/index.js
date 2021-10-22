import * as MagicdexApi from "./MagicdexApi"
import Scryfall from 'scryfall-client'

/**
 * get card print information from scryfall.
 * @param {object} card
 * @param {string} type - search type, one of ['set', 'lang'], default 'set'
 */
const getCardPrints = (card, type = 'set') => {
  const { oracle_id, set } = card

  return type === 'lang'
    ? Scryfall.search(`oracleid:${oracle_id}+set:${set}+lang:any`, {
      unique: 'prints',
      include_multilingual: true,
      include_extras: true,
    })
    : Scryfall.search(`oracleid:${oracle_id}`, {
      unique: 'prints',
      include_variations: true,
      include_extras: true,
    })
}

export {
  MagicdexApi,
  getCardPrints,
}