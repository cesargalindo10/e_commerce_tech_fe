export interface Product{
    id?:number,
    name: string,
    code: string,
    url_image?: string,
    url_pdf?: string,
    sale_price?: number,
    cost_price?: number,
    state: boolean | string,
    description?: string,
    brand_id?: number
    category_id?: number
}   

export type PageInfo = {
    count: number,
    next:  string,
    page: number,
    previous:  string,
    start: number,
    totalPages: number
} 

export interface Category{
    id?: number,
    name: string,
    description?: string
}
export interface Brand{
    id?: number,
    name: string,
    description?: string
}
export interface CategoryData{
    id:number;
    name: string;
    description: string;
    state:boolean;
    create_at: string | null;
    update_at: string | null;
}
export interface Sale{
    id?: number,
    total: number,
    order_number: number,
    state: string,
    customer_name: string,
    customer_phone: string
    created_at: string
}
export interface OrderDetail{
    id?: number,
    name: string,
    quantity: number,
    total: number,
    sale_price: number,
    url_image: string
}
export interface ProductBrand{
    brand:Brand,
    id?:number,
    name: string,
    code: string,
    url_image?: string,
    url_pdf?: string,
    sale_price?: number,
    cost_price?: number,
    state: boolean | string,
    description?: string,
    brand_id?: number
    category_id?: number
}  
export interface User {
    id:number,
    name:string,
    username:string,
    phone:string,
    state:true,
    password:string,
    role:string
}