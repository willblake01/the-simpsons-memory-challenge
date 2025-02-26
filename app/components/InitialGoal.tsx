import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { Context, ContextType } from '../context'
import { LargeButton, UserInput } from './utils'

const InitialGoal = () => {
  const router = useRouter()

  const gamePrompt =
    'How many characters can you name in 8 minutes? You can revise after the challenge starts but choose carefully, you can only do this once in the first 5 minutes! To score points for the challenge you must reach your goal. You will score 10 base points for every character in your goal and 1 bonus point for each additional character.'

  const {
    setClock,
    setGoal,
    setRawList,
    setRevisionsRemaining
  } = useContext(Context) as unknown as ContextType

  const handleGoalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setGoal(parseInt(value, 10))
  }

  const startChallenge = () => {
    Promise.all([
      setRawList([]),
      setRevisionsRemaining(1),
      setClock(480000)
    ]).then(() => router.push('/challenge'))
  }

  return (
    <div className={classNames(
      'flex-column',
      'align-center'
    )}>
      <form className="form">
        <h1>{gamePrompt}</h1>
        <div className="flex-row">
          <UserInput
            type="number"
            pattern="[0-9]"
            inputMode="numeric"
            placeholder="Please Enter a Number"
            id="initial-count-input"
            onChange={handleGoalInput}
          />
          <LargeButton
            text="Submit"
            className="large-button"
            onClick={startChallenge}
          />
        </div>
    </form>
    </div>
  )
}

export default InitialGoal
