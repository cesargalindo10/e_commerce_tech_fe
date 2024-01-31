import {  ReactNode } from "react"

interface Props{
  children:ReactNode
}
export default function Modal({children}:Props) {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  )
}