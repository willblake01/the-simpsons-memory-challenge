'use client'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Context, ContextType } from '@/app/context'
import type { Character } from '@/app/types'

const FilteredList = () => {
  const context = useContext(Context)

  const rawList: Character[] = useMemo(() => context?.rawList || [], [context?.rawList]) as unknown as ContextType['rawList']

  const [familyMembers, setFamilyMembers] = useState<Character[]>(context?.rawList || [])

  useEffect(() => {
    const filteredCharacterInput: Character[] = rawList
      .filter((character: Character) => character.isSimpson)
      .map((filteredCharacter: Character) => filteredCharacter)
    setFamilyMembers(filteredCharacterInput)
  }, [rawList])

  return (
    <section>
      <ul className="list">
        <h2>Simpsons Family</h2>
        {familyMembers.map((filteredCharacter, index) => (
          <li key={`${filteredCharacter}-${index}`}>{filteredCharacter.name}</li>
        ))}
      </ul>
    </section>
  )
}

export default FilteredList
