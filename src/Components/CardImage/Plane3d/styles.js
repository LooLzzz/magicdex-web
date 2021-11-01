
const useStyles = (theme) => {
  return {
    cube: {
      overflow: 'visible',
      transition: 'all 0.33s cubic-bezier(0.75, 0, 0.25, 1)',
      transformStyle: 'preserve-3d',
      WebkitTransformStyle: 'preserve-3d',
      MozTransformStyle: 'preserve-3d',
      OTransformStyle: 'preserve-3d',
    },
    face: {
      position: 'absolute',
    },
    front: {
    },
    back: {
      transform: 'rotateY(180deg)',
      WebkitTransform: 'rotateY(180deg)',
      MozTransform: 'rotateY(180deg)',
      OTransform: 'rotateY(180deg)',
    },
  }
}

export default useStyles