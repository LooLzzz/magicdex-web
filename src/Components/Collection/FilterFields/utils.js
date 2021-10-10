import { FormControlLabel, Grid, Radio, RadioGroup, TextField, Chip } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
// import clsx from "clsx"
import _ from 'lodash'

const formatCode = (code) => {
  code = code.toLowerCase()
  if (code.charAt(0) !== "{") return code
  return ""
}

const RangeTextField = ({ name, maxMin, state, stateHandler, clsInput }) => (
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
      if (e.key === "e" || e.key === "+" || e.key === "-") e.preventDefault()
    }}
  />
)


const Utils = {
  TextOption: ({ label, value, onChange, ...rest }) => (
    <TextField
      margin='dense'
      size='small'
      variant='outlined'
      // variant='standard'
      color='secondary'
      label={label}
      value={value}
      onChange={onChange}
      {...rest}
    />
  ),

  RangeOptions: ({ name, stateMin, stateMax, stateHandlerMin, stateHandlerMax, clsInput, clsMinus }) => (
    <Grid container spacing={1}>
      <Grid item>{name + ": "}</Grid>
      <Grid item>
        <RangeTextField
          name={name}
          maxMin="Minimum"
          state={stateMin}
          stateHandler={stateHandlerMin}
          clsInput={clsInput}
        />
      </Grid>
      <Grid item className={clsMinus}>
        —
      </Grid>
      <Grid item>
        <RangeTextField
          name={name}
          maxMin="Maximum"
          state={stateMax}
          stateHandler={stateHandlerMax}
          clsInput={clsInput}
        />
      </Grid>
    </Grid>
  ),

  RadioOptions: ({ name, state, stateHandler }) => (
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
  ),

  AutocompleteOptions: ({ label, options, value, onChange, className, ...rest }) => (
    <Autocomplete multiple disableCloseOnSelect filterSelectedOptions
      {...rest}
      // id={"tags-" + label}
      // className={className}
      style={{ width: '95%' }}
      // limitTags={4}
      color='secondary'
      value={value}
      onChange={onChange}
      options={options}
      groupBy={option => option.set_type}
      getOptionLabel={option => option.name}
      renderTags={(value, getTagProps) => (
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.code}
            size="small"
            {...getTagProps({ index })}
          />
        ))
      )}
      getOptionSelected={(option, value) => (
        option.code === value.code
      )}
      renderInput={params => (
        <TextField
          {...params}
          color='secondary'
          size='small'
          margin='dense'
          variant="outlined"
          label={label}
        // placeholder={label}
        />
      )}
    />
  ),
}

export default Utils

export const {
  RadioOptions,
  TextOption,
  RangeOptions,
  AutocompleteOptions,
} = Utils