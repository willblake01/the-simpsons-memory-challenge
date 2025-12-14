'use client'
import React, { useContext, useState } from 'react'
import { Context, ContextType } from '@/app/context'
import { LargeButton, UserInput } from '../../utils'
import Alert from '../../utils/Alert'

const AddListItem = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('Context must be used within a Provider')
  }

  const { rawList, setRawList } = context as unknown as ContextType

  const [newItem, setNewItem] = useState('')

  const allCharacters = [
    'Homer Simpson',
    'Marge Simpson',
    'Bart Simpson',
    'Lisa Simpson',
    'Maggie Simpson',
    'Abraham Simpson',
    "Santa's Little Helper",
    'Snowball II',
    'Snowball V',
    'Apu Nahasapeemapetilon',
    'Barney Gumble',
    'Bleeding Gums Murphy',
    'Chief Clancy Wiggum',
    'Dewey Largo',
    'Eddie',
    'Edna Krabappel',
    'Itchy & Scratchy',
    'Janey Powell',
    'Jasper Beardly	',
    'Jimbo Jones',
    'Kearney Zzyzwicz',
    'Kent Brockman',
    'Krusty the Clown',
    'Lenny Leonard',
    'Lionel Hutz',
    'Luann Van Houten',
    'Martin Prince',
    'Maude Flanders',
    'Milhouse Van Houten',
    'Miss Hoover',
    'Moe Szyslak',
    'Ned Flanders',
    'Nelson Muntz',
    'Otto Mann',
    'Patty Bouvier',
    'Principal Skinner',
    'Professor Frink',
    'Rainier Wolfcastle',
    'Ralph Wiggum',
    'Rod Flanders',
    'Seymour Skinner',
    'Sherri & Terri',
    'Sideshow Bob',
    'Sideshow Mel',
    'Snake Jailbird',
    'Troy McClure',
    'Waylon Smithers',
    'Wendell Borton',
    'Abe Simpson',
    'Agnes Skinner',
    'Allison Taylor',
    'Aristotle Amadopolis',
    'Artie Ziff',
    'Bernice Hibbert',
    'Birch Barlow',
    'Brandine Spuckler',
    'Reverend Timothy Lovejoy',
    'C. Montgomery Burns',
    'Carl Carlson',
    'Cletus Spuckler',
    'Comic Book Guy',
    'Cookie Kwan',
    'Disco Stu',
    'Dr. Hibbert',
    'Dr. Nick Riviera',
    'Duffman',
    'Eleanor Abernathy',
    'Elizabeth Hoover',
    'Fat Tony',
    'Frank Grimes',
    'Gil Gunderson',
    'Groundskeeper Willie',
    'Hans Moleman',
    'Helen Lovejoy',
    'Herman Hermann',
    'Hollis Hurlbut',
    'Jacqueline Bouvier',
    'Jebediah Springfield',
    'Judge Roy Snyder',
    'Kang & Kodos',
    'Kirk Van Houten',
    'Lionel Hutz',
    'Lunchlady Doris',
    'Mayor Quimby'
  ]

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    setNewItem(value)
  }

  const addListItem = (character: string) => {
    const alreadyAdded = rawList.includes(character)
    const isSimpsonsCharacter = allCharacters.some(familyMember =>
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
          allCharacters.some(familyMember => familyMember.includes(character))
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
