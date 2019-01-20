module.exports = function () {
  return{
      employees: [

        { 
          id:1, empId:"Emp123", fullName: "Employee one", position: "Vice Manager", department: "IT", gender:"M", 
          dateOfBirth: new Date("1990-10-27"), homePhone: 12345, mobilePhone: 12345678, address:"Employee Address 1", 
          emailAddress: "test@test.com", emrContactName: "Company ABC", emrContactAddress: "Company Address", emrContactPhone:11212, 
          emrContactEmail: "", bankName:"", bankBranch:"", bankAccountNumber: null, employementType: "", grossPayment: 12000, 
          extraInfo:"", 

        }, 

        {
          id:2, empId:"Emp546", fullName: "Employee one", position: "Vice Manager", department: "IT", gender:"M", 
          dateOfBirth: new Date("1990-10-27"), homePhone: 12345, mobilePhone: 12345678, address:"Employee Address 1", 
          emailAddress: "test@test.com", emrContactName: "Company ABC", emrContactAddress: "Company Address", emrContactPhone:11212, 
          emrContactEmail: "", bankName:"", bankBranch:"", bankAccountNumber: null, employementType: "", grossPayment: 12000, 
          extraInfo:"", 
        }, 
        {
          id:3, empId:"Emp542", fullName: "Employee one", position: "Vice Manager", department: "IT", gender:"M", 
          dateOfBirth: new Date("1990-10-27"), homePhone: 12345, mobilePhone: 12345678, address:"Employee Address 1", 
          emailAddress: "test@test.com", emrContactName: "Company ABC", emrContactAddress: "Company Address", emrContactPhone:11212, 
          emrContactEmail: "", bankName:"", bankBranch:"", bankAccountNumber: null, employementType: "", grossPayment: 12000, 
          extraInfo:"", 
        }, 

    ], 

    salaries: [
      {
        empId: "Emp123", totalPay: 15000, tax: 200, pension: 150, deductible : [{reason: "service ticket", amount: 200, qty: 10}, 
       {reason: "absent days", amount: 150, qty: 3}], addition: [{reason: "over time", amount: 500, qty:2}, {reason: "bonus", amount:1000, qty:1}], 
       totalDeduction: 1200, netPay: 12000
      }
    ], 
    timetrack: []
  }
}