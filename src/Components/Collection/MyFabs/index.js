import { Grid, Tooltip, Fab } from '@material-ui/core'
import {
  Add as AddIcon,
  CloudDownload as CloudDownloadIcon,
} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'


const MyFabs = ({
  /** VARS **/
  ...props
}) => {
  const history = useHistory()


  /** HANDLERS **/
  const handleFabClick = (id) => (e) => {
    switch (id) {
      case 'import':
        history.push('/collection/import')
        break

      case 'export':
        history.push('/collection/export')
        break

      default:
        break
    }
  }


  /** RENDER **/
  return (
    <Grid container spacing={1} direction="column-reverse">
      <Grid item>
        <Tooltip arrow
          placement='left'
          title='Import Cards'
          enterDelay={250}
        >
          <Fab
            name='import'
            size='small'
            color='primary'
            onClick={handleFabClick('import')}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Grid>

      <Grid item>
        <Tooltip arrow
          placement='left'
          title='Export Cards'
          enterDelay={250}
        >
          <Fab
            name='export'
            size='small'
            color='primary'
            onClick={handleFabClick('export')}
          >
            <CloudDownloadIcon />
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

/** EXPORT **/
export default MyFabs