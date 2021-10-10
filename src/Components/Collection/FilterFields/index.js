/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { useEffect, useState, createRef } from "react"
import { InputAdornment, TextField, ListItem, ListSubheader, Divider } from "@material-ui/core"
import { withStyles } from "@material-ui/styles"
import { connect } from "react-redux"
import Scryfall from "scryfall-client"
import _ from "lodash"

import { RadioOptions, TextOption, RangeOptions, AutocompleteOptions } from "./utils"
import FilterPopover from "./FilterPopover"
import useStyles from "./styles"


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {},
})

const FilterProvider = (props) => {
  /** VARS **/
  const {
    // dispatch,
    classes,
    setFilters,
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
          .map((set) => ({
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
    setFilters({
      name: v => v.toLowerCase().includes(cardName.toLowerCase()),
      oracle_text: v => v.toLowerCase().includes(oracleText),
      type_line: v => v.toLowerCase().includes(typeLine),
      tag: v => (
        tagArray.length > 0
          ? _.intersection(v, tagArray).length > 0
          : true
      ),
      set: v => (
        selectedSets.length > 0
          ? _.includes(selectedSets.map(set => set.code), v)
          : true
      ),
      // colors: selectedColors,
      // mana_cost: selectedManaCosts,
      // amount: (v) => v >= amountMin && v <= amountMax,
      // price: (v, item) => item.amount * item.prices.usd >= priceMin && item.amount * item.prices.usd <= priceMax,
      // foil: (v) => getRadioAsBoolean(v, foil),
      // signed: (v) => getRadioAsBoolean(v, signed),
      // altered: (v) => getRadioAsBoolean(v, altered),
    })
  }, [cardName, oracleText, typeLine, tags, selectedSets])
  // }, [cardName, oracleText, type, selectedColors, selectedManaCosts, selectedSets, amountMin, amountMax, priceMin, priceMax, foil, signed, altered])


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <div className={classes.root}>
      <TextField
        id="filled-search"
        label="Search Card Name"
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
                          .split(/[ ,;]+/g)
                          .uniq()
                          .compact()
                          .value()
                      )
                    }}
                    helperText={
                      <>
                        Separate tags with
                        <code style={{
                          padding: '2px',
                          marginLeft: '0.25em',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderRadius: '12.5%',
                        }}>
                          [;, ]+
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
    </div>
  )
}

/** EXPORT **/
export default withStyles(useStyles)(
  connect(mapStateToProps, mapDispatchToProps)(
    FilterProvider
  )
)
