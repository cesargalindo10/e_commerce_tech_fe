import { useContext } from "react";
import { Product } from "../../models/models";
import { ContextProduct, ContextProductType } from "./Product";
import Button from "../../shared/btns/Button";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { RowImage } from "../../shared/rowImage/RowImage";
import defaultimg from '../../assets/img/defaulimg.png'
import ModalConfirm from "../../shared/confirmModal/ModalConfirm";
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
        <td>
          {
            product.url_image ? 
            <RowImage url_image={APIURLIMG + product.url_image} type="row"/>
            :
            <RowImage url_image={defaultimg} type="row"/>
          }
        </td>

        <td>
          {
            product.url_pdf ? 
            <a href={APIURLIMG + product.url_pdf} target="_blank">
            <Button text="VerFicha" variant="main" />
          </a>
          : 
          <Button text="SinPdf" variant="disable" />  
        }
        </td>
        
        <td style={{whiteSpace: 'nowrap'}}>
          <Button 
            onClick={() => {
              setShowModal(true);
              setProductToUpdate(product);
            }}
            variant="main"
          >
            <MdModeEdit size={20}/>
          </Button>
          {" "}
         {/*  <Button 
            onClick={() => {
              setShowModal(true);
              setProductToUpdate(product);
            }}
            variant="error"
          >
            <MdDelete size={20}/>
          </Button> */}
        </td>
    </>
  );
}
