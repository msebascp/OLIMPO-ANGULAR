export interface Payments {
    id: number;
    payment_type: string,
    payment_date: Date,
    paid: boolean,
    customer_id: number,
}