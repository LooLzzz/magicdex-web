
const useStyles = (theme) => {
  return {
    root: {
      position: 'relative',
      overflow: 'visible',
      transition: 'all 0.33s cubic-bezier(0.75, 0, 0.25, 1)',
    },
    face: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    front: {
    },
    back: {
      transform: 'scaleX(-1)'
    },
  }
}

export default useStyles