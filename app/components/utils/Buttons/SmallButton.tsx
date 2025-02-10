import React from 'react'

interface SmallButtonProps {
  text: string
  onClick: () => void
}

const SmallButton = ({ text, onClick }: SmallButtonProps) => (
  <button type="button" onClick={onClick} className="small-button">
    {text}
  </button>
)

export default SmallButton
