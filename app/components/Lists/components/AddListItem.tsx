'use client'
import React, { useContext, useState } from 'react'
import { Context, ContextType } from '@/app/context'
import { Alert, LargeButton, UserInput } from '../../utils'
import { ALL_CHARACTERS } from '@/app/constants'

const AddListItem = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('Context must be used within a Provider')
  }

  const { rawList, setRawList } = context as unknown as ContextType

  const [guess, setGuess] = useState('')

  const normalizeGuess = (guess: string) => {
    return guess
      .trim()
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const validateGuess = (guess: string) => {
    const normalized = normalizeGuess(guess)
    const alreadyAdded = rawList.some(character => character.name === normalized || character.aliases?.includes(normalized))

    const isSimpsonsCharacter = ALL_CHARACTERS.some(({ name, aliases }) => {
      const namesToMatch = [name, ...(aliases ?? [])].map(normalizeGuess)

      return namesToMatch.some(n => n === normalized)
    })

    if (alreadyAdded) {
      Alert({
        title: 'Duplicate Error',
        text: `${guess} already added, please add a different character.`
      })
    } else if (!isSimpsonsCharacter) {
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
    if (guess) {
      Promise.all([
        validateGuess(guess),
        setGuess('')
      ]).then(
        () =>
          ((document.getElementById(
            'add-item-id'
          ) as HTMLInputElement).value = '')
      )
    }
  }

  return (
    <form className='form' onSubmit={(e) => {
      e.preventDefault()
      handleSubmit()
    }}>
      <h1>Add a Simpsons Character to the List</h1>
      <div className='flex-row'>
        <UserInput
          type='text'
          pattern='[A-Za-z]+(?: [A-Za-z]+)*'
          inputMode='text'
          placeholder='Character Name'
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
