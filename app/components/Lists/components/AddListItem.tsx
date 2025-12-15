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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    setGuess(value)
  }

  const validateGuess = (guess: string) => {
    const alreadyAdded = rawList.includes(guess)
    const isSimpsonsCharacter = ALL_CHARACTERS.some(character =>
      character.includes(guess)
    )

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
      setRawList(rawList.concat(guess))
    }
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (guess) {
      Promise.all([
        e.preventDefault(),
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
    <form className="form">
      <h1>Add a Simpsons Character to the List</h1>
      <div className="flex-row">
        <UserInput
          type="text"
          pattern="[A-Za-z]*"
          inputMode="text"
          placeholder="Character Name"
          id="add-item-id"
          onChange={handleInput}
        />
        <LargeButton
          text="Add"
          className="large-button"
          onClick={handleSubmit}
        />
      </div>
    </form>
  )
}

export default AddListItem
