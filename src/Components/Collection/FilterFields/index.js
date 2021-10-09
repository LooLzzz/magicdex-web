/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { useEffect, useState } from "react";
import { InputAdornment, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
// import _ from "lodash";

import useStyles from "./styles";
import { MagicdexApi } from "@/Api";
import FilterPopover from "./FilterPopover";
import {
  getRadioOptions,
  getTextOption,
  getRangeOptions,
  getAutocompleteOptions,
  getAllColors,
  checkFilters,
} from "./utils";


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  dispatch: {},
});

const FilterProvider = (props) => {
  /** VARS **/
  const {
    // dispatch,
    classes,
    setFilters,
  } = props;
  const [setsData, setSetsData] = useState();
  const [symbols, setSymbols] = useState();

  const [cardName, setCardName] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedManaCosts, setSelectedManaCosts] = useState([]);
  const [selectedSets, setSelectedSets] = useState([]);

  const [amountMin, setAmountMin] = useState(0);
  const [amountMax, setAmountMax] = useState(9999);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(9999);

  const [foil, setFoil] = useState("Both");
  const [signed, setSigned] = useState("Both");
  const [altered, setAltered] = useState("Both");


  /** EFFECTS **/
  // useEffect(() => {
  //   MagicdexApi.getAllSets().then((res) => {
  //     setSetsData(res);
  //   });

  //   MagicdexApi.getAllSymbols().then((res) => {
  //     setSymbols(res);
  //   });
  // }, []);

  useEffect(() => {
    // console.log(JSON.stringify(data));
    // setFilteredData(
    //   _.filter(data, (data) => {
    //     return (
    //       checkFilters.cardName(data.name, cardName) &&
    //       checkFilters.text(data.flavor_text, data.oracle_text, text) &&
    //       checkFilters.colors(data.type_line, type) &&
    //       checkFilters.colors(data.colors, selectedColors) &&
    //       checkFilters.sets(data.set_name, selectedSets) &&
    //       checkFilters.manaCosts(data.mana_cost, selectedManaCosts) &&
    //       checkFilters.price(data.prices.usd, priceMin, priceMax) &&
    //       checkFilters.amount(data.amount, amountMin, amountMax) &&
    //       checkFilters.radio(data.foil, foil) &&
    //       checkFilters.radio(data.signed, signed) &&
    //       checkFilters.radio(data.altered, altered)
    //     )
    setFilters({
      name: v => v.toLowerCase().includes(cardName.toLowerCase()),
      oracle_text: v => v.toLowerCase().includes(text),
      // type_line: v => v.toLowerCase().includes(type),
      // colors: selectedColors,
      // mana_cost: selectedManaCosts,
      // set_name: selectedSets,
      // amount: (v) => v >= amountMin && v <= amountMax,
      // price: (v, item) => item.amount * item.prices.usd >= priceMin && item.amount * item.prices.usd <= priceMax,
      // foil: (v) => getRadioAsBoolean(v, foil),
      // signed: (v) => getRadioAsBoolean(v, signed),
      // altered: (v) => getRadioAsBoolean(v, altered),
    })
  }, [cardName, text, type, selectedColors, selectedManaCosts, selectedSets, amountMin, amountMax, priceMin, priceMax, foil, signed, altered])

  // useEffect(() => {
  //   console.log("Final: " + filteredData);
  // }, [filteredData]);


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <div className={classes.root}>
      <TextField
        id="filled-search"
        label="Search Card"
        type="search"
        variant="filled"
        className={classes.search}
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <FilterPopover>
                {[
                  getTextOption("Text", text, setText),
                  getTextOption("Type", type, setType),
                  getAutocompleteOptions(
                    "Colors",
                    getAllColors(),
                    selectedColors,
                    setSelectedColors,
                    classes.autocompleteInput
                  ),
                  // getAutocompleteOptions(
                  //   "Sets",
                  //   setsData,
                  //   selectedSets,
                  //   setSelectedSets,
                  //   classes.autocompleteInput
                  // ),
                  // getAutocompleteOptions(
                  //   "Mana Costs",
                  //   symbols,
                  //   selectedManaCosts,
                  //   setSelectedManaCosts,
                  //   classes.autocompleteInput
                  // ),
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
                  getRadioOptions("Altered", altered, setAltered),
                ]}
              </FilterPopover>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

/** EXPORT **/
export default withStyles(useStyles)(
  connect(mapStateToProps, mapDispatchToProps)(
    FilterProvider
  )
);
