import React, { useState, useEffect } from 'react'
// import _ from 'lodash'

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
    // console.log('setCardPriceData envoked with', { data, currency }) //DEBUG

    setCardPriceData(
      data.map(card => {
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