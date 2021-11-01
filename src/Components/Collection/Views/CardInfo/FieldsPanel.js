/* eslint-disable no-lone-blocks */

// import { useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'

import renderCell from '@/CardRenders'


const FieldsPanel = (props) => {
  const {
    card,
    renderStyle = 'content',
    ...rest
  } = props
  const theme = useTheme()

  let [name, manaCost, typeLine, set, oracleText, flavorText, artist, collectorNumber, powerToughness] = [
    renderCell({ card, columnName: 'name', renderStyle, theme, ...rest }),
    renderCell({ card, columnName: 'mana_cost', renderStyle, theme, ...rest }),
    renderCell({ card, columnName: 'type_line', renderStyle, theme, ...rest }),
    renderCell({ card, columnName: 'set', renderStyle, theme, ...rest }),
    renderCell({ card, columnName: 'oracle_text', renderStyle, theme, ...rest }),
    renderCell({ card, columnName: 'flavor_text', renderStyle, theme, ...rest }),
    renderCell({ card, columnName: 'artist', renderStyle, theme, ...rest }),
    renderCell({ card, columnName: 'collector_number', renderStyle, theme, ...rest }),
    renderCell({ card, columnName: 'power_toughness', renderStyle, theme, ...rest }),
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