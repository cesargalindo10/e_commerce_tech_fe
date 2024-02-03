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