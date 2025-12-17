export type Character = {
  id: string
  name: string
  aliases?: string[]
  isSimpson?: boolean
}

export interface Quote {
  quote: string
  character: string
  image: string
  characterDirection: 'Left' | 'Right'
}
