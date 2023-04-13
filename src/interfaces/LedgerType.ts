export enum Tag {
    bank = "bank",
    cash = "cash",
    other = "other"
}

export enum Currency {
    USD = "USD",
    BDT = "BDT"
}

export enum AccountType {
    asset = "asset",
    expense = "expense",
    income = "income",
    liability = "liability"
}

interface LedgerType {

    account: string
    group: string
    type: AccountType
    tag: Tag
    currency: Currency

    createdBy?: Date | string
    updatedAt?: Date | string
}


export default LedgerType
