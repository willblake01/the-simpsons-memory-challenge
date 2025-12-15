import React from 'react'
import classNames from 'classnames'
import { Clock, Goal } from './components'

const GameStatus = () => (
  <div
    className={classNames(
      'game-status',
      'flex-row',
      'space-between',
      'align-start'
    )}
  >
    <Clock />
    <Goal />
  </div>
)

export default GameStatus
