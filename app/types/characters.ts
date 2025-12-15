export type Character = string

export type CharacterList = Character[]

export interface Quote {
  quote: string
  character: Character
  image: string
  characterDirection: 'Left' | 'Right';
}
