import { Table } from "react-bootstrap";
import { PageInfo, Sale } from "../../models/models";
import Pagination from '../../shared/pagination/Pagination'
import SaleTableRow from "./SaleTableRow";
interface Props {
  sales: Sale[],
  getSales: (page: number) => void,
  loading: boolean,
  pageInfo: PageInfo | null
}
export default function SaleTable({
  sales,
  loading,
  getSales,
  pageInfo
}: Props) {
  return (
    <>
        <Table responsive striped bordered hover>
          <thead >
            <tr>
              <th>Fecha</th>  
              <th>Numero de Pedido</th>  
              <th>Total</th>  
              <th>Estado</th>   
              <th>Nombre Cliente</th>   
              <th>Telefono Cliente</th>   
              <th>Estado</th>   
              <th>#</th>  
            </tr>
          </thead>
          <tbody>
            {sales?.length > 0 ? (
              sales.map((sale) => (
                <tr key={crypto.randomUUID()}>
                <SaleTableRow
                  sale = {sale}
                  />
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={9}>{
                  !loading && "No existen ventas aun!"
                  }
                  </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="mt-2">
       {sales?.length > 0 && (
            <Pagination pageInfo={pageInfo} getData={getSales} />
      )}
    </div>
    </>
  );
}
