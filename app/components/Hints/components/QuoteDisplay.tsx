import React from 'react'
import classNames from 'classnames'
import { ImageTilt } from '@/app/components/utils/ImageTilt'
import type { Quote } from '@/app/types'

interface QuoteProps {
  showAuthor: boolean
  quoteData:  Quote | null
}

const QuoteDisplay = ({ showAuthor, quoteData }: QuoteProps) => {
  const { character = '', image = '', quote = '' } = quoteData || {}

  return quoteData && (
    <div
      className={classNames('quote-card', 'flex-column', 'justify-center', 'align-center', 'width-max-content')}
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
