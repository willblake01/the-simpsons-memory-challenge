'use client'
import React, { useContext, useState } from 'react'
import { Context, ContextType } from '@/app/context'
import { LargeButton, UserInput } from '../../utils'
import Alert from '../../utils/Alert'
import { ALL_CHARACTERS } from '@/app/constants'

const AddListItem = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('Context must be used within a Provider')
  }

  const { rawList, setRawList } = context as unknown as ContextType

  const [newItem, setNewItem] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    setNewItem(value)
  }

  const addListItem = (character: string) => {
    const alreadyAdded = rawList.includes(character)
    const isSimpsonsCharacter = ALL_CHARACTERS.some(familyMember =>
      familyMember.includes(character)
    )

    if (alreadyAdded) {
      Alert({
        title: 'Duplicate Error',
        text: `${character} already added, please add a different character.`
      })
    } else if (!isSimpsonsCharacter) {
      Alert({
        title: 'Validation Error',
        text: `${character} is not a Simpsons character, please add a Simpsons character.`
    })
    } else {
      const onlyCharacters = rawList
        .filter((character: string) =>
          ALL_CHARACTERS.some(familyMember => familyMember.includes(character))
        )
      setRawList(onlyCharacters.concat(character))
    }
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (newItem) {
      Promise.all([
        e.preventDefault(),
        addListItem(newItem),
        setNewItem('')
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
