import React, { useContext } from 'react'
import { Context, ContextType } from '@/app/context'
import { LargeButton } from '../../utils'

const Counter = () => {
  const context = useContext(Context)
  if (!context) {
    return null
  }
  const { goal, setGoal } = context as unknown as ContextType

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
