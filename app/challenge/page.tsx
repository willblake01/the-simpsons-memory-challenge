'use client'
import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { Context, ContextType } from '../context'
import { LargeButton } from '../components/utils'
import { GameStatus, Hints, Lists, SongPlayer } from '../components'
import { AddListItem } from '../components/Lists/components'
import themeSongMP3 from '../public/audio/The_Simpsons_Theme_Song.mp3'

const Challenge = () => {
  const router = useRouter()
  
  const {
    clock,
    setClock,
    displayHints,
    setDisplayHints,
    goal,
    setQuote,
    setScore
  } = useContext(Context) as unknown as ContextType

  const themeSongRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(themeSongMP3) : undefined
  )

  const challengeActive = clock > 0

  const endChallenge = useCallback(async () => {
    Promise.all([
      themeSongRef.current?.load(),
      setScore(0),
      setClock(0),
      setQuote(null),
      setDisplayHints(false)
    ]).then(() => router.push('/score'))
  }, [router, setDisplayHints, setQuote, setScore, themeSongRef, setClock])

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
      <GameStatus />
      {displayHints ? (
        <Hints />
      ) : (
        <LargeButton
          text="Show Hints"
          className="large-button"
          onClick={() => setDisplayHints(true)}
        />
      )}
      <SongPlayer themeSongRef={themeSongRef} />
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
