import {
  Divider,
  FormControlLabel,
  Grid,
  ListSubheader,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import clsx from "clsx";

const formatCode = (code) => {
  code = code.toLowerCase();
  if (code.charAt(0) !== "{") return code;
  return "";
};

const getRangeTextField = (name, maxMin, state, stateHandler, clsInput) => {
  return (
    <TextField
      className={clsInput}
      id={maxMin + "-" + name}
      label={maxMin}
      type="number"
      placeholder={maxMin}
      size="small"
      value={state}
      pattern=""
      onChange={(e) => stateHandler(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "e" || e.key === "+" || e.key === "-") e.preventDefault();
      }}
    />
  );
};

const Utils = {
  getTextOption: (name, state, stateHandler) => {
    return (
      <>
        <ListSubheader>
          <Grid container spacing={2}>
            <Grid item>{name + ": "}</Grid>
            <Grid item>
              <TextField
                id={name}
                label={name}
                value={state}
                onChange={(e) => stateHandler(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </ListSubheader>
        <Divider />
      </>
    );
  },

  getRangeOptions: (
    name,
    stateMin,
    stateMax,
    stateHandlerMin,
    stateHandlerMax,
    clsInput,
    clsMinus
  ) => {
    return (
      <>
        <ListSubheader>
          <Grid container spacing={1}>
            <Grid item>{name + ": "}</Grid>
            <Grid item>
              {getRangeTextField(
                name,
                "Minimum",
                stateMin,
                stateHandlerMin,
                clsInput
              )}
            </Grid>
            <Grid item className={clsMinus}>
              —
            </Grid>
            <Grid item>
              {getRangeTextField(
                name,
                "Maximum",
                stateMax,
                stateHandlerMax,
                clsInput
              )}
            </Grid>
          </Grid>
        </ListSubheader>
        <Divider />
      </>
    );
  },

  getRadioOptions: (name, state, stateHandler) => {
    return (
      <>
        <ListSubheader>
          <Grid container spacing={2}>
            <Grid item>{name + ": "}</Grid>
            <Grid item>
              <RadioGroup
                row
                aria-label={name.toLowerCase()}
                name={"row-radio-buttons-" + name.toLowerCase()}
                value={state}
                onChange={(e) => stateHandler(e.target.value)}
              >
                <FormControlLabel
                  value="Both"
                  control={<Radio />}
                  label="Both"
                />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </Grid>
          </Grid>
        </ListSubheader>
        <Divider />
      </>
    );
  },

  getAutocompleteOptions: (name, data, value, setValue, cls) => {
    return (
      <>
        <ListSubheader>
          <Grid container spacing={2}>
            <Grid item>{name + ": "}</Grid>
            <Grid item xs={9}>
              <Autocomplete
                className={cls}
                multiple
                limitTags={4}
                disableCloseOnSelect
                value={value}
                onChange={(e, v) => setValue(v)}
                id={"tags-" + name}
                options={data?.sort((a, b) =>
                  a["setType"].localeCompare(b["setType"])
                )}
                groupBy={(option) => option.setType}
                getOptionLabel={(option) =>
                  option.setType !== "Symbols" ? option.name : option.code
                }
                renderOption={(option) => {
                  return (
                    <>
                      <i
                        style={{ fontSize: "1.5em" }}
                        className={
                          option.setType === "Colors" ||
                          option.setType === "Symbols"
                            ? clsx("ms", `ms-${formatCode(option.code)}`)
                            : clsx("ss ss-fw", `ss-common`, `ss-${option.code}`)
                        }
                      />
                      {option.name}
                    </>
                  );
                }}
                filterSelectedOptions
                getOptionSelected={(option, value) => {
                  return option.setType !== "Symbols"
                    ? option.name === value.name
                    : false;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={name}
                    placeholder={name}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListSubheader>
        <Divider />
      </>
    );
  },

  getAllColors: () => {
    return [
      { code: "W", name: "White", setType: "Colors" },
      { code: "U", name: "Blue", setType: "Colors" },
      { code: "B", name: "Black", setType: "Colors" },
      { code: "R", name: "Red", setType: "Colors" },
      { code: "G", name: "Green", setType: "Colors" },
      { code: "C", name: "Colorless", setType: "Colors" },
    ];
  },

  checkFilters: {
    cardName: (name, cardName) => {
      return name.toLowerCase().includes(cardName.toLowerCase());
    },
    text: (flavorText, oracleText, text) => {
      flavorText = flavorText?.toLowerCase();
      oracleText = oracleText?.toLowerCase();
      text = text.toLowerCase();
      return flavorText?.includes(text) || oracleText?.includes(text);
    },
    type: (line_type, type) => {
      return line_type?.toLowerCase().includes(type);
    },
    colors: (colors, selectedColors) => {
      if (selectedColors.length > 0)
        return colors.some((c) =>
          selectedColors.map((sC) => sC.code).includes(c)
        );
      return true;
    },
    sets: (set_name, selectedSets) => {
      return selectedSets.length > 0
        ? selectedSets.findIndex((s) => s.name.includes(set_name)) !== -1
        : true;
    },
    manaCosts: (mana_cost, selectedManaCosts) => {
      if (selectedManaCosts.length === 0) return true;
      let mana_cost_array = mana_cost
        .split(/{(.*?)}/)
        .filter((m) => m.length > 0);
      selectedManaCosts = selectedManaCosts.map((m) =>
        m.code.substring(1, m.code.length - 1)
      );

      return selectedManaCosts.every(
        (m) =>
          mana_cost_array.includes(m) &&
          selectedManaCosts.filter((el) => el === m).length <=
            mana_cost_array.filter((el) => el === m).length
      );
    },
    price: (priceUSD, priceMin, priceMax) => {
      if (priceMin === "") priceMin = 0;
      if (priceMax === "") priceMax = Number.MAX_SAFE_INTEGER;
      return priceUSD <= priceMax && priceUSD >= priceMin;
    },
    amount: (amount, amountMin, amountMax) => {
      if (amountMin === "") amountMin = 0;
      if (amountMax === "") amountMax = Number.MAX_SAFE_INTEGER;
      return amount <= amountMax && amount >= amountMin;
    },
    radio: (cardVal, radioVal) => {
      if (radioVal === "Both") return true;
      else if (cardVal && radioVal === "Yes") return true;
      else if (!cardVal && radioVal === "No") return true;
      return false;
    },
  },
};

export default Utils;

export const {
  getRadioOptions,
  getTextOption,
  getRangeOptions,
  getAutocompleteOptions,
  getAllColors,
  checkFilters,
} = Utils;
