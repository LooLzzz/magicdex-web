/* eslint-disable no-lone-blocks */

import { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import _ from 'lodash'

import { CardImage } from '@/Components'
import useStyles from './styles'


//TODO: all this


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  // dispatch: {}
})

const CardGridView = (props) => {
  /** VARS **/
  const {
    classes,
    data,
    // dispatch,
  } = props
  const [sortedData, setSortedData] = useState([])

  /** EFFECTS **/
  useEffect(() => {
    setSortedData(
      _.sortBy(data, card => card.type_line.replace('Legendary', ''))
    )
  }, [data])


  /** HANDLERS **/
  { }

  /** RENDER **/
  return (
    <Grid item container spacing={2} xs={12} justifyContent='center'>
      {
        sortedData && sortedData.map((card, i) => {
          const width = 209
          return (
            <Grid item key={i} xs='auto' >
              <CardImage
                packTransformButton
                tiltEnabled
                tiltProps={{
                  glareEnable: false,
                  tiltMaxAngleX: 12.5,
                  tiltMaxAngleY: 12.5,
                }}
                imageProps={{
                  width,
                  height: width * 1.4,
                }}
                card={card}
              />
            </Grid>
          )
        })
      }
    </Grid>

  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardGridView
    )
  )