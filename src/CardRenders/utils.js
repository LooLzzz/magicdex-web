import clsx from 'clsx'
import _ from 'lodash'

import styles from './styles'


const utils = {
  addLeadingZero: (date) => (
    date < 10
      ? date = '0' + date
      : date
  ),

  textToManaFont: (txt, props) => {
    return txt
      .replace(/(^{)|(\/)|(}$)/g, '') // remove starting '{', trailing '}' and any '/'
      .split('}{')
      .map(sym => {
        switch (sym) {
          default:
            return sym

          case 'T':
            return 'tap'
        }
      })
      .map(sym => sym ? `ms-${sym.toLowerCase()}` : '')
      .map((cost, i) => (
        <span
          key={i}
          {...props}
          style={{
            ...styles.mana,
            ...props?.style,
          }}
          className={clsx('ms', 'ms-cost', 'ms-shadow', 'ms-fw', cost)} />
      ))
  },

  transformStringArray: (arr, searchStart, searchEnd, strTransformation) => {
    for (let i = 0; i < arr.length; i++) {
      let str = arr[i]
      if (typeof str !== 'string')
        continue

      let startIdx = str.search(searchStart)
      let endIdx = str.search(searchEnd)

      if (startIdx === -1 || endIdx === -1)
        continue

      let substr = str.substring(startIdx, endIdx + 1) // include search characters
      let transformed = strTransformation(substr)
      transformed = transformed instanceof Array ? transformed : [transformed]
      // replace element at index i with transformed string
      arr.splice(i, 1,
        str.substring(0, startIdx),
        ...transformed,
        str.substring(endIdx + 1)
      )
    }
    return _.compact(arr) // remove any empty strings
  }
}

export default utils

export const {
  addLeadingZero,
  textToManaFont,
  transformStringArray,
} = utils