import { Trainer } from "./trainer";

export interface Customer {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    api_token: string;
    trainer_id: number;
    dateInscription: string;
    typeTraining: string;
    trainer: Trainer
}