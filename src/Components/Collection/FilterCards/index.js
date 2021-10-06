/* eslint-disable no-lone-blocks */
import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'

import useStyles from './styles'


const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    dispatch: {

    }
})

const FilterCards = (props) => {
    /** VARS **/
    const {
        classes,
        // dispatch,
    } = props

    /** EFFECTS **/
    { }
    
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
          onChange={props.searchHandler}
        />
      </div>
    );
}

/** EXPORT **/
export default
    withStyles(useStyles) (
        connect(mapStateToProps, mapDispatchToProps) (
            FilterCards
        )
    )