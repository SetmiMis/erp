# Setmi India Intranet: text for each Google Sites page

Paste each block into the page as shown. Items marked **[EMBED]** are Insert → Embed → By URL. Items marked **[BUTTON]** are Insert → Button with the link. Replace `<EXEC>` with your Apps Script web app `/exec` URL.

Site settings: title "Setmi India Intranet", theme colour `#005a84`, accent `#e96651`, logo `https://setmiindia.com/wp-content/uploads/2026/06/cropped-ChatGPT-Image-Jun-5-2026-01_07_56-PM-192x192.png`.
Navigation (in this order, nothing else): Home, My Systems, Forms, People, Policies, How We Work, Training.

---

## 1. Home

**Title:** Setmi India Intranet
**Subtitle:** One front door for every system. Internal use only.

**Notice banner** (Insert → Text box, coloured background)
> Notice: This month's announcement goes here. Edit this line each month and remove old ones.

**Quick buttons** [BUTTON] (6, in this order)
| Label | Link |
|---|---|
| Order Entry | https://forms.gle/84Hf2tZ8k2rDFkf17 |
| Employee Leave | https://docs.google.com/forms/d/1PlJZbeg5iavN4-EjVifRWylai_sXTcQL-z90w5f7u3Y/viewform |
| Goods Dispatch | https://docs.google.com/forms/d/1BlPhBuBrlgdCcC65qKqpo5BhE1EwstC3R5EAoKN-I5c/viewform |
| Stock Inward | link to Forms page |
| Customer Help Ticket | https://docs.google.com/forms/d/1SsNvyicT5DwzCiaZjMH0rnrRcmCo85kH5pjHylWnEg4/viewform |
| Contacts | link to People page |

**Rotating notices** (Insert → Carousel, or four small text boxes)
- Employee of the month
- Openings
- New form launched
- Audit week

**About us**
> Setmi India has supplied connectors, cables and RF components since 1983 from Old Lajpat Rai Market, Chandni Chowk, Delhi. This site is where every internal system, form and policy is kept. If you cannot find something here, ask MIS.

---

## 2. My Systems

**Subtitle:** Your own systems and your role in each. Shown by the email you signed in with.

[EMBED] `<EXEC>`   (height about 600 px)

**Below the embed (small text):**
> Not seeing a system you use? Ask MIS to add your email to the Members tab of the Systems Register. All systems are listed in the Systems Register: https://docs.google.com/spreadsheets/d/1b7E2sIBMa6nd3ix7ISfE1oyv1ZwpjCYRMTTcFSzx96I/edit

---

## 3. Forms

**Subtitle:** Every live form in one place. If a form is not here, it is not in use.

[EMBED] `<EXEC>?page=forms`   (height about 700 px)

Groups shown: HR, Admin, Purchase & Store, Sales & Service, Accounts & IT. The list comes from the Forms tab of the Systems Register, so add a row there instead of editing this page.

---

## 4. People

**Subtitle:** Contacts, holidays, who to ask, who reports to whom, and birthdays.

[EMBED] `<EXEC>?page=people`   (height about 600 px)

Tabs shown: Contacts, Holidays, Who to ask, Org chart, Birthdays. Source: People Sheet
https://docs.google.com/spreadsheets/d/15uMbv81_72e2K5HUsmpta2DJ8PVtVsavEsDN13LZirI/edit

---

## 5. Policies

**Subtitle:** Each policy ends with the form you need, so the rule and the form stay together.

**Start with five** (one heading, one line, one button each; embed the Google Doc below the line when the Doc is ready)

1. **Leave**: How leave is earned, approved and recorded. [BUTTON: Employee Leave Request Form]
2. **Expense & Travel**: What can be claimed, the limits and the bills needed. [BUTTON: form to be added]
3. **Salary Advance & Loan**: Who is eligible and how it is recovered. [BUTTON: form to be added]
4. **Hardware & IT**: Using laptops, logins and company data. [BUTTON: Customer Help Ticket Form or IT form]
5. **Appraisal & Rewards**: How the yearly review and rewards work.

**Add when needed** (collapsible section)
Attendance & Timings · Work from Home · Vehicle & Fuel · Conduct & Dress · Data & Password

> Each policy page needs its owner to write the actual rule. Until then, leave the heading and the button and add the Doc later.

---

## 6. How We Work

**Subtitle:** One section per department. Every section has the same four lines: steps, the form, the sheet, the owner.

Use Insert → Collapsible group, one group per department.

### Sales
- **Steps:** Enquiry → Quotation → Order entry → Order register
- **Form:** Sales Entry Form, Customer Enquiry Form
- **Sheet:** E2O FMS (Enquiry to Order)
- **Owner:** CRM

### Purchase
- **Steps:** Request → Approval → Vendor → Purchase order → Goods received
- **Form:** Purchase Order (FMS), Vendor Purchase Order (FMS), New Vendors List
- **Sheet / app:** Setmi Purchase FMS (https://setmi-purchase-fms.vercel.app)
- **Owner:** to be confirmed

### Store
- **Steps:** Stock inward → Stock movement → Daily closing → Monthly count
- **Form:** Stock Inward (Shop / Mall Road / Swaroop Nagar), Stock Movement Form, Daily Stock Closing Report, Inventory List
- **Sheet / app:** IMS (Main, Mall Road, Swaroop Nagar)
- **Owner:** to be confirmed

### Production / Service
- **Steps:** Job card → Daily log → QC check
- **Form:** to be added
- **Sheet / app:** ERP Manufacturing (https://erp-manufacturing-frontend.vercel.app)
- **Owner:** to be confirmed

### Dispatch
- **Steps:** Order entry → Packing → Dispatch entry → Transporter → Proof of delivery
- **Form:** Order Entry Form (CRM to Dispatch), Goods Dispatch Form, Setmi India Dispatch Entry Form
- **Sheet:** Order to Dispatch FMS
- **Owner:** CRM

### Accounts
- **Steps:** Payment request → Approval → Paid
- **Form:** to be added
- **Sheet:** to be added
- **Owner:** Accounts

### HR & Admin
- **Steps:** Leave, advance, courier, overtime, daily tasks
- **Form:** Employee Leave Request Form, Daily Task Form, Setmi EA Task Assignment Form
- **Sheet / app:** Staff Attendance (https://staff-attendance-ten.vercel.app), SETMI Checklist
- **Owner:** to be confirmed

**Footer line:** Same layout every time: the steps, the form, the sheet, the owner.

---

## 7. Training

**Subtitle:** Your first week, self-serve.

1. **Induction manual**: First and biggest. Who we are, how we work, who to ask. [Embed Google Doc]
2. **Role guides**: One short guide each for Sales executive, Store keeper, Accountant and Supervisor.
3. **Tool how-tos**: How to fill a Form, read a Sheet and find a file. Add 2-minute screen recordings later.
4. **Safety & compliance**: Add only if your work needs it (for example warehouse handling).

> Week 1 plan to show on the page: Day 1 read the Induction manual. Day 2-3 your Role guide. Day 4-5 try one form and one sheet with your supervisor.

---

## After pasting
- Check each embed opens when you are signed in with your company account.
- Publish with Share → "Only people in setmiindia" so the site stays internal.
