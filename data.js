module.exports = function () {
  return{
      employees: [

          { 
            id:1, empId:"Emp123", fullName: "Employee one", position: "Vice Manager", department: "IT", gender:"M", 
            dateOfBirth: new Date("1990-10-27"), homePhone: 12345, mobilePhone: 12345678, address:"Employee Address 1", 
            emailAddress: "test@test.com", companyName: "Company ABC", companyAddress: "Company Address", companyPhone:"", 
            companyEmail: "", bankName:"", bankBranch:"", bankAccountNumber: null, employementType: "", grossPayment: 12000, 
            netPayment: 9000, totalDeduction: 3000, extraInfo:"", 

          }, 

          {
            id:2, empId:"Emp456", fullName: "Employee Two", position: "Manager", department: "IT", gender:"M", 
            dateOfBirth: new Date("1990-10-17"), homePhone: 12345, mobilePhone: 12345678, address:"Employee Address 2", 
            emailAddress: "test@test.com", companyName: "Company ABC", companyAddress: "Company Address", companyPhone:"", 
            companyEmail: "", bankName:"", bankBranch:"", bankAccountNumber: null, employementType: "", grossPayment: 12000, 
            netPayment: 9000, totalDeduction: 3000, extraInfo:"", 
          }, 
          {
            id:1, empId:"Emp789", fullName: "Employee Three", position: "Engineer", department: "IT", gender:"M", 
            dateOfBirth: new Date("1990-8-27"), homePhone: 12345, mobilePhone: 12345678, address:"Employee Address 3", 
            emailAddress: "test@test.com", companyName: "Company ABC", companyAddress: "Company Address", companyPhone:"", 
            companyEmail: "", bankName:"", bankBranch:"", bankAccountNumber: null, employementType: "", grossPayment: 12000, 
            netPayment: 9000, totalDeduction: 3000, extraInfo:"", 

          }, 

    ], 

    timetrack: []
  }
}