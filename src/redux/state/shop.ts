import { createSlice } from "@reduxjs/toolkit"
import { ProductDetail } from "../../components/detailProduct/DetailProduct";


const initalState: ProductDetail[] = []
const keyLocalStorage = 'shop'

const shopSlice = createSlice({
    name: 'shop',
    initialState: window.localStorage.getItem(keyLocalStorage) ? JSON.parse(window.localStorage.getItem(keyLocalStorage)!) : initalState,
    reducers: {
        addProduct: (state, action) => {
            const newState = [...state, action.payload]; 
            window.localStorage.setItem(keyLocalStorage, JSON.stringify(newState));
            return newState;
        },
        decrement(state: ProductDetail[], action: {payload: number | undefined}) {
            if(action.payload === undefined) return state
            
            //encontrar por id y disminuir la cantidad
            const newState = [...state].map(product => {
                if(product.id === action.payload){
                    return {...product, quantity: product.quantity - 1}
                }
                return product
            })
            window.localStorage.setItem(keyLocalStorage, JSON.stringify(newState));
            return newState;

        },
        increment(state: ProductDetail[], action: {payload: ProductDetail}) {
            const index = state.findIndex(product => product.id === action.payload.id);
            if(index !== -1){
                state[index].quantity = state[index].quantity + 1
            }else{
                state.push({...action.payload, quantity: 1})
            }
            window.localStorage.setItem(keyLocalStorage, JSON.stringify(state));
            return state;
        },
        deleteProd (state, action) {
            const newState = [...state].filter(product => product.id !== action.payload);
            window.localStorage.setItem(keyLocalStorage, JSON.stringify(newState));
            return newState;
        },
        cleanCart () {
            window.localStorage.setItem(keyLocalStorage, JSON.stringify([]));
            return [];
        }
    }
});
export const { addProduct, increment,deleteProd,  decrement, cleanCart} = shopSlice.actions
export default shopSlice.reducer;