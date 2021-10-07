import { FormControlLabel, Grid, ListSubheader, Radio, RadioGroup, TextField } from "@material-ui/core";

const Utils = {
  getTextOption: (name) => {
    return (
      <ListSubheader>
        <Grid container spacing={2}>
          <Grid item>{name + ": "}</Grid>
          <Grid item>
            <TextField />
          </Grid>
        </Grid>
      </ListSubheader>
    );
  },
  getRadioOptions: (name, handler, state, stateHandler) => {
    return (
      <ListSubheader>
        <Grid container spacing={2}>
          <Grid item>{name + ": "}</Grid>
          <Grid item>
            <RadioGroup
              row
              aria-label={name.toLowerCase()}
              name={"row-radio-buttons-" + name.toLowerCase()}
              value={state}
              onChange={(e) => handler(e, stateHandler)}
            >
              <FormControlLabel value="Both" control={<Radio />} label="Both" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            </RadioGroup>
          </Grid>
        </Grid>
      </ListSubheader>
    );
  },
};

export default Utils;

export const {
    getRadioOptions,
    getTextOption,
} = Utils;
