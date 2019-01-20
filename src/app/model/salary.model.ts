import { ISalary, IDeductible, IAddition } from './ISalary';

export class Salary implements ISalary{
    constructor(
        public empId: string, 
        public totalPay: number, 
        public tax: number, 
        public pension: number, 
        public deductible?: IDeductible[], 
        public addition?: IAddition[],
        public totalDeduction?: number, 
        public netPay?: number

    ){}
}

export class Deductible implements IDeductible{
    constructor(
      public reason: string, 
      public amount: number, 
      public qty: number
    ){}
}

export class Addition implements IAddition{
    constructor(
      public reason: string, 
      public amount: number, 
      public qty: number
    ){}
}