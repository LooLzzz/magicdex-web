import { useState } from 'react'
import { TableRow, TableCell, Collapse, IconButton, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';

import useStyles from './styles'


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {

  }
})

const CollapsableRow = (props) => {
  /** VARS **/
  const [isOpen, setIsOpen] = useState(false)
  const {
    classes,
    rowContent,
    collapseContent,
    // dispatch,
    // children,
  } = props


  /** EFFECTS **/
  // useEffect(() => {
  //   console.log({headers})
  // }, [headers])


  /** RENDER **/
  return (
    <>
      <TableRow className={classes.root + ' pointer'} onClick={e => setIsOpen(!isOpen)}>
        <TableCell>
          <IconButton size='small' onClick={e => setIsOpen(!isOpen)}>
            {
              isOpen
                ? <KeyboardArrowUpIcon />
                : <KeyboardArrowDownIcon />
            }
          </IconButton>
        </TableCell>
        {
          (rowContent instanceof Array)
            ? rowContent.map((item, index) => (
              <TableCell align='center' key={index}>
                {
                  (item instanceof Array)
                    ? (item.length === 0)
                      ? '-'
                      : _.join(item, '; ')
                    : String(item)
                }
              </TableCell>
            ))
            : rowContent
        }
      </TableRow>

      <TableRow>
        <TableCell colSpan={999} className={classes.collapsableContent}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {collapseContent}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CollapsableRow
    )
  )