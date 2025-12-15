import { NextResponse } from 'next/server'
import quotes from '../../data/quotes/quotes.json'
import type { Quote } from '../../types'

export const runtime = 'nodejs'

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  
  const count = Math.max(1, Math.min(10, Number(url.searchParams.get('count') ?? '1')))

  const data = Array.from({ length: count }, () => pickRandom(quotes as Quote[]))

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
