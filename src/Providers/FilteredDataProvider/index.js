import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'


/** REDUX **/
const mapStateToProps = (state) => ({
  filters: state.actions.app.collection.filters,
})


/** COMPONENT **/
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
            ([key, value]) => {
              if (typeof value === 'boolean')
                return value

              if (value instanceof Function)
                return value(row[key], row)

              if (Array.isArray(value)) {
                if (value.length > 0) {
                  if (Array.isArray(row[key]))
                    return _.intersection(value, row[key]).length > 0
                  return value.includes(row[key])
                }
                return true
              }

              // default
              return row[key] === value
            })
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
export default
  connect(mapStateToProps)(
    FilteredDataProvider
  )