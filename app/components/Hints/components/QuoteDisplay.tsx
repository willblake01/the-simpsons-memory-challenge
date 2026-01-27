import React from 'react'
import classNames from 'classnames'
import { ImageTilt } from '@/app/components/utils/ImageTilt'
import type { Quote } from '@/app/types'

interface QuoteProps {
  showAuthor: boolean
  quoteData:  Quote | null
}

const characterColorMap: Record<string, string> = {
  'Homer Simpson': '#FFD90F',
  'Marge Simpson': '#4A90E2',
  'Bart Simpson': '#FF6F00',
  'Lisa Simpson': '#F5A623',
  'Abe Simpson': '#9B9B9B',
  'Milhouse Van Houten': '#4A6FA5',
  'Ralph Wiggum': '#F8E71C',
  'Principal Skinner': '#7B7B7B',
  'Nelson Muntz': '#7ED321',
  'Groundskeeper Willie': '#D0021B',
  'Moe Szyslak': '#4A4A4A',
  'Otto': '#7ED321',
  'Comic Book Guy': '#9B9B9B',
  'Chief Wiggum': '#4A6FA5',
  'Mayor Quimby': '#4A90E2',
  'Apu Nahasapeemapetilon': '#8B572A',
  'Duffman': '#D0021B',
  'Troy McClure': '#F5A623',
  'Rainier Wolfcastle': '#D0021B',
  'Mr. Burns': '#B8E986',
  'Waylon Smithers': '#6EC1E4',
  'Frank Grimes': '#8B572A',
  'Dr. Nick': '#50E3C2',   
}

const QuoteDisplay = ({ showAuthor, quoteData }: QuoteProps) => {
  const { character = '', image = '', quote = '' } = quoteData || {}

  return quoteData && (
    <div
      className={classNames('quote-card', 'flex-column', 'justify-center', 'align-center', 'width-max-content')}
      style={{ borderLeft: `4px solid ${characterColorMap[character] ?? '#888'}` }}
    >
      <div className={classNames('margin-bottom-20', 'width-max-content')}>
        <ImageTilt alt={character} src={image} />
      </div>
      <blockquote className={classNames('quote')}>
        <cite>
          <q>{quote}</q>
        </cite>
        <br />
        <br />
        {showAuthor ? `-${character}` : null}
      </blockquote>
    </div>
  )
}

export default QuoteDisplay
