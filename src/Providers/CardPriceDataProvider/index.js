import React, { useState, useEffect } from 'react'


const addCardPrice = (card, currency) => {
  const { prices, foil, amount } = card
  const price = Number(foil ? prices?.[`${currency}_foil`] : prices?.[currency])

  return {
    ...card,
    currency,
    price: price,
    total_price: price * amount,
  }
}


const CardPriceDataProvider = (props) => {
  /** VARS **/
  const {
    classes,
    children,
    data,
    currency,
    ...rest
  } = props
  const [cardPriceData, setCardPriceData] = useState(data)


  /** EFFECTS **/
  useEffect(() => {
    setCardPriceData(
      data instanceof Array && data.map(card => {
        const { prices, foil, amount } = card
        const price = Number(foil ? prices?.[`${currency}_foil`] : prices?.[currency])

        return {
          ...card,
          currency,
          price: price,
          total_price: price * amount,
        }
      }))
  }, [data, currency])


  /** RENDER **/
  return (
    React.Children.map(children, child =>
      React.cloneElement(child, {
        data: cardPriceData,
        ...rest,
      })
    )
  )
}

/** EXPORT **/
export default CardPriceDataProvider

export {
  addCardPrice,
}