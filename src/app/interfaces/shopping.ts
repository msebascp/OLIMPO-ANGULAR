import { Product } from "./product";

export interface Shopping{
    id: number,
    id_customer: number,
    cantidad: number,
    id_product:  number,
    product: Product
}