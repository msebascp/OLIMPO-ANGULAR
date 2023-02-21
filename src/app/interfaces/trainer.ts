import { Customer } from "./customer";

export interface Trainer {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    specialty: string;
    photo: string;
    customer: Customer[]
}