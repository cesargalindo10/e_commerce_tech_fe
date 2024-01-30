import { useEffect, useRef, useState } from "react";
import './pagination.css'
import { v4 as uuidv4 } from 'uuid';
import { PageInfo } from "../../models/models";
let maxPages: number;
interface Props {
  pageInfo: PageInfo | null
  getData: (page: number) => void
}
interface AppState {
  pageNumbers: number[],
  pageInfo: PageInfo | null
}
const Pagination = ({ pageInfo, getData }:Props) => {
  if(!pageInfo) return

  let { page, next, previous, totalPages } = pageInfo;
  const pageInfoRef = useRef<AppState['pageInfo'] | null>();

  const [pageNumbers, setPageNumbers] = useState<AppState['pageNumbers']>([])
  useEffect(() => {
    maxPages = window.innerWidth < 700 ? 2 : 3
    //solo actualizar cuando se modifican los filtros.
    if(pageNumbers.length === 0 || pageInfoRef.current?.totalPages !== totalPages){
      if(totalPages > maxPages){
        setPageNumbers(Array.from({ length: maxPages }, (_, i) => i + 1))
      }else{
        setPageNumbers(Array.from({ length: totalPages }, (_, i) => i + 1))
      }
      pageInfoRef.current = pageInfo;
    }
    //return;
  
  },[pageInfo])
  
  const handlePrevious = () => {
    const nroPage = previous.charAt(previous.length - 1);
    getData(Number(nroPage))
    if(page === pageNumbers[0]) handleSwapListLeft();
  }
  
  const handleNext = () => {
    const nroPage = next.charAt(next.length - 1);
    getData(Number(nroPage))
    if(page === pageNumbers[pageNumbers.length - 1]) handleSwapListRight();
  };

  const handleSwapListLeft = () => {
    let ini = pageNumbers[0] - maxPages;
    setPageNumbers(Array.from({ length: maxPages }, (_, i) => ini + i));
  }

  const handleSwapListRight = () => {
    let ini = pageNumbers[pageNumbers.length - 1];
    let nroMaxPages =  totalPages - ini;
    if(nroMaxPages > maxPages){
      nroMaxPages = maxPages;
    }
    if(nroMaxPages > 0) setPageNumbers(Array.from({ length: nroMaxPages }, (_, i) => ini + i + 1));
  }

  return (
    <div className="paginator">

      <button disabled={page === 1 ? true: false} onClick={handlePrevious} className={`paginator-btn ${page === 1 ? 'btn-disabled': ''}`}>{"<-Prev"}</button>
    
      {
        pageNumbers[0] > 1 && <p onClick={handleSwapListLeft}>
          ....
        </p>
      }
      {
        totalPages > 0 ?  pageNumbers.map((number) => {
          return <button key={uuidv4()} className={`pagination-numbers ${page === number ? "page-active": ''}`} onClick={() => getData(number)}>
              <p>{number}</p>
          </button>
        }):''
      }
      {
        totalPages > maxPages && totalPages !== pageNumbers[pageNumbers.length - 1] && <p onClick={handleSwapListRight}>
          ....
        </p>
      }
      <button disabled={page === totalPages ? true: false} onClick={handleNext} className={`paginator-btn ${page === totalPages? "btn-disabled": ''}`}>{"Next->"}</button>
    </div>
  );
};

export default Pagination;
