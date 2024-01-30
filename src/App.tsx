import { Route, Routes } from 'react-router-dom'
import { Product } from './components/product/Product'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'
function App() {
  return (
      <Routes>
        <Route path="/product" element={<Product />} />
      </Routes>
  )
}

export default App
