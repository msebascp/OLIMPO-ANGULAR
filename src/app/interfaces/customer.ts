import { ImcRecord } from "./imcRecord";
import { Payments } from "./payments";
import { Trainer } from "./trainer";

export interface Customer {
    id: number,
    name: string,
    surname: string,
    email: string,
    trainer_id: number,
    dateInscription: string,
    nextPayment: Date,
    typeTraining: string,
    photo: string,
    trainer: Trainer,
    imc_record: ImcRecord[],
    payment: Payments[],
    lastPayment: Payments
}
