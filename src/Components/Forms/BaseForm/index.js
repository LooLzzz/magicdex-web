import { useEffect, useState } from 'react'
import { Paper, Divider, Grid, Typography, Dialog, DialogContent, CircularProgress } from '@material-ui/core'
import { withStyles } from "@material-ui/styles"
import { ValidatorForm } from 'react-material-ui-form-validator'

import useStyles from './styles'


const BaseForm = ({
  /** VARS **/
  validationRules = {},
  header,
  icon,
  content,
  actions,
  headerProps = {},
  iconProps = {},
  contentProps = {},
  actionsProps = {},
  formRef,
  disableBackdrop = false,
  onSubmit = async (e) => Promise.resolve(),
  onError = (err) => { console.error(err) },
  ...props
}) => {
  const {
    classes,
    ...rest
  } = props
  const [Header, setHeader] = useState([])
  const [Icon, setIcon] = useState([])
  const [Content, setContent] = useState([])
  const [Actions, setActions] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  /** EFFECTS **/
  useEffect(() => {
    const rules = validationRules

    Object.entries(rules).forEach(item => {
      const [key, value] = item
      if (!ValidatorForm.hasValidationRule(key))
        ValidatorForm.addValidationRule(key, value)
    })
  }, [validationRules])

  useEffect(() => {
    setHeader(header)
    setIcon(icon)
    setContent(content)
    setActions(actions)
  }, [header, icon, content, actions])


  /** HANDLERS **/
  const handleSubmit = async (e) => {
    setIsLoading(true)

    try {
      await onSubmit(e)
    }
    catch (err) {
      onError(err)
    }
    finally {
      setIsLoading(false)
    }
  }


  /** RENDER **/
  return (
    <>
      <Paper component={ValidatorForm} ref={formRef}
        className={classes.root} elevation={8}
        onSubmit={handleSubmit} onError={onError} {...rest}
      >
        <Typography variant='h4' align='right' className={classes.header} {...headerProps}>
          {Header}
        </Typography>

        <div className={classes.icon} {...iconProps}>
          {Icon}
        </div>
        <Divider className={classes.divider1} />

        <Grid container direction='column' justifyContent='center' alignItems='center' className={classes.bottom}>
          <Grid item xs={12} className={classes.content} {...contentProps}>
            {Content}
          </Grid>
          <Grid item xs={12} className={classes.actions} {...actionsProps}>
            {Actions}
          </Grid>
        </Grid>

      </Paper>

      {
        !disableBackdrop &&
        <Dialog open={isLoading}>
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        </Dialog>
      }
    </>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    BaseForm
  )