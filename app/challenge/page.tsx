'use client'
import React, { useCallback, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { Context, ContextType } from '../context'
import { Constraints, Hints, Lists, SongPlayer } from '../components'
import { LargeButton } from '../components/utils'
import { AddListItem } from '../components/Lists/components'

const Challenge = () => {
  const router = useRouter()
  
  const {
    clock,
    setClock,
    displayHints,
    setDisplayHints,
    goal,
    setQuoteData,
    setScore,
    themeSongRef
  } = useContext(Context) as unknown as ContextType

  const challengeActive = clock > 0

  const endChallenge = useCallback(async () => {
    Promise.all([
      themeSongRef.current?.load(),
      setScore(0),
      setClock(0),
      setQuoteData(null),
      setDisplayHints(false)
    ]).then(() => router.push('/score'))
  }, [router, setClock, setDisplayHints, setQuoteData, setScore, themeSongRef])

  useEffect(() => {
    if (goal && !challengeActive) {
      endChallenge()
    }
  }, [challengeActive, endChallenge, goal])

  return (
    <div
      className={classNames(
        'flex-column',
        'align-center',
        'margin-bottom-60'
      )}
    >
      <Constraints />
      {displayHints ? (
        <Hints />
      ) : (
        <LargeButton
          text="Show Hints"
          className="large-button"
          onClick={() => setDisplayHints(true)}
        />
      )}
      <SongPlayer />
      <Lists />
      <AddListItem />
      <LargeButton
        text="Submit"
        className="large-button"
        onClick={endChallenge}
      />
    </div>
  )
}

export default Challenge
