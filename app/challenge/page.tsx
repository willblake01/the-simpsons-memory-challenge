'use client'
import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { Context, ContextType } from '../context'
import { LargeButton } from '../components/utils'
import { GameStatus, Hints, Lists, ThemeSongPlayer } from '../components'
import { AddListItem } from '../components/Lists/components'

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

  const THEME_SONG_SRC = '/audio/theme_song.mp3'

  const themeSongRef = useRef<HTMLAudioElement | null>(null)

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
    themeSongRef.current = new Audio(THEME_SONG_SRC)
    themeSongRef.current.preload = 'auto'

    return () => {
      themeSongRef.current?.pause()
      themeSongRef.current = null
    }
  }, [])

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
          text='Show Hints'
          className='large-button'
          onClick={() => setDisplayHints(true)}
        />
      )}
      <ThemeSongPlayer themeSongRef={themeSongRef} />
      <Lists />
      <AddListItem />
      <LargeButton
        text='End Game'
        className='large-button'
        onClick={endChallenge}
      />
    </div>
  )
}

export default Challenge
