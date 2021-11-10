/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import React, { useEffect, useState, createRef } from "react"
import { Grid, InputAdornment, TextField, ListItem, ListSubheader, Divider } from "@material-ui/core"
import { withStyles } from "@material-ui/styles"
import { connect } from "react-redux"
import Scryfall from "scryfall-client"
import _ from "lodash"

import { setFilters } from '@/Logic/redux'
import { TextOption, AutocompleteOptions } from "./utils"
import FilterPopover from "./FilterPopover"
import useStyles from "./styles"


/** REDUX **/
const mapStateToProps = (state) => ({
  filters: state.actions.app.collection.filters,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setFilters: (filters) => dispatch(setFilters(filters)),
  },
})


const FilterProvider = (props) => {
  /** VARS **/
  const {
    dispatch,
    classes,
    filters,
  } = props
  const filtersMenuRef = createRef()

  const [setsData, setSetsData] = useState([])
  const [cardName, setCardName] = useState('')

  const [oracleText, setOracleText] = useState('')
  const [typeLine, setTypeLine] = useState('')
  const [tags, setTags] = useState('')
  const [tagArray, setTagArray] = useState([])

  // const [selectedColors, setSelectedColors] = useState([])
  // const [selectedManaCosts, setSelectedManaCosts] = useState([])
  const [selectedSets, setSelectedSets] = useState([])

  // const [amountMin, setAmountMin] = useState(0)
  // const [amountMax, setAmountMax] = useState(9999)
  // const [priceMin, setPriceMin] = useState(0)
  // const [priceMax, setPriceMax] = useState(9999)

  // const [foil, setFoil] = useState("Both")
  // const [signed, setSigned] = useState("Both")
  // const [altered, setAltered] = useState("Both")


  /** EFFECTS **/
  useEffect(() => {
    const fetchSets = async () => {
      const allSets = await Scryfall.getSets()
      setSetsData(
        _.chain(allSets)
          // .filter(set =>
          //   set.set_type === 'token'
          // )
          .map(set => ({
            ...set,
            set_type: _.chain(set.set_type).replace(/[_]+/g, ' ').upperFirst().value(),
            released_at: new Date(set.released_at),
          }))
          .sortBy(['set_type', 'released_at'])
          .value()
      )
    }
    fetchSets()
  }, [])

  useEffect(() => {
    dispatch.setFilters({
      filters: {
        name: v => v.toLowerCase().includes(cardName.toLowerCase()),
        oracle_text: v => v ? v.toLowerCase().includes(oracleText) : true,
        type_line: v => v.toLowerCase().includes(typeLine),
        tag: tagArray.length > 0 ? tagArray : true,
        set: selectedSets.length > 0 ? selectedSets : true,
        // colors: selectedColors,
        // mana_cost: selectedManaCosts,
        // amount: (v) => v >= amountMin && v <= amountMax,
        // price: (v, item) => item.amount * item.prices.usd >= priceMin && item.amount * item.prices.usd <= priceMax,
        // foil: (v) => getRadioAsBoolean(v, foil),
        // signed: (v) => getRadioAsBoolean(v, signed),
        // altered: (v) => getRadioAsBoolean(v, altered),
      }
    })
  }, [cardName, oracleText, typeLine, tags, selectedSets])
  // }, [cardName, oracleText, type, selectedColors, selectedManaCosts, selectedSets, amountMin, amountMax, priceMin, priceMax, foil, signed, altered])

  useEffect(() => {
    if (Array.isArray(filters.tag))
      setTagArray(filters.tag)
  }, [filters])


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <Grid item container className={classes.root}>
      <TextField
        id="filled-search"
        label="Search Card Name"
        size='small'
        type="search"
        color='secondary'
        variant="filled"
        className={classes.search}
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <FilterPopover ref={filtersMenuRef}>
                <ListSubheader>
                  Filters
                </ListSubheader>
                <ListItem>
                  <TextOption
                    label="Oracle Text"
                    value={oracleText}
                    onChange={e => setOracleText(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextOption
                    label="Type"
                    value={typeLine}
                    onChange={e => setTypeLine(e.target.value)}
                  />
                </ListItem>

                <ListItem>
                  {/* <AutocompleteOptions freesolo
                    open={false}
                    popupIcon={null}
                    options={[]}
                    label="Tags"
                    value={tags}
                    onKeyDown={e => console.log(e.key)}
                    onChange={(e, v) => console.log('onChange', v)}
                    onInputChange={(e, v) => console.log('onInputChange', v)}
                  /> */}
                  <TextOption
                    label="Tags"
                    value={tags}
                    onChange={e => {
                      setTags(e.target.value)
                      setTagArray(
                        _.chain(e.target.value)
                          .split(/[;,]+/g)
                          .uniq()
                          .compact()
                          .value()
                      )
                    }}
                    helperText={
                      <>
                        {'Separate tags with '}
                        <code>
                          [;,]+
                        </code>
                      </>
                    }
                  />
                </ListItem>

                <Divider />

                <ListItem>
                  <AutocompleteOptions
                    label="Sets"
                    options={setsData}
                    value={selectedSets}
                    onChange={(e, v) => setSelectedSets(v)}
                    className={classes.autocompleteInput}
                    groupBy={option => option.set_type}
                    getOptionLabel={option => option.name}
                    getOptionSelected={(option, value) => (
                      option.code === value.code
                    )}
                    ChipProps={{
                      label: option => option.code,
                    }}
                  />
                </ListItem>

                {/* getAutocompleteOptions(
                    "Colors",
                    getAllColors(),
                    selectedColors,
                    setSelectedColors,
                    classes.autocompleteInput
                  ),
                  getAutocompleteOptions(
                    "Mana Costs",
                    symbols,
                    selectedManaCosts,
                    setSelectedManaCosts,
                    classes.autocompleteInput
                  ),
                  getRangeOptions(
                    "Price",
                    priceMin,
                    priceMax,
                    setPriceMin,
                    setPriceMax,
                    classes.rangeInput,
                    classes.minus
                  ),
                  getRangeOptions(
                    "Amount",
                    amountMin,
                    amountMax,
                    setAmountMin,
                    setAmountMax,
                    classes.rangeInput,
                    classes.minus
                  ),
                  getRadioOptions("Foil", foil, setFoil),
                  getRadioOptions("Signed", signed, setSigned),
                  getRadioOptions("Altered", altered, setAltered), */}
              </FilterPopover>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  )
}

/** EXPORT **/
export default withStyles(useStyles)(
  connect(mapStateToProps, mapDispatchToProps)(
    FilterProvider
  )
)
