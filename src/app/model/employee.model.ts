export class Employee {

    constructor(
        public id?: number,
        public empId?: string, 
        public fullName?: string, 
        public position?: string, 
        public department?: string,
        public gender?: string, 
        public dateOfBirth?: Date, 
        public homePhone?: number, 
        public mobilePhone?: number, 
        public address?: string, 
        public emailAddress?: string,
        public emrContactName?: string, 
        public emrContactAddress?: string, 
        public emrContactPhone?: number, 
        public emrContactEmail?: string, 
        public created?: Date,
        public bankName?: string, 
        public bankBranch?: string, 
        public bankAccountNumber?: number, 
        public employementType?:string, 
        public grossPayment?: number, 
        public extraInfo?: string
    ){}
   

}