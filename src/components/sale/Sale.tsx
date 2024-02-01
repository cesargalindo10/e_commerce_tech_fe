import { createContext, useEffect, useState } from "react";
import { SaleDetail } from "./SaleDetail";
import { AxiosService } from "../../service/api.service";
import { OrderDetail, PageInfo, Sale } from "../../models/models";
import SearchRow from "../../shared/search/SearchRow";
import SaleTable from "./SaleTable";
import useSale from "./useSale";
import { PDFViewer } from "@react-pdf/renderer";
import DocumentPdf from "./DocumentPdf";
import './sale.css'
interface AppState{
    sales: Sale [],
    pageInfo: PageInfo | null,
    sale: Sale | null,
    orderDetails: OrderDetail []
}
export interface ContextSaleType{
  saleToShow: Sale | null
  setSaleToShow: React.Dispatch<React.SetStateAction<Sale | null>>,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  getOrderDetails: (idSale: number) => void,
  getSales: (page?: number) => void,
  //sendMessageConfirm: (idSale: number) => void,
}

export const ContextSale = createContext<ContextSaleType | null>(null);

export function Sale (){

    const [sales, setSales] = useState< AppState['sales']>([]);
    const [orderDetails, setOrderDetails] = useState< AppState['orderDetails']>([]);
    const [loading, setLoading] = useState(false);
    const [saleToShow, setSaleToShow] = useState<AppState['sale']>(null)
    const [showModal, setShowModal] = useState(false);
    const [pageInfo, setpageInfo] = useState<AppState['pageInfo'] | null>(null);
    const { fetchOrderDetails } = useSale();
    const [showPdf, setShowPdf] = useState(false);

    useEffect(() => {
      getSales(1);
    }, []);
    const getSales = async (page: number = pageInfo?.page || 1) => {
      const url = 'sale';
      const params = {  
        page,
      }
      const response = await AxiosService.get(url, params);
      if(response){
          const { data, pageInfo } = response.data;
          setSales(data);
          setpageInfo(pageInfo);
        }
    }

    const getOrderDetails = async (idSale: number) => {
      const response = await fetchOrderDetails(idSale);
      if (response?.length === 0) return;
      setOrderDetails(response);
      setShowModal(true)
    };
  
    const filtercategories = () => {
      //debouncedGetCategogies(category)
    };


  
    const clearFilter = () => {
    }

    return (
      <ContextSale.Provider value={{saleToShow, setSaleToShow, showModal, setShowModal, getOrderDetails, getSales}}>
        <div className="">
         <h3>saleos</h3>
          <SearchRow
            filterSomething={filtercategories}
            placeHolder="Nombre del curso"
            handleClear={clearFilter}   
            setShow={setShowModal}
          />
          <SaleTable
            sales={sales}
            getSales={getSales}
            loading={loading}
            pageInfo={pageInfo}
          />
          <SaleDetail
            orderDetails={orderDetails}
            setShowPdf={() => setShowPdf(true)}
          />
        </div>
        <section className="position-relative">
          <div className={`backdrop ${showPdf ? 'active' : ''}`} onClick={() => setShowPdf(false)}>
          <div className="pdf-viewer">
            <PDFViewer style={{ width: "100%", height: "100vh" }}>
              <DocumentPdf orderDetails={orderDetails} saleToShow={saleToShow} city="Cochabamba" country="Bolivia" companyName="Servicios de Electrotecnia"/>
            </PDFViewer>
          </div>
          </div>  
        </section>

      </ContextSale.Provider>
    );
}