'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context'
import { useLocalStorage } from '../utils'
import classNames from 'classnames'
import { FidgetSpinner } from 'react-loader-spinner'
import { Quote } from './components'
import { HintsButtons } from './components'

const Hints = () => {
  interface HintContext {
    displayAuthor: boolean
    setDisplayAuthor: (value: boolean) => void
    setDisplayHints: (value: boolean) => void
  }
  
    const {
      displayAuthor,
      setDisplayAuthor,
      setDisplayHints,
    } = useContext(Context) as unknown as HintContext

  const [isLoading, setIsLoading] = useState(false)
  const [quoteData, setQuoteData] = useLocalStorage('quoteData', null)

  const white = '#ffffff'

  const fetchData = async () => {
    const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
    const data = response.json().then(data => data[0])
    return data
  }

  const handleFetchQuote = () => {
    Promise.all([setIsLoading(true), setDisplayAuthor(false), fetchData()])
  .then(data => setQuoteData(data[2]))
  .then(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!quoteData) {
      handleFetchQuote()
    }
  })

  return (
    <div className="hints">
      <div
        className={classNames(
          'flex-column',
          'justify-center',
          'align-center',
        )}
      >
        {
          isLoading ? <FidgetSpinner
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{ height: '25rem' }}
            wrapperClass="dna-wrapper"
            ballColors={[white, white, white]}
            backgroundColor="orange"
          />
        :
        <Quote quoteData={quoteData} displayAuthor={displayAuthor} />
        }
        <HintsButtons
            displayAuthor={displayAuthor}
            handleFetchQuote={handleFetchQuote}
            setDisplayAuthor={setDisplayAuthor}
            setDisplayHints={setDisplayHints}
          />
      </div>
    </div>
  )
}

export default Hints
