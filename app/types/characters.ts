export type Character = {
  id: string
  name: string
  aliases?: string[]
}

export type CharacterList = Character[]

export interface Quote {
  quote: string
  character: string
  image: string
  characterDirection: 'Left' | 'Right';
}
