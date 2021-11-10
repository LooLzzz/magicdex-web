import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'


/** REDUX **/
const mapStateToProps = (state) => ({
  currency: state.actions.app.currency,
})


/** UTILS **/
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

/** COMPONENT **/
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
      data instanceof Array && data.map(card => addCardPrice(card, currency)))
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
export default
  connect(mapStateToProps)(
    CardPriceDataProvider
  )

export { addCardPrice }