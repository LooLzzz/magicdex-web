import clsx from 'clsx'
import compact from 'lodash/compact'

import styles from './styles'


const utils = {
  addLeadingZero: (date) => (
    date < 10
      ? date = '0' + date
      : date
  ),

  toManaFont: (txt, props) => {
    if (typeof txt === 'string')
      txt = txt
        .replace(/(^{)|(\/)|(}$)/g, '') // remove starting '{', trailing '}' and any '/'
        .split('}{')
    return txt
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

  toColorIndicator: (txt, props) => {
    if (typeof txt === 'string')
      txt = txt
        .replace(/(^{)|(\/)|(}$)/g, '') // remove starting '{', trailing '}' and any '/'
        .split('}{')
    txt = compact(txt) // remove empty strings

    return txt
      .map((ci, i) => (
        <span
          key={i}
          {...props}
          style={{
            ...styles.colorIndicator,
            ...props?.style,
          }}
          className={clsx('ms', 'ms-ci', `ms-ci-${ci.length}`, `ms-ci-${ci.toLowerCase()}`)} />
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
    return compact(arr) // remove any empty strings
  }
}

export default utils

export const {
  addLeadingZero,
  toManaFont,
  toColorIndicator,
  transformStringArray,
} = utils