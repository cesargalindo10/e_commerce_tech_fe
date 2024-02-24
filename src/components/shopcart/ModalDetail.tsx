import { Modal, Table } from "react-bootstrap";
import { AppStore } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import 'react-phone-number-input/style.css'
import { useState } from "react";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { APISERVICE } from "../../service/api.service";
import { cleanCart } from "../../redux/state/shop";

interface Props {
  show: boolean;
  onHide: () => void;
  setShowModalConfirm: () => void
}

function ModalDetail({ show, onHide, setShowModalConfirm}: Props) {
  const cartlist = useSelector((store: AppStore) => store.shop);
  const [userInfo, setUserInfo] = useState({name: '', phone: ''}) 
  const [errors, setErrors] = useState({ name: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const handleConfirm = () => {
    if(userInfo.name === ''){
      setErrors(lastState => ({...lastState, name: 'El nombre es requerido'}))
    }else{
      setErrors(lastState => ({...lastState, name: ''}))
    }
    if(userInfo.phone === ''){
      setErrors(lastState => ({...lastState, phone: 'El telefono es requerido'}))
    }else{
      setErrors(lastState => ({...lastState, phone: ''}))
    }
    if(errors.name.length === 0 && errors.phone.length === 0 && userInfo.name !== '' && userInfo.phone !== ''){
      sendInfo()
    }
  }

  const sendInfo = async () => {
    const orderDetails = cartlist.map(product => {
      return {
        product_id: product.id,
        quantity: product.quantity,
        state: 'pendiente'
      }
    })
    const body = {
      orderDetails,
      data: {
        total: getTotal(),
        state: 'pendiente',
        customer_name: userInfo.name,
        customer_phone: userInfo.phone,
      }
    }
    try {
      setLoading(true)
      const response = await APISERVICE.post(body, 'api/sale', '');
      if(response){
        onHide()
        setShowModalConfirm()
        dispatch(cleanCart());
        //navigate('/')
      }
    } catch (error) {
      
    } finally{
      setLoading(false)
      loading
    }
  }
  const getTotal = () => {
    return cartlist.reduce((acc, product) => acc + product.quantity * product?.sale_price, 0)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }
  return (
    <Modal show={show} centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h3 className="modal-cart-title">Resumen de pedido</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "0rem 1rem" }}>
          <h5>Mis datos</h5>
          <label className="input-user-info">
            Nombre:*
            <input className="input" maxLength={50} minLength={3} type="text" placeholder="Ej. Juanito Perez" name="name"  value={userInfo.name} onChange={handleOnChange}/>
          </label>
          {
            errors.name.length > 0 && <p className="f-error">{errors.name}</p>
          }
          <label className="input-user-info">
            Telefono:*
          <PhoneInputWithCountrySelect
              className="phone-input"
              international={false}
              defaultCountry="BO"
              placeholder="79342271"
              value={userInfo.phone}
              name='phone'
              onChange={(e : any) => setUserInfo({...userInfo, phone: e})}/>
            </label>
          {
            errors.phone.length > 0 && <p className="f-error">{errors.phone}</p>
          }
        <Table>
          <thead className="cart-list-header">
            <tr>
              <th>Cant.</th>
              <th>Nombre</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="cart-list">
            {cartlist.map((product) => (
              <tr key={product.id}>
                <td className="cart-list-row"  style={{ textAlign: "center" }}>{product.quantity}x</td>
                <td className="cart-list-row" >{product.name}</td>
                <td className="cart-list-row"  style={{ textAlign: "right" }}>{product.quantity * product?.sale_price}</td>
              </tr>
            ))}

            <tr style={{padding: ".2rem"}}>
              <td colSpan={2}>Descuento (Bs.)</td>
              <td style={{ textAlign: "right" }}>
               0,00
              </td>
            </tr>
            <tr className="total-to-pay">
              <td style={{color: 'black'}} colSpan={2}>Total a pagar (Bs.)</td>
              <td style={{ textAlign: "right" }}>
                {getTotal()}
              </td>
            </tr>
          </tbody>
        </Table>

        <p style={{fontSize: '14px', textAlign: 'center'}}>*Después de confirmar tu pedido, nos pondremos en contacto contigo para coordinar la entrega y/o la opción de recogerlo.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-next" onClick={handleConfirm}>Confirmar</button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDetail;
