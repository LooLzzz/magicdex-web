/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/styles'

import useStyles from './styles'


const CardImage = (props) => {
  /** VARS **/
  const [src, setSrc] = useState()
  const {
    classes,
    card,
    ...rest
  } = props


  /** EFFECTS **/
  useEffect(() => {
    const { image_uris, card_faces } = (card || { image_uris: { normal: '/cardback.png' } })

    if (card_faces)
      setSrc(card_faces[0].image_uris.png)
    else
      setSrc(image_uris?.normal)
  }, [card])


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <img
      alt='card'
      src={src}
      {...rest}
    />
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    CardImage
  )