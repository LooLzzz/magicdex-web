import clsx from 'clsx'

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
      .map(cost => (
        <span
          {...props}
          style={{
            ...styles.mana,
            ...props?.style,
          }}
          className={clsx('ms', 'ms-cost', 'ms-shadow', 'ms-fw', cost)} />
      ))
  }
}

export default utils

export const {
  addLeadingZero,
  textToManaFont,
} = utils