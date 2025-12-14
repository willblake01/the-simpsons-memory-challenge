'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, ContextType } from '../../context'
import classNames from 'classnames'
import { Quote } from './components'
import { HintsButtons } from './components'
import LoadingSpinner from '../utils/LoadingSpinner'

const Hints = () => {
    const {
      displayAuthor,
      setDisplayAuthor,
      quoteData,
      setQuoteData,
      setDisplayHints,
    } = useContext(Context) as unknown as ContextType

  const [isLoading, setIsLoading] = useState(false)

  const white = '#ffffff'

  const fetchData = async () => {
    const response = await fetch('/api/quotes')
    const data = response.json().then(data => data[0])
    return data
  }

  const handleFetchQuote = useCallback(() => {
    Promise.all([setIsLoading(true), setDisplayAuthor(false), fetchData()])
  .then(data => setQuoteData(data[2]))
  .then(() => setIsLoading(false))
  }, [setDisplayAuthor, setQuoteData])

  useEffect(() => {
    if (!quoteData) {
      handleFetchQuote()
    }
  }, [handleFetchQuote, quoteData])

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
          isLoading
            ?
          <LoadingSpinner
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{ height: '25rem' }}
            wrapperClass="dna-wrapper"
            ballColors={[white, white, white]}
            backgroundColor="orange"
            visible={isLoading}
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
