import { useState } from "react"
import { AxiosService } from "../../service/api.service";

function useSale() {    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchOrderDetails = async (idSale: number) => {
        try {
            const url = 'sale-detail/' + idSale;
            setLoading(true);
            const response = await AxiosService.get(url, '');
            const { data } = response.data
            return data;
        } catch (error) {
            
        } finally{
            setLoading(false);
        }
     
    }

    return {fetchOrderDetails, loading, data}
}

export default useSale