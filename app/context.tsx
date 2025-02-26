'use client'
import React, { createContext, ReactNode, useRef } from 'react'
import { useLocalStorage } from './components/utils'
import themeSongMP3 from './public/audio/The_Simpsons_Theme_Song.mp3'

interface ContextType {
  clock: number
  setClock: (value: number) => void
  displayAuthor: boolean
  setDisplayAuthor: (value: boolean) => void
  displayHints: boolean
  setDisplayHints: (value: boolean) => void
  goal: number
  setGoal: (value: number) => void
  quoteData: object
  setQuoteData: (value: object) => void
  rawList: string[]
  setRawList: (value: string[]) => void
  revisionsRemaining: number
  setRevisionsRemaining: (value: number) => void
  score: number
  setScore: (value: number) => void
  songIsPlaying: boolean
  setSongIsPlaying: (value: boolean) => void
  songIsPaused: boolean
  setSongIsPaused: (value: boolean) => void
  themeSongRef: React.MutableRefObject<HTMLAudioElement | undefined>
}

export const Context = createContext<ContextType | null>(null)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const themeSongRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(themeSongMP3) : undefined
  );

  const [clock, setClock] = useLocalStorage('clock', null)
  const [displayAuthor, setDisplayAuthor] = useLocalStorage('displayAuthor', false)
  const [displayHints, setDisplayHints] = useLocalStorage('displayHints', false)
  const [goal, setGoal] = useLocalStorage('goal', 0)
  const [rawList, setRawList] = useLocalStorage('rawList', [])
  const [revisionsRemaining, setRevisionsRemaining] = useLocalStorage(
    'revisionsRemaining',
    null
  )
  const [score, setScore] = useLocalStorage('score', 0)
  const [songIsPlaying, setSongIsPlaying] = useLocalStorage('songIsPlaying', false)
  const [songIsPaused, setSongIsPaused] = useLocalStorage('songIsPaused', false)
  const [quoteData, setQuoteData] = useLocalStorage('quoteData', null)

  const context = {
    clock,
    setClock,
    displayAuthor,
    setDisplayAuthor,
    displayHints,
    setDisplayHints,
    goal,
    setGoal,
    quoteData,
    setQuoteData,
    rawList,
    setRawList,
    revisionsRemaining,
    setRevisionsRemaining,
    score,
    setScore,
    songIsPlaying,
    setSongIsPlaying,
    songIsPaused,
    setSongIsPaused,
    themeSongRef,
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}
