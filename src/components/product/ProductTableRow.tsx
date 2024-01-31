import { useContext } from "react";
import { Product } from "../../models/models";
import { ContextProduct, ContextProductType } from "./Product";
import Button from "../../shared/btns/Button";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { RowImage } from "../../shared/rowImage/RowImage";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
interface Props{
  product: Product
}
export default function ProductTableRow({
  product,
  /* deleteUser, */
}: Props) {

  const contextValue = useContext< ContextProductType | null>(ContextProduct);

  if(!contextValue)return 
  const { setProductToUpdate, setShowModal } = contextValue

  return (
    <>
        <td>{product.name}</td>
        <td>{product.code}</td>
        <td>{product.sale_price}</td>
        <td>{product.cost_price}</td>
        <td>{product.description}</td>
       
        <td >
          {
            product.state ? 
            <Button text="Activo" variant="success" />
            :
            <Button text="Inactivo" variant="error"/>
          }
        </td>
        <td >
          <RowImage url_image={APIURLIMG + product.url_image} type="row"/>
        </td>
        <td>fichaTec</td>
        <td style={{whiteSpace: 'nowrap'}}>
          <Button 
            onClick={() => {
              setShowModal(true);
              setProductToUpdate(product);
            }}
            variant="main"
          >
            <MdModeEdit/>
          </Button>
          {" "}
          <Button 
            onClick={() => {
              setShowModal(true);
              setProductToUpdate(product);
            }}
            variant="error"
          >
            <MdDelete />
          </Button>
        </td>
    </>
  );
}
