import grey from "@material-ui/core/colors/grey"


const useStyles = (theme) => {
  const floatingBackgroundColor = theme.palette.type === 'dark' ? grey[700] : grey['A100']

  return {
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    content: {
      position: 'relative',
    },
    floating: {
      zIndex: 2,
      position: 'absolute',
      top: theme.spacing(1),
      left: theme.spacing(9),
      maxWidth: theme.spacing(25),
      width: 'max-content',
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1.25)}px ${theme.spacing(0.5)}px ${theme.spacing(1.25)}px`,
      backgroundColor: floatingBackgroundColor,
      color: theme.palette.getContrastText(floatingBackgroundColor),
    },
    checkbox: {
      borderLeft: `1px solid ${theme.palette.divider}`,
      paddingRight: '6px'
    },
  }
}

export default useStyles