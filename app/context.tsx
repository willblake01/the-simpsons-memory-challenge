'use client'
import React, { createContext, ReactNode } from 'react'
import { useLocalStorage } from './components/utils'
import { Character, CharacterList, Quote } from './types'

export interface ContextType {
  clock: number
  setClock: (value: number) => void
  displayHints: boolean
  setDisplayHints: (value: boolean) => void
  goal: number
  setGoal: (value: number) => void
  quote: Quote | null
  setQuote: (value: Quote | null) => void
  rawList: CharacterList
  setRawList: (value: Character[]) => void
  revisionsRemaining: number
  setRevisionsRemaining: (value: number) => void
  score: number
  setScore: (value: number) => void
}

export const Context = createContext<ContextType | null>(null)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [clock, setClock] = useLocalStorage('clock', null)
  const [displayHints, setDisplayHints] = useLocalStorage('displayHints', false)
  const [goal, setGoal] = useLocalStorage('goal', null)
  const [quote, setQuote] = useLocalStorage('quote', null)
  const [rawList, setRawList] = useLocalStorage('rawList', [])
  const [revisionsRemaining, setRevisionsRemaining] = useLocalStorage(
    'revisionsRemaining',
    null
  )
  const [score, setScore] = useLocalStorage('score', 0)

  const context = {
    clock,
    setClock,
    displayHints,
    setDisplayHints,
    goal,
    setGoal,
    quote,
    setQuote,
    rawList,
    setRawList,
    revisionsRemaining,
    setRevisionsRemaining,
    score,
    setScore
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  )
}
