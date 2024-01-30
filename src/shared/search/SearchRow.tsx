import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import './search.css'
import { Form } from 'react-bootstrap'
interface Props{
    setShow: (value: boolean) => void
    filterSomething: (value: string) => void
    placeHolder: string
    handleClear: () => void
    children?: React.ReactNode
}
const SearchRow = ({ setShow, filterSomething, placeHolder, handleClear, children}: Props) => {


  /* Falta implementar */
  const [search, setSearch] = useState('')
  const inputSearchRef = useRef();

  useEffect(() => {
    inputSearchRef.current.focus();
  },[])
  const handleOnChange = (e) => {
    const value = e.target.value;
    filterSomething(value);
    setSearch(value)
  }
  const handleClearSearch = (e) => {
    setSearch('')
    handleClear();
    inputSearchRef.current.focus();
  }

  return (
    <section className='search-bar'>
      <div className='content-search'>
        <input
          className='input'
          placeholder={placeHolder}
          value={search}
          onChange={(e) => handleOnChange(e)}
          ref={inputSearchRef}
        />
        <p className='btn-close btn-close-search' onClick={handleClearSearch}></p>
      </div>
      {children}
    </section>
  )
}

export default SearchRow;