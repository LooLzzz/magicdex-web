
const useStyles = (theme) => {
  return {
    cube: {
      transformStyle: 'preserve-3d',
      transition: 'all 0.33s cubic-bezier(0.75, 0, 0.25, 1)',
    },
    face: {
      position: 'absolute',
    },
    front: {
    },
    back: {
      transform: 'rotateY(180deg)',
    },
  }
}

export default useStyles