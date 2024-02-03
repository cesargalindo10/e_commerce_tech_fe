import React, { MouseEventHandler } from 'react'

interface Props{
    text?: string,
    onClick?:  MouseEventHandler<HTMLButtonElement>;
    variant: string,
    children?: React.ReactNode
    type?: "button" | "submit" | "reset"
}
function Button({text, onClick, variant, children, type = "button"}:Props) {
  const classname = FactoryStyle(variant)
  return (
    <button type={type} onClick={onClick} className={`btn-gral ${classname}`}>
      {children}
      {text}
    </button>
  )
}

export default Button

const FactoryStyle = (variant : string): string => {
  switch (variant) {
    case 'success':
      return 'btn--success';
    case 'error':
        return 'btn--error';
    case 'new':
      return 'btn--new';
    case 'main':
        return 'btn--main';
    case 'disable':
        return 'btn--disable';
    default:
       return '';
  }
}