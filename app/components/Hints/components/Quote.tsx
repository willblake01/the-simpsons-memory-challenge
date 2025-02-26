import React from 'react'
import classNames from 'classnames'
import { ImageTilt } from '@/app/components/utils/ImageTilt'

interface QuoteProps {
  displayAuthor: boolean
  quoteData: {
    character: string
    image: string
    quote: string
  } | null
}

const Quote = ({ displayAuthor, quoteData }: QuoteProps) => {
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
            {displayAuthor ? `-${character}` : '-Anonymous Character'}
          </cite>
        </blockquote>
      </div>
    )
  }
}

export default Quote
