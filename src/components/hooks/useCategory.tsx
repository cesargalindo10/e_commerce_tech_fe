import { useEffect, useState } from 'react'
import { AxiosService } from '../../service/api.service';
import { AppState } from '../landingPage/LandingPage';

function useCategory() {
    const [loading, setLoading] = useState(false);
    const [categoriesWithProducts, setCategoriesWithProducts] = useState<AppState['categoriesWithProducts']>([]);
    const getProductWithCategories = async () => {
        try {
            setLoading(true)
            const response = await AxiosService.get('api/categories/products', '')
            if(response){
                setCategoriesWithProducts(response.data)
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

useEffect(() => {
    getProductWithCategories()
},[])

  return { loading, categoriesWithProducts }
}

export default useCategory