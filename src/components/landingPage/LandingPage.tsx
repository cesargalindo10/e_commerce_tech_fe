import React, { useEffect, useRef, useState } from 'react'
import CategoryList from './CategoryList'
import { AxiosService } from '../../service/api.service'
import { Category } from '../../models/models'
import './landingpage.css'
import CategoriesAll from './Category/CategoryAll'
import Header from '../../shared/header/Header'
import Footer from '../../shared/footer/Footer'
import Skeleton from 'react-loading-skeleton'

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
    const [loading, setLoading] = useState(false);
   useEffect(() => {
    getProductWithCategories()
   },[])
     
  const getProductWithCategories = async () => {
    try {
        setLoading(true)
        const response = await AxiosService.get('categories/products', '')
        if(response){
            setCategoriesWithProducts(response.data)
        }
    } catch (error) {
        
    } finally {
      setLoading(false)
    }
  }

 const styles: React.CSSProperties = {   
  position: 'sticky',
  top: 0,
  boxShadow: '-1px 2px 6px 0px rgba(0,0,0,0.55)',
 }

 if(loading) return <div className='content-page mt-3'>
        <div className='d-flex gap-2 align-items-center justify-content-between'>
          <div className='d-flex gap-2 align-items-center'>
            <div style={{width: '50px'}}>
              <Skeleton circle width={50} height={50}/>
            </div>
            <div style={{width: '70px'}}>
              <Skeleton height={20}/>
            </div>
          </div>

          <div style={{width: '8%', alignItems: 'right'}}>
            <Skeleton height={20}/>
          </div>
        </div>

        <div className='d-flex gap-2'>
          <div style={{width: '25%'}}><Skeleton height={25}/></div>
          <div style={{width: '25%'}}><Skeleton height={25}/></div>
          <div style={{width: '25%'}}><Skeleton height={25}/></div>
          <div style={{width: '25%'}}><Skeleton height={25}/></div>
        </div>

        <br/>

        <Skeleton height={20} width={"25%"}/>
        <div className='d-flex gap-2 mb-2'>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
        </div>

        <Skeleton height={20} width={"25%"}/>
        <div className='d-flex gap-2 mb-2'>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
        </div>


        <Skeleton height={20} width={"25%"}/>
        <div className='d-flex gap-2 mb-2'>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
        </div>

        <Skeleton height={20} width={"25%"}/>
        <div className='d-flex gap-2 mb-2'>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
        </div>

        <Skeleton height={20} width={"25%"}/>
        <div className='d-flex gap-2 mb-2'>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
          <div style={{width: '33%'}}><Skeleton height={90}/></div>
        </div>
    
    </div>
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