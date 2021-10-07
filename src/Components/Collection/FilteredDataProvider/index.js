import React, { useState, useEffect } from 'react'
import _ from 'lodash'

const FilteredDataProvider = (props) => {
  /** VARS **/
  const {
    classes,
    children,
    data,
    filters,
    // dispatch,
    ...rest
  } = props
  const [filteredData, setFilteredData] = useState(data)


  /** EFFECTS **/
  useEffect(() => {
    setFilteredData(
      _.filter(data, filters)
    )
  }, [filters, data])


  /** RENDER **/
  return (
    React.Children.map(children, child =>
      React.cloneElement(child, {
        data: filteredData,
        ...rest,
      })
    )
  )
}

/** EXPORT **/
export default FilteredDataProvider