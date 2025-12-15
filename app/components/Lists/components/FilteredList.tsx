'use client'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Context, ContextType } from '@/app/context'
import { Character, CharacterList } from '@/app/types'
import { THE_SIMPSONS_FAMILY } from '@/app/constants'

const FilteredList = () => {
  const context = useContext(Context)

  const rawList: CharacterList = useMemo(() => context?.rawList || [], [context?.rawList]) as unknown as ContextType['rawList']

  const [familyMembers, setFamilyMembers] = useState<string[]>(context?.rawList || [])

  useEffect(() => {
    const filteredCharacterInput: Character[] = rawList
      .filter((character: Character) =>
      THE_SIMPSONS_FAMILY.some((familyMember: Character) => familyMember.includes(character))
      )
      .map((filteredCharacter: Character) => filteredCharacter)
    setFamilyMembers(filteredCharacterInput)
  }, [rawList])

  return (
    <section>
      <ul className="list">
        <h2>Simpsons Family</h2>
        {familyMembers.map((filteredCharacter, index) => (
          <li key={`${filteredCharacter}-${index}`}>{filteredCharacter}</li>
        ))}
      </ul>
    </section>
  )
}

export default FilteredList
