/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { TextField, Hidden, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
// import useMouse from '@react-hook/mouse-position'
import _ from 'lodash';
// import clsx from 'clsx'

import { setCurrentTab, setCurrentCollection } from '@/Logic/redux'
import { MagicdexApi } from '@/Api'
import CardImage from './CardImage'
import { CardTable } from '@/Components'
import useStyles from './styles'


const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
  collection: state.actions.activeUser.collection,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
    setCurrentCollection: (payload) => dispatch(setCurrentCollection(payload)),
  }
})

const Collection = (props) => {
  /** VARS **/

  // const tableContainerRef = useRef()
  // const mouse = useMouse(tableContainerRef, {
  //   enterDelay: 100,
  //   leaveDelay: 100,
  //   // fps: 10,
  // })
  const history = useHistory()
  const [cardsData, setCardsData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [currentHoveringCard, setCurrentHoveringCard] = useState()
  const {
    classes,
    dispatch,
    username,
    collection,
  } = props
  const columns = {
    amount: 'amount',
    set: 'set',
    name: 'name',
    mana_cost: 'mana cost',
    type_line: 'type',
    // rarity: 'rarity',
    // signed: 'signed',
    // altered: 'altered',
    // condition: 'condition',
    // tag: 'tags',
    foil: 'foil',
    total_price: 'price (usd)'
  }


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({ tab: 'collection' })
  }, [])

  useEffect(() => {
    if (username === null)
      history.push('/')
    else if (username) {
      MagicdexApi
        .getAllCards()
        .then(res => dispatch.setCurrentCollection({ collection: res }))
    }
  }, [username])

  useEffect(() => {
    const filteredCards = _.filter(collection,
      card => card.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    filteredCards.length > 0 ? setCardsData(filteredCards) : setCardsData([]);
  }, [searchInput])

  useEffect(() => {
    setCardsData(collection)
  }, [collection])


  /** HANDLERS **/
  const handleRowHover = (card, i) => {
    setCurrentHoveringCard(card)
  }


  /** RENDER **/
  return (
    <div className={classes.root}>
      <Grid container
        className={classes.filtersContainer}
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          top thing 💁‍♂️
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="filled-search"
            size='small'
            label="Search Card"
            color="secondary"
            type="search"
            variant="filled"
            value={searchInput}
            className={classes.search}
            onChange={e => setSearchInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          another thing idk 🤷‍♂️
        </Grid>
      </Grid>


      <Grid container>
        <Hidden mdDown>
          <Grid item className={classes['image-container']}>
            <CardImage
              className={classes['card-image']}
              card={currentHoveringCard}
              width={250}
            />
          </Grid>
        </Hidden>
        <Grid item style={{ flexGrow: 1 }}>
          <div align='center' style={{ maxWidth: 'fit-content' }}>
            <CardTable
              onRowHover={handleRowHover}
              columns={columns}
              collection={cardsData}
            />
          </div>
        </Grid>
      </Grid>
    </div >
  );
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Collection
    )
  )