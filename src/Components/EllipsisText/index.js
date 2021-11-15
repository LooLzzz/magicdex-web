/* eslint-disable no-lone-blocks */

import { useState, useEffect } from 'react'
import { useMediaQuery } from '@material-ui/core'


const EllipsisText = ({
  /** VARS **/
  text,
  maxLength = undefined,
  ...props
}) => {
  const {
    ...rest
  } = props
  const [outputText, setOutputText] = useState()
  const xsDown = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'))


  /** EFFECTS **/
  useEffect(() => {
    setOutputText(state => {
      let _maxLength = maxLength ?? (
        xsDown
          ? 10
          : smDown
            ? 15
            : mdDown
              ? 20
              : Number.MAX_SAFE_INTEGER
      )

      return text.length > _maxLength
        ? (
          <span title={text}>
            {text.substring(0, _maxLength) + '...'}
          </span>
        )
        : text
    })

  }, [text, maxLength, xsDown, smDown, mdDown])


  /** RENDER **/
  return (
    <span {...rest}>
      {outputText}
    </span>
  )
}

/** EXPORT **/
export default EllipsisText
