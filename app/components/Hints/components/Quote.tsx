import React from 'react'
import classNames from 'classnames'
// import ImageTilt from '../../utils/ImageTilt/ImageTilt'
import Tilt from '../../utils/ImageTilt/components/Tilt'

interface QuoteProps {
  displayAuthor: boolean
  quoteData: {
    character: string
    image: string
    quote: string
  }
}

const Quote = ({ displayAuthor, quoteData }: QuoteProps) => {
  const { character, image, quote } = quoteData || {}
  {
    return quoteData && (
      <div
        className={classNames('flex-column', 'justify-center', 'align-center', 'width-max-content')}
      >
        <div className={classNames('margin-bottom-20', 'width-max-content')}>
           {/* <ImageTilt alt='Quote Author' src={image} /> */}
          <Tilt>
            <img className="quote-image" src={image} alt="character" />
          </Tilt>
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
