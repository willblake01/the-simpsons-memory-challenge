'use client'
import React, { useContext } from 'react'
import { Context, ContextType } from '@/app/context'
import { SmallButton } from '../../utils'
import { Character } from '@/app/types'

const List = () => {
  const context = useContext(Context)

  if (!context) {
    return null
  }

  const { rawList, setRawList } = context as unknown as ContextType

  interface DeleteListItem {
    (item: string): void
  }

  const deleteListItem: DeleteListItem = itemName => {
    const rawListFiltered = rawList.filter((listItem: Character) => listItem.name !== itemName)
    setRawList(rawListFiltered)
  }
  
  return (
    <section>
      <ol className="list">
        <h2>All Characters</h2>
        {rawList?.map((character, index) => (
          <li key={`${character}-${index}`}>
            {character.name}
            <SmallButton
              text="Delete"
              onClick={() => deleteListItem(character.name)}
            />
          </li>
        ))}
      </ol>
    </section>
  )
}

export default List
