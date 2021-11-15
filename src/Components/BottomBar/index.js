import { withStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'

import useStyles from './styles'


const BottomBar = ({
  /** VARS **/
  ...props
}) => {
  const {
    classes,
  } = props

  const Link = ({ href, children }) => <a rel='noreferrer' target='_blank' href={href}>{children}</a>
  const LooLzzz = () => <Link href='https://github.com/LooLzzz'>LooLzzz</Link>
  const Bedopear = () => <Link href='https://github.com/Yarintop'>Bedopear</Link>
  const Scryfall = () => <Link href='https://scryfall.com/'>Scryfall.com</Link>
  const ScryfallClient = () => <Link href='https://www.npmjs.com/package/scryfall-client'>Scryfall-Client</Link>


  /** RENDER **/
  return (
    <Grid item container justifyContent='center' alignContent='center' align='center' className={classes.appBar} spacing={1}>
      <Grid item xs={12}
        component={Typography} variant='caption'
      >
        Made with <span style={{ color: 'red' }}>❤</span> by <LooLzzz /> and <Bedopear />
      </Grid>
      <Grid item xs={12}
        component={Typography} variant='caption'
      >
        Powered by <Scryfall /> via <ScryfallClient />
      </Grid>
    </Grid>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    BottomBar
  )