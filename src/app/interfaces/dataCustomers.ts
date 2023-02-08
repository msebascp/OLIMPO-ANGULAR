import { Customer } from "./customer";

export interface DataCustomers {
    data: Customer[];
    message: string;
    success: boolean;
}