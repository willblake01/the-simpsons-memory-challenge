import { NextResponse } from 'next/server';
import quotes from '../../data/quotes/quotes.json';

export const runtime = 'nodejs';

type Quote = {
  quote: string;
  character: string;
  image?: string;
  characterDirection?: 'Left' | 'Right';
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const count = Math.max(1, Math.min(10, Number(url.searchParams.get('count') ?? '1')));

  const data = Array.from({ length: count }, () => pickRandom(quotes as Quote[]));

  return NextResponse.json(data, {
    headers: {
      // avoid stale quotes in edge caches unless you want caching
      'Cache-Control': 'no-store',
    },
  });
}
