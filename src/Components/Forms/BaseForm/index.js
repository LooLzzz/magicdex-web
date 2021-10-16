import { useEffect, useState } from 'react'
import { Paper, Divider, Typography, Dialog, DialogContent, CircularProgress } from '@material-ui/core'
import { withStyles } from "@material-ui/styles"
import { ValidatorForm } from 'react-material-ui-form-validator'

// import { setCurrentTab } from "@/Logic/redux"
import useStyles from './styles'


// function toTitleCase(str) {
//   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// }

const BaseForm = (props) => {
  /** VARS **/
  const {
    classes,
    validationRules,
    // dispatch,
    header,
    icon,
    content,
    actions,
    onSubmit,
    onError,
    formRef,
    ...rest
  } = props
  const [Header, setHeader] = useState([])
  const [Icon, setIcon] = useState([])
  const [Content, setContent] = useState([])
  const [Actions, setActions] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  /** EFFECTS **/
  useEffect(() => {
    const rules = validationRules ? validationRules : {}

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
  const handleSubmit = (e) => {
    // console.log('BaseForm submit started')
    setIsLoading(true)
    onSubmit(e)
    setIsLoading(false)
    // console.log('BaseForm submit ended')
  }


  /** RENDER **/
  return (
    <>
      <Paper component={ValidatorForm} ref={formRef}
        className={classes.root} elevation={8}
        onSubmit={handleSubmit} onError={onError} {...rest}
      >
        <Typography variant='h4' className={classes.header}>
          <b>{Header}</b>
        </Typography>

        <div className={classes.icon}>
          {Icon}
        </div>
        <Divider className={classes.divider1} />

        <div className={classes.bottom}>
          <div className={classes.content}>
            {Content}
          </div>
          <div className={classes.actions}>
            {Actions}
          </div>
        </div>
      </Paper>

      <Dialog open={isLoading}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    </>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    BaseForm
  )