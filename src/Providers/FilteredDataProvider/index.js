import React, { useState, useEffect } from 'react'
import _ from 'lodash'

const FilteredDataProvider = (props) => {
  /** VARS **/
  const {
    classes,
    children,
    data,
    filters,
    ...rest
  } = props
  const [filteredData, setFilteredData] = useState(data)


  /** EFFECTS **/
  useEffect(() => {
    setFilteredData(
      _.filter(data ?? [],
        row => (
          _.every(Object.entries(filters ?? {}),
            ([key, value]) => (
              value && value !== [] && value !== {}
                ? value instanceof Function
                  ? value(row[key], row)
                  : row[key] === value
                : true
            ))
        ))
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