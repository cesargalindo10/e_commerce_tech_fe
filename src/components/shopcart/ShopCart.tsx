import { PiShoppingCart } from "react-icons/pi"
import Header from "../../shared/header/Header"
import './shopcart.css'
import { AiOutlineHome } from "react-icons/ai"
import { FaAngleRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import CartProduct from "./CartProduct"
import { useSelector } from "react-redux"
import { AppStore } from "../../redux/store"
import { useState } from "react"
import ModalDetail from "./ModalDetail"
import ModalConfirm from "../../shared/confirmModal/ModalConfirm"
function ShopCart() {

  const cartList = useSelector((store: AppStore) => store.shop);
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const getTotal = () => {
    return cartList.reduce((acc, product) => acc + product.quantity * product?.sale_price, 0)
  }
  return (
    <>
    <Header/>
    <div className="shop-cart">
      <nav className="shop-cart-nav">
        <div className="d-flex align-items-center gap-2 mb-2">
          <Link className="shop-cart-nav-link" to={"/"}>
            <AiOutlineHome size={20}/>
            <h4>Inicio</h4>
          </Link>
          <div className="shop-cart-nav-link shop-cart-nav-link--gris ">
            <FaAngleRight />
            <h4>Mi carrito</h4>
          </div>
        </div>

        <div className="d-flex">
          <PiShoppingCart size={20}/>
          <h5>Mi carrito</h5>
        </div>
      </nav>
    
      <main className="content-page my-3">
        <h5>Resumen de Pedido</h5>
        
        <ul className="cart-products">
        {
          cartList?.length > 0 ? 
            cartList.map((product) => (
              <CartProduct product={product} key={product.id}/>
            ))
          :
          <li className="text-center">No hay productos en el carrito</li>
        }
        </ul>
        <div className="cart-total">
          <p>Total a pagar:</p>
          <p className="product-price product-price-total"> {getTotal()} 
            <span className="product-price-after-total">00</span>
            <span className="ml">Bs.</span>
          </p>
        </div>
        <button className="btn-next" onClick={() => setShowModal(true) } disabled={cartList.length === 0}>Continuar</button>
      </main>
    </div>
      <ModalDetail show={showModal} onHide={() => setShowModal(false)} setShowModalConfirm={() => setShowModalConfirm(true)} />
      <ModalConfirm show={showModalConfirm} onHide={() => setShowModalConfirm(false)} deleteSomething={() => setShowModal(false)} message="¿Deseas confirmar tu pedido?" />
    </>
  )
}

export default ShopCart