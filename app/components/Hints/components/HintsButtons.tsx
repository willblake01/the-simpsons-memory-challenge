import React from 'react'
import classNames from 'classnames'
import { LargeButton } from '../../utils/Buttons'

interface HintButtonsProps {
  showAuthor: boolean
  setShowAuthor: (value: boolean) => void
  setDisplayHints: (value: boolean) => void
  handleFetchQuote: () => void
}

const HintButtons = ({
  showAuthor,
  handleFetchQuote,
  setShowAuthor,
  setDisplayHints
}: HintButtonsProps) => {
  return (
    <div
      className={classNames(
        'align-center',
        'flex-row',
        'justify-center',
        'width-max-content'
      )}
    >
      <LargeButton
        className="large-button"
        onClick={handleFetchQuote}
        text="Next Quote"
      />
      <LargeButton
        className="large-button"
        onClick={() => setShowAuthor(!showAuthor)}
        text={showAuthor ? 'Hide Author' : 'Show Author'}
      />
      <LargeButton
        className="large-button"
        onClick={() => setDisplayHints(false)}
        text="Hide Hints"
      />
    </div>
  )
}

export default HintButtons
