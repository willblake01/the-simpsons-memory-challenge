import React from 'react'
import { FilteredList, List } from './components'

const Lists = () => {
  return (
    <div className="flex-row">
      <List />
      <FilteredList />
    </div>
  )
}

export default Lists
