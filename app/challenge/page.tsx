'use client'
import React, { useCallback, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { Context } from '../context'
import { Constraints, Hints, Lists, SongPlayer } from '../components'
import { LargeButton } from '../components/utils'
import { AddListItem } from '../components/Lists/components'

interface ChallengeContext {
  clock: number
  setClock: (value: number) => void
  displayHints: boolean
  setDisplayHints: (value: boolean) => void
  setScore: (value: number) => void
  themeSongRef: React.MutableRefObject<HTMLAudioElement | undefined>
}

const Challenge = () => {
  const router = useRouter()
  
  const {
    clock,
    setClock,
    displayHints,
    setDisplayHints,
    setScore,
    themeSongRef
  } = useContext(Context) as unknown as ChallengeContext

  const challengeActive = clock > 0

  const endChallenge = useCallback(async () => {
    Promise.all([
      themeSongRef.current?.load(),
      setScore(0),
      setClock(0),
      setDisplayHints(false)
    ]).then(() => router.push('/score'))
  }, [router, setClock, setDisplayHints, setScore, themeSongRef])

  useEffect(() => {
    if (!challengeActive) {
      endChallenge()
    }
  }, [challengeActive, endChallenge])

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
