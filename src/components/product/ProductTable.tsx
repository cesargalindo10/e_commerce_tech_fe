import { Table } from "react-bootstrap";
import { PageInfo, Product } from "../../models/models";
import ProductTableRow from "./ProductTableRow";
import Pagination from '../../shared/pagination/Pagination'
interface Props {
  products: Product[],
  getProducts: (page: number) => void,
  deleteProduct: (id: number) => void,
  loading: boolean,
  pageInfo: PageInfo | null
}
export default function ProductTable({
  products,
  loading,
  getProducts,
  pageInfo
}: Props) {
  return (
    <>
        <Table responsive>
          <thead >
            <tr>
              <th>Nombre</th>  
              <th>Codigo</th>  
              <th>Precio venta</th>   
              <th>Precio compra</th>   
              <th>Descripcion</th>   
              <th>Estado</th>   
              <th>Imagen</th>   
              <th>Ficha Tecnica</th>  
              <th>#</th>  
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 ? (
              products.map((product) => (
                <tr key={crypto.randomUUID()}>
                <ProductTableRow
                  product = {product}
                  />
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={9}>{
                  !loading && "No existen productos aun!"
                  }
                  </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="mt-2">
       {products.length > 0 && (
            <Pagination pageInfo={pageInfo} getData={getProducts} />
      )}
    </div>
    </>
  );
}
