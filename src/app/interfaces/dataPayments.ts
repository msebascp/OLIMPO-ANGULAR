import { Payments } from "./payments";

export interface DataPayments {
    data: Payments[];
    message: string;
    success: boolean;
}