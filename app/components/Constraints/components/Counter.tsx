import React, { useContext } from 'react'
import { Context } from '../../../context'
import { LargeButton } from '../../utils'

interface Goal {
  goal: number
  setGoal: (value: number) => void
}

const Counter = () => {
  const context = useContext(Context)
  if (!context) {
    return null
  }
  const { goal, setGoal }: Goal = context

  const decrement = () => {
    if (goal > 0) {
      setGoal(goal - 1)
    }
  }

  const increment = () => {
    if (goal >= 0) {
      setGoal(goal + 1)
    }
  }

  return (
    <div className="flex-row">
      <LargeButton
        text="Decrement"
        className="large-button"
        onClick={decrement}
      />
      <LargeButton
        text="Increment"
        className="large-button"
        onClick={increment}
      />
    </div>
  )
}

export default Counter
