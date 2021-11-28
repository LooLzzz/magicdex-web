const useStyles = (theme) => {
  return {
    chip: {
      boxShadow: theme.shadows[1],
    },
    preWrap: {
      whiteSpace: 'pre-wrap',
    },
    mana: {
      marginRight: '0.25em',
      fontSize: '0.85em',
    },
    colorIndicator: {
      marginRight: '0.25em',
      fontSize: '0.9em',
    },
    set: {
      fontSize: '1.25em',
    },
    flavorText: {
      // marginTop: '0.2em',
      fontStyle: 'italic',
      fontFamily: 'Georgia, fangsong, Times New Roman',
      whiteSpace: 'pre-wrap',
    },
    condition: {
      padding: '3px 8px 3px 8px',
      borderRadius: 12,
      boxShadow: theme.shadows[1],
      fontFamily: '"Red Hat Mono", Consolas, monospace',
      fontSize: '0.93em',
    },
    widthLimit: {
      maxWidth: '22 em',
      [theme.breakpoints.down('lg')]: {
        maxWidth: '17em',
      },
      [theme.breakpoints.down(1400)]: {
        maxWidth: '10em',
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '7em',
      },
    },
  }
}

export default useStyles