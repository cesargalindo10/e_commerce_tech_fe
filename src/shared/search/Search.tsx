import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import "./search.css"

interface SearchRowProps {
  placeHolder: string;
  filterSomething: (value: string) => void;
  handleClear: () => void;
  children?: React.ReactNode
}

export default function Search({ placeHolder, filterSomething, handleClear, children }:SearchRowProps){
  const [search, setSearch] = useState<string>('');
  const inputSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  }, []);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
   // console.log(value)
    filterSomething(value);
    setSearch(value);
  };

  const handleClearSearch = () => {
    setSearch('');
    handleClear();
    if (inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  };

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
  );
};

