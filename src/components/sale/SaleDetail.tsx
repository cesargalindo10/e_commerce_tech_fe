import { useContext } from "react";
import { OrderDetail } from "../../models/models";
import { Modal, Table } from "react-bootstrap";
import { ContextSale, ContextSaleType } from "./Sale";
import Button from "../../shared/btns/Button";
interface Props {
  orderDetails: OrderDetail[],
  setShowPdf: () => void,
}
export const SaleDetail = ({ orderDetails, setShowPdf }: Props) => {
  const contextValue = useContext<ContextSaleType | null>(ContextSale);

  if (!contextValue) return;

  const {
    saleToShow,
    showModal,
    setShowModal,
  } = contextValue;

  const reset = () => {
    setShowModal(false);
  };

  const showPdf = () => {
    setShowModal(false);
    setShowPdf();
  }
  return (
    <Modal show={showModal} centered onHide={reset}>
      <Modal.Header>
        <h5 className="title-header__modal">Pedido: {saleToShow?.order_number}</h5>
      </Modal.Header>
   
      <Modal.Body>
          <p>Fecha: {saleToShow?.created_at?.slice(0, 10) + ' ' + saleToShow?.created_at?.slice(11, 19)}</p>
          <p>Nombre cliente: {saleToShow?.customer_name}</p>
          <p>Telefono cliente: {saleToShow?.customer_phone}</p>
        <Table responsive>
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Producto</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            {
              orderDetails?.length > 0 ? (
                orderDetails.map((orderDetail) => (
                  <tr key={orderDetail.id}>
                    <td>{orderDetail.quantity}</td>
                    <td>{orderDetail.name}</td>
                    <td>{orderDetail.total}</td>
                  </tr>
                ))
              )
              :
              <tr>
                <td colSpan={3}>No hay registros</td>
              </tr>
            }
          </tbody>
        </Table>
        <p>Total: {saleToShow?.total}</p>

        <div className="modal-btns mt-2">
              <Button variant="error" onClick={reset} text="Volver" />{" "}
              <Button
                onClick={showPdf}
                variant="main"
                type="submit"
                text="Pdf"
              />
            </div>
      </Modal.Body>
    </Modal>
  );
};
