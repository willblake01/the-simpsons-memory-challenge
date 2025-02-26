'use client'
import React, { useContext } from 'react'
import { Context } from '../../../context'
import { SmallButton } from '../../utils'
import type { RawList } from '../../../types/RawList'

const List = () => {
  const context = useContext(Context)

  if (!context) {
    return null
  }

  const { rawList, setRawList }: RawList = context

  interface DeleteListItem {
    (item: string): void
  }

  const deleteListItem: DeleteListItem = item => {
    const rawListFiltered = rawList.filter((listItem: string) => listItem !== item)
    setRawList(rawListFiltered)
  }
  
  return (
    <section>
      <ol className="list">
        <h2>All Characters</h2>
        {rawList?.map((character, index) => (
          <li key={`${character}-${index}`}>
            {character}
            <SmallButton
              text="Delete"
              onClick={() => deleteListItem(character)}
            />
          </li>
        ))}
      </ol>
    </section>
  )
}

export default List
