import { Payments } from "./payments";
import { Trainer } from "./trainer";

export interface Customer {
    id: number;
    name: string;
    surname: string;
    email: string;
    trainer_id: number;
    dateInscription: string;
    nextPayment: Date;
    typeTraining: string;
    trainer: Trainer;
    payment: Payments[]
}
