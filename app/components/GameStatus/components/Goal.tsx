'use client'
import React, { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Context, ContextType } from '@/app/context'
import { SmallButton } from '../../utils'
import { Counter } from '.'

const Goal = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('Goal must be used within a ContextProvider')
  }

  const {
    clock,
    goal,
    revisionsRemaining,
    setRevisionsRemaining
  } = context as unknown as ContextType

  const [revise, setRevise] = useState(false)

  const handleRevise = () => {
    Promise.resolve(setRevise(true)).then(() => {
      if (revisionsRemaining > 0) {
        setRevisionsRemaining(revisionsRemaining - 1)
      }
    })
  }

  useEffect(() => {
    
    // Revisions only allowed in the first 5 minutes
    if (clock <= 180000) {
      setRevisionsRemaining(0)
    }
  }, [clock, setRevisionsRemaining])

  return (
    <div
      className={classNames(
        'flex-column',
        'justify-center',
        'align-center'
      )}
    >
      <h1>Goal</h1>
      <h1>{goal}</h1>
      {revise ? (
        <>
          <Counter />
          <SmallButton text="Done" onClick={() => setRevise(false)} />
        </>
      ) : revisionsRemaining > 0 ? (
        <SmallButton text="Revise" onClick={handleRevise} />
      ) : null}
    </div>
  )
}

export default Goal
