// One source of truth. In Google Sites this is the Systems Register sheet (Systems + Members tabs).
window.DATA = {
  company: "Company Intranet",
  notice: "Welcome to the new intranet — one front door for every system. Internal use only.",
  quick: [
    ["Apply Leave","forms.html#HR"],["Payment Request","forms.html#Accounts & IT"],
    ["Purchase Request","forms.html#Purchase & Store"],["IT Issue","forms.html#Accounts & IT"],
    ["Contacts","people.html#contacts"],["Holidays","people.html#holidays"]],
  rotating: ["Employee of the month","Openings","New form launched","Audit week"],
  // Systems tab: ID, name, what for, form link, sheet link, owner, status
  systems: [
    {id:"S01",name:"Leave Tracker",what:"Leave balance and approvals",form:"#",sheet:"#",owner:"HR",status:"Live"},
    {id:"S02",name:"Purchase Register",what:"Purchase requests to GRN",form:"#",sheet:"#",owner:"Purchase",status:"Live"},
    {id:"S03",name:"Stock Register",what:"Receipts, issues, monthly count",form:"#",sheet:"#",owner:"Store",status:"Live"},
    {id:"S04",name:"Sales Pipeline",what:"Leads, quotations, orders",form:"#",sheet:"#",owner:"Sales",status:"Live"},
    {id:"S05",name:"Dispatch Log",what:"Packing list, transporter, POD",form:"#",sheet:"#",owner:"Dispatch",status:"Pilot"}],
  // Members tab: ID, email, role  (one row per person per system)
  members: [
    {sid:"S01",email:"rahul@company.com",role:"Operator"},
    {sid:"S02",email:"rahul@company.com",role:"Approver"},
    {sid:"S04",email:"rahul@company.com",role:"Owner"},
    {sid:"S03",email:"rahul@company.com",role:"Viewer"},
    {sid:"S01",email:"priya@company.com",role:"Owner"},
    {sid:"S03",email:"suresh@company.com",role:"Owner"},
    {sid:"S05",email:"suresh@company.com",role:"Operator"}],
  forms: {
    "HR":["Leave","Salary Advance","Loan","Overtime","Resignation"],
    "Admin":["Courier","Travel Request","Expense Claim","Asset / Laptop","Visitor Entry"],
    "Purchase & Store":["Purchase Request","Vendor Registration","Goods Received","Material Issue","Stock Count"],
    "Sales & Service":["New Lead","Quotation Request","Sample Request","Customer Complaint","Service Call"],
    "Accounts & IT":["Payment Request","Petty Cash","Invoice Submission","IT Issue","Access Request"]},
  contacts: [
    ["Rahul Sharma","Sales","101","98000 00001","rahul@company.com"],
    ["Priya Nair","HR & Login","102","98000 00002","priya@company.com"],
    ["Suresh Kumar","Printer / Salary","103","98000 00003","suresh@company.com"]],
  holidays: [["26 Jan","Republic Day"],["15 Aug","Independence Day"],["2 Oct","Gandhi Jayanti"],["Oct/Nov","Diwali"],["25 Dec","Christmas"]],
  ask: [["Printer","Suresh"],["Salary query","Priya"],["Login / IT","Priya"]],
  org: [["Managing Director","—"],["Sales, Purchase, Production, Accounts","Report to MD"],["Store, Dispatch","Report to Production"],["HR & Admin","Report to MD"]],
  birthdays: [["Priya Nair","12 Oct","Birthday"],["Suresh Kumar","20 Oct","3-year anniversary"]],
  policies: {
    start:[["Leave","Entitlement, carry-forward, approval","Leave"],["Expense & Travel","Limits, bills, reimbursement","Expense Claim"],
      ["Salary Advance & Loan","Eligibility, recovery","Salary Advance"],["Hardware & IT","Laptop, access, usage","Asset / Laptop"],
      ["Appraisal & Rewards","Cycle, rating, rewards","—"]],
    later:[["Attendance & Timings","","—"],["Work from Home","","—"],["Vehicle & Fuel","","—"],["Conduct & Dress","","—"],["Data & Password","","—"]]},
  work: {
    "Sales":{flow:"Lead → Quotation → Order register",form:"New Lead",sheet:"Sales Pipeline",owner:"Sales head"},
    "Purchase":{flow:"Request → Approval → Vendor → GRN",form:"Purchase Request",sheet:"Purchase Register",owner:"Purchase head"},
    "Store":{flow:"Receipt → Issue → Monthly count",form:"Goods Received",sheet:"Stock Register",owner:"Store keeper"},
    "Production / Service":{flow:"Job card → Daily log → QC check",form:"Material Issue",sheet:"Production Log",owner:"Production head"},
    "Dispatch":{flow:"Packing list → Transporter → POD",form:"Courier",sheet:"Dispatch Log",owner:"Dispatch in-charge"},
    "Accounts":{flow:"Payment request → Approval → Paid",form:"Payment Request",sheet:"Payments Register",owner:"Accounts head"},
    "HR & Admin":{flow:"Leave, advance, courier, overtime",form:"Leave",sheet:"HR Register",owner:"HR"}},
  training: [
    ["Induction manual","First and biggest — who we are, how we work, who to ask."],
    ["Role guides","Sales exec · Store keeper · Accountant · Supervisor."],
    ["Tool how-tos","Filling a Form, reading a Sheet, finding a file."],
    ["Safety & compliance","Only if your industry needs it."]]
};
