import React from 'react'

interface LargeButtonProps {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  className: string
}

const LargeButton = ({ text, onClick, className }: LargeButtonProps) => (
  <button type="button" onClick={onClick} className={className}>
    {text}
  </button>
)

export default LargeButton
