import { Product } from "./product";

export interface ProductsGetAll {
  data: Product[];
  message: string;
  success: boolean;
}
