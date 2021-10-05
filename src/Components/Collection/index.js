/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { useEffect, useLayoutEffect, useState } from 'react'
import { Paper, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, TableSortLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import _ from 'lodash';

import { MagicdexApi } from '@/Api'
import CollapsableRow from './CollapsableRow'
import CardInfo from './CardInfo'
import useStyles from './styles'
import { setCurrentTab } from '@/Logic/redux'


const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const Collection = (props) => {
  /** VARS **/
  const history = useHistory()
  const [cards, setCards] = useState([])
  const [cardData, setCardData] = useState([])
  const {
    classes,
    dispatch,
    username,
  } = props
  // const rowHeaders = {
  //   name: 'name',
  //   set_name: 'set name',
  //   amount: 'amount',
  //   signed: 'signed',
  //   altered: 'altered',
  //   condition: 'condition',
  //   tag: 'tags',
  //   foil: 'foil',
  //   prices: 'price'
  // }
  const rowHeaders = {
    name: 'name',
    set_name: 'set name',
    amount: 'amount',
    signed: 'signed',
    altered: 'altered',
    condition: 'condition',
    tag: 'tag',
    foil: 'foil',
    price: 'price'
  }


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab('collection')
  }, [])

  useLayoutEffect(() => {
    if (!username)
      history.push('/')
    else {
      MagicdexApi
        .getAllCards()
        .then(res => setCards(res))
    }
  }, [username])

  useEffect(() => {
    if (cards.length > 0) {
      const cardsWithPrice = cards.map(card => {
        const { prices, foil, amount } = card
        let price = Number(foil ? prices?.usd_foil : prices?.usd) * Number(amount)
        price = price > 0 ? price + '$' : '-'

        return {
          ...card,
          price,
        }
      })
      setCardData(cardsWithPrice)
    }
  }, [cards])


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <div className={classes.root}>
      <TableContainer component={Paper} className={classes.paper}>
        <Table size='small'>

          <TableHead>
            <TableRow>
              <TableCell className={classes.iconCell} />
              {
                Object.values(rowHeaders).map((rowName, i) =>
                  <TableCell key={i} align='center'>
                    <TableSortLabel>
                      {rowName}
                    </TableSortLabel>
                  </TableCell>
                )
              }
            </TableRow>
          </TableHead>

          <TableBody>
            {
              cardData.map((card, i) =>
                <CollapsableRow
                  key={i}
                  rowContent={Object.values(_.pick(card, Object.keys(rowHeaders)))}
                  collapseContent={<CardInfo data={card} />}
                />
              )
            }
          </TableBody>

        </Table>
      </TableContainer>
    </div >
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Collection
    )
  )