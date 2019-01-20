export interface ISalary{
    empId: string, 
    totalPay: number, 
    tax: number, 
    pension: number, 
    deductible?: IDeductible[], 
    addition?: IAddition[], 
    totalDeduction?: number, 
    netPay?: number
}

export interface IDeductible{
    reason: string, 
    amount: number, 
    qty: number
}

export interface IAddition{
    reason: string, 
    amount: number, 
    qty: number 
}