interface PageInfo {
  current_page: number;
  data: any[]; 
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Link {
  url: string;
  label: string;
  active: boolean;
}

interface PaginatorProps {
  pageInfo: PageInfo;
  getData: (links:string ) => void;
}

export default function Paginator({ pageInfo, getData }: PaginatorProps) {

  const handlePrevius = () => {
    console.log(pageInfo.prev_page_url )
    
    if(pageInfo.prev_page_url!==null){
      getData((pageInfo.prev_page_url).slice(-1) )
    }
  };
  const handleNext = () => {
    if(pageInfo.next_page_url!==null)
        getData((pageInfo.next_page_url).slice(-1))
  };

  return (
    <div className="paginator">
      <div className="pagination-info">
        <p>Items por página {pageInfo.per_page}</p>
        <h6 className="page-range">{`${pageInfo.from}-${pageInfo.to} de ${pageInfo.current_page}`}</h6>
      </div>
      <div>
        <button
          onClick={handlePrevius}
          className="pagination-button"
          disabled={pageInfo.current_page === 1}
          
        >
          {"<"}
        </button>
        <button
          onClick={handleNext}
          className="pagination-button"
          disabled={pageInfo.current_page === pageInfo.last_page}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
