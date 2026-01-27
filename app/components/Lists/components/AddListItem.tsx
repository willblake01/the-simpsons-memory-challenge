'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context, ContextType } from '@/app/context'
import { Alert, LargeButton, UserInput } from '../../utils'
import { ALL_CHARACTERS } from '@/app/constants'

const AddListItem = () => {
  const context = useContext(Context)

  const SOUND_EFFECT_SRC = '/audio/doh.mp3'

  const soundEffectRef = useRef<HTMLAudioElement | null>(null)

  if (!context) {
    throw new Error('Context must be used within a Provider')
  }

  const { rawList, setRawList } = context as unknown as ContextType

  const [guess, setGuess] = useState('')

  useEffect(() => {
    soundEffectRef.current = new Audio(SOUND_EFFECT_SRC)
    soundEffectRef.current.preload = 'auto'
    soundEffectRef.current.volume = 0.5

    return () => {
      soundEffectRef.current?.pause()
      soundEffectRef.current = null
    }
  }, [soundEffectRef])

  const normalizeGuess = (guess: string) => {
    return guess
      .trim()
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9']+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const playErrorSound = () => {
    const audio = soundEffectRef.current
    if (!audio) return

    audio.currentTime = 0
    audio.play().catch(() => {
      console.log('Something went wrong with audio')
    })
  }

  const validateGuess = (guess: string) => {
    const normalized = normalizeGuess(guess)
    const alreadyAdded = rawList.some(character => character.name.toLowerCase() === normalized || character.aliases?.some(alias => alias.toLowerCase() === normalized))

    const isSimpsonsCharacter = ALL_CHARACTERS.some(({ name, aliases }) => {
      const namesToMatch = [name, ...(aliases ?? [])].map(normalizeGuess)

      return namesToMatch.some(n => n === normalized)
    })

    if (alreadyAdded) {
      playErrorSound()

      Alert({
        title: 'Duplicate Error',
        text: `${guess} already added, please add a different character.`
      })
    } else if (!isSimpsonsCharacter) {
      playErrorSound()

      Alert({
        title: 'Validation Error',
        text: `${guess} is not a Simpsons character, please add a Simpsons character.`
      })
    } else {
      const character = ALL_CHARACTERS.find(({ name, aliases }) => {
        const namesToMatch = [name, ...(aliases ?? [])].map(normalizeGuess)
        return namesToMatch.some(n => n === normalized)
      })
      if (character) {
        setRawList(rawList.concat(character))
      }
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    const trimmedValue = value.trim()
    
    setGuess(trimmedValue)
  }

  const handleSubmit = () => {
    if (!guess) return

    validateGuess(guess)
    setGuess('')

    const input = document.getElementById('add-item-id') as HTMLInputElement
    if (input) input.value = ''
  }

  return (
    <form className='form' onSubmit={(e) => {
      e.preventDefault()
      handleSubmit()
    }}>
      <h1>Add Character</h1>
      <div className='flex-row'>
        <UserInput
          type='text'
          pattern="[A-Za-z']+(?: [A-Za-z']+)*"
          inputMode='text'
          placeholder='Name'
          id='add-item-id'
          onChange={handleInput}
        />
        <LargeButton
          text='Add'
          className='large-button'
          onClick={handleSubmit}
        />
      </div>
    </form>
  )
}

export default AddListItem
