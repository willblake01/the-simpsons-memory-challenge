import React from 'react'
import classNames from 'classnames'
import { LargeButton } from '../../utils/Buttons'

interface HintButtonsProps {
  displayAuthor: boolean
  handleFetchQuote: () => void
  setDisplayAuthor: (value: boolean) => void
  setDisplayHints: (value: boolean) => void
}

const HintButtons = ({
  displayAuthor,
  handleFetchQuote,
  setDisplayAuthor,
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
        onClick={() => setDisplayAuthor(!displayAuthor)}
        text={displayAuthor ? 'Hide Author' : 'Show Author'}
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
