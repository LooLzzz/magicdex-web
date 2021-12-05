import CardPriceDataProvider, { addCardPrice } from './CardPriceDataProvider'
import FilteredDataProvider from './FilteredDataProvider'
import intersectionWith from 'lodash/intersectionWith'


const addLayoutKeywords = (card) => {
  const arrayContains = (array, values, type = 'some') => {
    array = array
      ? array instanceof Array
        ? array
        : [array]
      : []
    values = values
      ? values instanceof Array
        ? values
        : [values]
      : []

    const intersection = intersectionWith(array, values,
      (a, b) => a.includes(b)
    )
    switch (type) {
      case 'some':
        return intersection.length > 0
      case 'every':
        return intersection.length === values.length
      default:
        return false
    }
  }

  return {
    ...card,
    is_transform: arrayContains(card.layout, ['modal', 'transform']),
    is_split: arrayContains(card.layout, ['split', 'fuse']),
    is_flip: arrayContains(card.layout, ['flip']),
  }
}

export {
  CardPriceDataProvider,
  FilteredDataProvider,
  addCardPrice,
  addLayoutKeywords,
}