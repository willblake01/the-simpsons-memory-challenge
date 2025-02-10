'use client'
import React, { useContext, useEffect } from 'react'
import classNames from 'classnames'
import { Context } from '../../../context'
import { msToTime } from '../../../utils/MSToTotalTime'

interface Clock {
  clock: number
  setClock: (value: number) => void
}

const Clock = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error("Clock must be used within a ContextProvider")
  }

  const { clock, setClock } = context

  useEffect(() => {
    const interval = setInterval(() => {
      if (clock > 0) {
        setClock(clock - 1000)
      }
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <div
      className={classNames('flex-column', 'justify-center', 'align-center')}
    >
      <h1>Clock</h1>
      {<h1>{msToTime(clock)}</h1>}
    </div>
  )
}

export default Clock
