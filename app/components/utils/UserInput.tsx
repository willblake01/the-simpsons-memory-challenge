import React from 'react'

interface UserInputProps {
  type: string
  inputMode: 'text' | undefined
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  pattern: string
  id: string
}

const UserInput = ({ type, inputMode, placeholder, onChange, pattern, id }: UserInputProps) => (
  <input
    type={type}
    pattern={pattern}
    inputMode={inputMode}
    placeholder={placeholder}
    onChange={onChange}
    id={id}
  />
)

export default UserInput
