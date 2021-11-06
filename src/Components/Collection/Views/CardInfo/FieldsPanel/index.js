// import { useEffect } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'

import RenderCell from '@/CardRenders'


const FieldsPanel = (props) => {
  const {
    card,
    renderStyle = 'content',
    ...rest
  } = props
  const theme = useTheme()

  const [name, manaCost, typeLine, set, oracleText, flavorText, artist, collectorNumber, powerToughness] = [
    card && RenderCell({ card, columnName: 'name', renderStyle, theme, ...rest }),
    card && RenderCell({ card, columnName: 'mana_cost', renderStyle, theme, ...rest }),
    card && RenderCell({ card, columnName: 'type_line', renderStyle, theme, ...rest }),
    card && RenderCell({ card, columnName: 'set', renderStyle, theme, ...rest }),
    card && RenderCell({ card, columnName: 'oracle_text', renderStyle, theme, ...rest }),
    card && RenderCell({ card, columnName: 'flavor_text', renderStyle, theme, ...rest }),
    card && RenderCell({ card, columnName: 'artist', renderStyle, theme, ...rest }),
    card && RenderCell({ card, columnName: 'collector_number', renderStyle, theme, ...rest }),
    card && RenderCell({ card, columnName: 'power_toughness', renderStyle, theme, ...rest }),
  ]

  return (
    <Grid item container justifyContent='space-between' direction='column' style={{ height: '100%' }}>


      <Grid item container justifyContent='center' spacing={2}>
        <Grid item name='name'>
          {name}
        </Grid>
        {manaCost && <Grid item name='mana-cost'>
          {manaCost}
        </Grid>}
      </Grid>
      <Grid item container component={Box} justifyContent='center' spacing={1} flexGrow={1}>
        <Grid item name='type-line'>
          {typeLine}
        </Grid>
        <Grid item name='set'>
          {set}
        </Grid>
      </Grid>


      {oracleText && <Grid item name='oracle-text' component={Box} paddingTop={1} flexGrow={1}>
        {oracleText}
      </Grid>}
      {flavorText && <Grid item name='flavor-text' component={Box} align='left' flexGrow={1} paddingTop='0.45em'>
        {flavorText}
      </Grid>}


      <Grid item container justifyContent='space-between' alignItems='baseline' wrap='nowrap' component={Typography} variant='overline' style={{ marginTop: '0.3em' }}>
        <Grid item container spacing={1}>
          <Grid item name='collector-number'>
            #{collectorNumber}
          </Grid>
          <Grid item name='artist'>
            <span className='ms ms-shadow ms-artist-nib' />{artist}
          </Grid>
        </Grid>
        {powerToughness && <Grid item name='power-toughness'>
          {powerToughness}
        </Grid>}
      </Grid>
    </Grid>
  )
}

/** EXPORT **/
export default FieldsPanel