const useStyles = (theme) => ({
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
  },
})

export default useStyles