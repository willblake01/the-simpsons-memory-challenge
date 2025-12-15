import React from 'react'
import classNames from 'classnames'
import { ImageTilt } from '@/app/components/utils/ImageTilt'
import type { Quote } from '@/app/types'

interface QuoteProps {
  showAuthor: boolean
  quoteData:  Quote | null
}

const Quote = ({ showAuthor, quoteData }: QuoteProps) => {
  const { character = '', image = '', quote = '' } = quoteData || {}

  {
    return quoteData && (
      <div
        className={classNames('flex-column', 'justify-center', 'align-center', 'width-max-content')}
      >
        <div className={classNames('margin-bottom-20', 'width-max-content')}>
          <ImageTilt alt={character} height={460} src={image} width={320} />
        </div>
        <blockquote className={classNames('quote')}>
          <q>{quote}</q>
          <br />
          <br />
          <cite>
            {showAuthor ? `-${character}` : '-Anonymous Character'}
          </cite>
        </blockquote>
      </div>
    )
  }
}

export default Quote
