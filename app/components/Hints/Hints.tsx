'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Context, ContextType } from '../../context'
import { LoadingSpinner, useLocalStorage } from '../../components/utils'
import { HintsButtons, QuoteDisplay } from './components'

const Hints = () => {
    const {
      quote,
      setQuote,
      setDisplayHints,
    } = useContext(Context) as unknown as ContextType

  const [isLoading, setIsLoading] = useState(false)
  const [showAuthor, setShowAuthor] = useLocalStorage('showAuthor', false)

  const white = '#ffffff'

  const fetchData = async () => {
    const response = await fetch('/api/quotes')
    const data = response.json().then(data => data[0])
    return data
  }

  const handleFetchQuote = useCallback(() => {
    Promise.all([setIsLoading(true), setShowAuthor(false), fetchData()])
  .then(data => setQuote(data[2]))
  .then(() => setIsLoading(false))
  }, [setShowAuthor, setQuote])

  useEffect(() => {
    if (!quote) {
      handleFetchQuote()
    }
  }, [handleFetchQuote, quote])

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
          <QuoteDisplay quoteData={quote} showAuthor={showAuthor} />
        }
        <HintsButtons
            showAuthor={showAuthor}
            handleFetchQuote={handleFetchQuote}
            setShowAuthor={setShowAuthor}
            setDisplayHints={setDisplayHints}
          />
      </div>
    </div>
  )
}

export default Hints
