import React, { useEffect, useRef, useState } from 'react'
import CategoryList from './CategoryList'
import { AxiosService } from '../../service/api.service'
import { Category } from '../../models/models'
import './landingpage.css'
import CategoriesAll from './Category/CategoryAll'
import Header from '../../shared/header/Header'
import Footer from '../../shared/footer/Footer'


export interface ProductCat{  
    id: number,
    url_image: string
    name: string
    code: string
    sale_price: string
  }
interface CatWithProd extends Category{
    products: ProductCat[]
}
export interface AppState {
    'categoriesWithProducts': CatWithProd[]
}
function LandingPage() {
    const [categoriesWithProducts, setCategoriesWithProducts] = useState<AppState['categoriesWithProducts']>([]);
    const categoryListRef = useRef<HTMLUListElement>(null);


   useEffect(() => {
    getProductWithCategories()
   },[])
     
  const getProductWithCategories = async () => {
    try {
        const response = await AxiosService.get('categories/products', '')
        if(response){
            setCategoriesWithProducts(response.data)
        }
    } catch (error) {
        
    } finally {

    }
  }

 const styles: React.CSSProperties = {   
  position: 'sticky',
  top: 0,
  boxShadow: '-1px 2px 6px 0px rgba(0,0,0,0.55)',
 }
 return (
    <>
    <div style={styles}>
      <Header/>
    {/* header */}
      <CategoryList categories={categoriesWithProducts} categoryListRef={categoryListRef}/> 
    </div>
    <main className='content-page'>
        <CategoriesAll categories={categoriesWithProducts} categoryListRef={categoryListRef}/>
    </main>
    <Footer/>
    </>
  )
}

export default LandingPage