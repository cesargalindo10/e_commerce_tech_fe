import { useState } from "react"
import { AxiosService } from "../../service/api.service";

function useSale() {    
    const [loading, setLoading] = useState(false);

    const fetchOrderDetails = async (idSale: number) => {
        try {
            const url = 'api/sale-detail/' + idSale;
            setLoading(true);
            const response = await AxiosService.get(url, '');
            const { data } = response
            return data;
        } catch (error) {
            
        } finally{
            setLoading(false);
        }
     
    }

    return {fetchOrderDetails, loading}
}

export default useSale