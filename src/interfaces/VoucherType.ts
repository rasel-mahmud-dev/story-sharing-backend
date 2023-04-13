import {Currency} from "./LedgerType";
import DebitCreditType from "../models/DebitCreditType";


export enum VoucherEnum {
    receipt = "receipt",
    payment = "payment",
    journal = "journal",
    contra = "contra"
}

interface VoucherType {
    id: Number
    currency: Currency
    createdBy: string
    date: Date | string
    description: string
    type: VoucherEnum
    debits: DebitCreditType[]
    credits: DebitCreditType[]
    createAt?: Date | string
    updatedAt?: Date | string
}


export default VoucherType
