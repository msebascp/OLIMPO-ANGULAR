import { Payments } from "./payments";
import { Trainer } from "./trainer";

export interface Customer {
    id: number;
    name: string;
    surname: string;
    email: string;
    trainer_id: number;
    dateInscription: string;
    lastPayment: Date;
    nextPayment: Date;
    typeTraining: string;
    photo: string;
    trainer: Trainer;
    payment: Payments[]
}