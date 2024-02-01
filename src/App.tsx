import { Route, Routes } from 'react-router-dom'
import { Product } from './components/product/Product'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'
import { Sale } from './components/sale/Sale';
function App() {
  return (
      <Routes>
        <Route path="/products" element={<Product />} />
        <Route path="/sales" element={<Sale />} />
      </Routes>
  )
}

export default App
