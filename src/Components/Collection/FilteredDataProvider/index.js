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
    console.log('setFilteredData envoked with', { data, filters })

    setFilteredData(
      _.filter(data ?? [],
        row => (
          _.every(Object.entries(filters ?? {}),
            ([key, value]) => (
              (value instanceof Function)
                ? value(row[key], row)
                : row[key] === value
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