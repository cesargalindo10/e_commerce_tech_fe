import { useContext, useState } from "react";
import { OrderDetail, Sale } from "../../models/models";
import Button from "../../shared/btns/Button";
import { ContextSale, ContextSaleType } from "./Sale";
import useSale from "./useSale";
import { AxiosService } from "../../service/api.service";
import { MdDelete } from "react-icons/md";
import ModalConfirm from "../../shared/confirmModal/ModalConfirm";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
interface Props {
  sale: Sale;
}

const typeStates: Record<string, string> = {
  pendiente: "Confirmar",
  confirmado: "Enviado",
  cancelado: "Cancelado",
};

enum typeStatesSale {
  pendiente = "pendiente",
  confirmado = "confirmado",
  cancelado = "cancelado",
}

export default function SaleTableRow({ sale }: Props) {
  const contextValue = useContext<ContextSaleType | null>(ContextSale);
  const [showAlert, setShowAlert] = useState(false);
  const user = useSelector((store: AppStore) => store.user)

  const { fetchOrderDetails } = useSale();
  if (!contextValue) return;
  const { setSaleToShow, getOrderDetails, getSales} = contextValue;

  const showDetail = () => {
    if (!sale.id) return;
    setSaleToShow(sale);
    getOrderDetails(sale.id);
    //setShowModal(true);
  };

  const changeState = async (state: string) => { 
    await AxiosService.patch({state: state}, `api/sale/${sale.id}`, '');
  }

  const updateSale = async () => {
    await AxiosService.patch({user_id: user.id}, `api/sale/${sale.id}`, '');
  }
  const sendMessageConfirm = async (idSale: number) => {
    if(sale.state === typeStatesSale.confirmado || sale.state === typeStatesSale.cancelado) return

    const response = await fetchOrderDetails(idSale);
    if (response?.length === 0) return;

    await changeState(typeStatesSale.confirmado);
    await updateSale()
    getSales()

    const message = `Hola ${sale.customer_name}, el pedido ha sido confirmado.`;
    const ordereDetailMessage =
      `Fecha: ${
        sale.created_at?.slice(0, 10) + " " + sale.created_at?.slice(11, 19)
      }%0A` +
      `Numero de pedido: ${sale.order_number}%0A` +
      `Total: ${sale.total}%0A` +
      `Nombre cliente: ${sale.customer_name}%0A%0A` +
      `Detalles del pedido: %0A`;
    const orderDetails = response?.map((orderDetail: OrderDetail) => {
      return (
        `${orderDetail.quantity}x ` +
        `${orderDetail.name}` +
        `${orderDetail.total}%0A`
      );
    });
    window.open(
      `https://wa.me/${sale.customer_phone}?text=${message}%0A%0A${ordereDetailMessage}%0A%0A${orderDetails}`
    );
  };

  const getVariant = (state: string) => {
    switch (state) {
      case "pendiente":
        return "error";
      case "confirmado":
        return "success";
      default:
        return "disable";
    }
  }

  const handleDelete = async () => {
    await changeState(typeStatesSale.cancelado)
    getSales()
    setShowAlert(false)
  }

  return (
    <>
      <td className="col-3">
        {sale.created_at?.slice(0, 10) + " " + sale.created_at?.slice(11, 19)}
      </td>
      <td>{sale.order_number}</td>
      <td>{sale.total}</td>
      <td>{sale.state}</td>
      <td>{sale.customer_name}</td>
      <td>{sale.customer_phone}</td>

      <td>
        <Button
          text={typeStates[sale.state]}
          variant={getVariant(sale.state)}
          onClick={() => sendMessageConfirm(sale?.id ?? 0)}
        />
      </td>

      <td style={{ whiteSpace: "nowrap" }}>
        <Button onClick={showDetail} variant="disable" text="Ver Detalle" />{" "}
         <Button 
            onClick={() => setShowAlert(true)}
            variant="error"
          >
            <MdDelete />
          </Button>
      </td>
      <ModalConfirm message="¿Deseas cancelar el pedido?" show={showAlert} onHide={() => setShowAlert(false)} deleteSomething={ handleDelete }/>
    </>
  );
}
