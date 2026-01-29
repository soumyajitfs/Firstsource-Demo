export const mockReturnedChecks = [
  {
    id: 'CHK001',
    checkNumber: '9901585',
    emailFrom: 'billing@bswhealth.org',
    accountHolder: 'Baylor Scott and White Health',
    amount: 24.98,
    returnReason: 'Overpayment by Secondary Payor',
    receivedDate: '2024-12-15', // Date in YYYY-MM-DD format for easy formatting
    status: 'inProgress',
    pdfUrl: '/returned-check.pdf' // First PDF
  },
  {
    id: 'CHK002',
    checkNumber: '1234567891',
    emailFrom: 'claims@healthcareprovider.com',
    accountHolder: 'Auto Finance Solutions LLC',
    amount: 1250.00,
    returnReason: 'Account Closed',
    receivedDate: '2024-12-14', // Date in YYYY-MM-DD format for easy formatting
    status: 'received',
    pdfUrl: '/2nd.pdf' // Second PDF - Vehicle related
  }
]

// Extracted data for CHK001 (Healthcare - Baylor Scott and White Health) - Return Check flow
export const mockExtractedData = {
  claimNumber: '26337', // 5-digit claim number (truncated from Check/EFT Number in PDF)
  checkNumber: '9901585', // From Check No. in PDF remittance section
  checkDate: '12/03/2025', // Check Date from document (Return Check flow CHK001)
  nameAsPerLetter: 'BaylorScott & White HEALTH', // From document header
  givenAddress: '2401 N Stemmons Fwy, Suite 200, DALLAS, TX 75207', // Payment Made To address
  dateOfService: '04/29/2025', // Date(s) of Service from PDF
  typeOfService: 'OUTPT HSP (Outpatient Hospital)', // Type of Service from PDF
  providerName: 'Baylor Scott & WHITE Health', // Payment Made To provider name from PDF
  patientAccountNumber: 'ACC-779545685', // Patient Account Number from PDF (using vendor number format)
  background: 'Outpatient Hospital Service - Medicare claim processed through NOVITAS SOLUTIONS (Medicare A). Service date: 04/29/2025. Billed charge: $325.00, Medicare approved: $122.89, Our payment: $24.98. Payment method: Automated Clearing House.',
  complaintDescription: 'Explanation of Benefits for OUTPT HSP (Outpatient Hospital) service. Claim processed with Medicare adjustments. Billed Amount: $325.00, Allowed Amount: $325.00, Co-Insurance: $24.21, Other Adjustments: $203.59 and Benefit Amount: $94.85.',
  financialImpactOnBuyer: '$24.21', // Patient Responsibility/Co-Insurance from PDF (General Claim Adjustments shows Patient Responsibility: 24.21)
  confidence: {
    claimNumber: 0.98,
    checkNumber: 0.98,
    checkDate: 0.97,
    nameAsPerLetter: 0.95,
    givenAddress: 0.92,
    dateOfService: 0.98,
    typeOfService: 0.95,
    providerName: 0.95,
    patientAccountNumber: 0.90,
    background: 0.88,
    complaintDescription: 0.90,
    financialImpactOnBuyer: 0.98
  }
}

// Extracted data for CHK002 (Vehicle - Auto Finance Solutions LLC) - Return Check flow
export const mockExtractedDataCHK002 = {
  claimNumber: 'VH-2024-789', // Vehicle claim number
  checkNumber: '1234567891', // From Check No. in PDF
  checkDate: '11/28/2025', // Check Date from document (Return Check flow CHK002)
  nameAsPerLetter: 'Auto Finance Solutions LLC', // From document header
  givenAddress: '2401 N Stemmons Fwy, Suite 200, DALLAS, TX 75207', // Payment address
  dateOfService: '03/15/2024', // Service/Purchase Date
  typeOfService: 'Vehicle Finance Payment', // Type of Service
  providerName: 'Auto Finance Solutions LLC', // Provider/Dealer name
  patientAccountNumber: 'VIN-ABC123456789', // Vehicle Identification Number or Account Number
  background: 'Vehicle finance payment returned due to account closure. Original purchase date: 03/15/2024. Vehicle: 2023 Honda Accord. Finance amount: $25,000.00. Monthly payment: $450.00. Returned check amount: $1,250.00. Payment method: Check.',
  complaintDescription: 'Account was closed prior to check processing. Customer claims account should have remained open. Check number 1234567891 was returned unpaid. Account closure date: 02/28/2024. Customer disputes the account closure and claims proper notice was not received.',
  financialImpactOnBuyer: '$1,250.00', // Returned check amount
  confidence: {
    claimNumber: 0.95,
    checkNumber: 0.98,
    checkDate: 0.97,
    nameAsPerLetter: 0.97,
    givenAddress: 0.92,
    dateOfService: 0.96,
    typeOfService: 0.94,
    providerName: 0.97,
    patientAccountNumber: 0.93,
    background: 0.90,
    complaintDescription: 0.91,
    financialImpactOnBuyer: 0.98
  }
}

export const mockValidationResults = {
  accountExists: { status: 'pass', message: 'Account found in system' },
  accountMatch: { status: 'pass', message: 'Account holder name matches' },
  addressMatch: { status: 'warning', message: 'Address partially matches' },
  checkAmountValid: { status: 'pass', message: 'Check amount is valid' },
  returnReasonValid: { status: 'pass', message: 'Return reason is recognized' },
  pastReturns: { status: 'warning', message: '2 previous returns in last 6 months' },
  accountStatus: { status: 'pass', message: 'Account is active' }
}

// Extracted data for CHK001 (Healthcare - Baylor Scott and White Health) - Stop Payment flow
export const mockExtractedDataStopPaymentCHK001 = {
  claimNumber: '26337', // 5-digit claim number (truncated from Check/EFT Number in PDF)
  checkNumber: '9901585', // From Check No. in PDF remittance section
  checkDate: '12/10/2025', // Check Date from document (Stop Payment flow CHK001)
  nameAsPerLetter: 'BaylorScott & White HEALTH', // From document header
  givenAddress: '2401 N Stemmons Fwy, Suite 200, DALLAS, TX 75207', // Payment Made To address
  dateOfService: '04/29/2025', // Date(s) of Service from PDF
  typeOfService: 'OUTPT HSP (Outpatient Hospital)', // Type of Service from PDF
  providerName: 'Baylor Scott & WHITE Health', // Payment Made To provider name from PDF
  patientAccountNumber: 'ACC-779545685', // Patient Account Number from PDF (using vendor number format)
  background: 'Outpatient Hospital Service - Medicare claim processed through NOVITAS SOLUTIONS (Medicare A). Service date: 04/29/2025. Billed charge: $325.00, Medicare approved: $122.89, Our payment: $24.98. Payment method: Automated Clearing House.',
  complaintDescription: 'Explanation of Benefits for OUTPT HSP (Outpatient Hospital) service. Claim processed with Medicare adjustments. Billed Amount: $325.00, Allowed Amount: $325.00, Co-Insurance: $24.21, Other Adjustments: $203.59 and Benefit Amount: $94.85.',
  financialImpactOnBuyer: '$24.21', // Patient Responsibility/Co-Insurance from PDF (General Claim Adjustments shows Patient Responsibility: 24.21)
  confidence: {
    claimNumber: 0.98,
    checkNumber: 0.98,
    checkDate: 0.97,
    nameAsPerLetter: 0.95,
    givenAddress: 0.92,
    dateOfService: 0.98,
    typeOfService: 0.95,
    providerName: 0.95,
    patientAccountNumber: 0.90,
    background: 0.88,
    complaintDescription: 0.90,
    financialImpactOnBuyer: 0.98
  }
}

// Extracted data for CHK002 (Vehicle - Auto Finance Solutions LLC) - Stop Payment flow
export const mockExtractedDataStopPaymentCHK002 = {
  claimNumber: 'VH-2024-789', // Vehicle claim number
  checkNumber: '1234567891', // From Check No. in PDF
  checkDate: '11/20/2025', // Check Date from document (Stop Payment flow CHK002)
  nameAsPerLetter: 'Auto Finance Solutions LLC', // From document header
  givenAddress: '2401 N Stemmons Fwy, Suite 200, DALLAS, TX 75207', // Payment address
  dateOfService: '03/15/2024', // Service/Purchase Date
  typeOfService: 'Vehicle Finance Payment', // Type of Service
  providerName: 'Auto Finance Solutions LLC', // Provider/Dealer name
  patientAccountNumber: 'VIN-ABC123456789', // Vehicle Identification Number or Account Number
  background: 'Vehicle finance payment returned due to account closure. Original purchase date: 03/15/2024. Vehicle: 2023 Honda Accord. Finance amount: $25,000.00. Monthly payment: $450.00. Returned check amount: $1,250.00. Payment method: Check.',
  complaintDescription: 'Account was closed prior to check processing. Customer claims account should have remained open. Check number 1234567891 was returned unpaid. Account closure date: 02/28/2024. Customer disputes the account closure and claims proper notice was not received.',
  financialImpactOnBuyer: '$1,250.00', // Returned check amount
  confidence: {
    claimNumber: 0.95,
    checkNumber: 0.98,
    checkDate: 0.97,
    nameAsPerLetter: 0.97,
    givenAddress: 0.92,
    dateOfService: 0.96,
    typeOfService: 0.94,
    providerName: 0.97,
    patientAccountNumber: 0.93,
    background: 0.90,
    complaintDescription: 0.91,
    financialImpactOnBuyer: 0.98
  }
}

// Extracted data for CHK001 (Healthcare - Baylor Scott and White Health) - Cash Posting flow
export const mockExtractedDataCashPostingCHK001 = {
  claimNumber: '26337', // 5-digit claim number (truncated from Check/EFT Number in PDF)
  checkNumber: '9901585', // From Check No. in PDF remittance section
  checkDate: '12/15/2025', // Check Date from document (Cash Posting flow CHK001)
  nameAsPerLetter: 'BaylorScott & White HEALTH', // From document header
  givenAddress: '2401 N Stemmons Fwy, Suite 200, DALLAS, TX 75207', // Payment Made To address
  dateOfService: '04/29/2025', // Date(s) of Service from PDF
  typeOfService: 'OUTPT HSP (Outpatient Hospital)', // Type of Service from PDF
  providerName: 'Baylor Scott & WHITE Health', // Payment Made To provider name from PDF
  patientAccountNumber: 'ACC-779545685', // Patient Account Number from PDF (using vendor number format)
  background: 'Outpatient Hospital Service - Medicare claim processed through NOVITAS SOLUTIONS (Medicare A). Service date: 04/29/2025. Billed charge: $325.00, Medicare approved: $122.89, Our payment: $24.98. Payment method: Automated Clearing House.',
  complaintDescription: 'Explanation of Benefits for OUTPT HSP (Outpatient Hospital) service. Claim processed with Medicare adjustments. Billed Amount: $325.00, Allowed Amount: $325.00, Co-Insurance: $24.21, Other Adjustments: $203.59 and Benefit Amount: $94.85.',
  financialImpactOnBuyer: '$24.21', // Patient Responsibility/Co-Insurance from PDF (General Claim Adjustments shows Patient Responsibility: 24.21)
  // Cash Posting specific fields
  payableTo: 'BaylorScott & White HEALTH', // Payable to
  overPaymentCharge: '$15.50', // Over Payment Charge
  checkAmount: '$24.98', // Check Amount
  recoverNumber: 'REC-26337', // Recover Number
  recoveryAmount: '$24.98', // Recovery Amount
  confidence: {
    claimNumber: 0.98,
    checkNumber: 0.98,
    checkDate: 0.97,
    nameAsPerLetter: 0.95,
    givenAddress: 0.92,
    dateOfService: 0.98,
    typeOfService: 0.95,
    providerName: 0.95,
    patientAccountNumber: 0.90,
    background: 0.88,
    complaintDescription: 0.90,
    financialImpactOnBuyer: 0.98
  }
}

// Extracted data for CHK002 (Vehicle - Auto Finance Solutions LLC) - Cash Posting flow
export const mockExtractedDataCashPostingCHK002 = {
  claimNumber: 'VH-2024-789', // Vehicle claim number
  checkNumber: '1234567891', // From Check No. in PDF
  checkDate: '11/15/2025', // Check Date from document (Cash Posting flow CHK002)
  nameAsPerLetter: 'Auto Finance Solutions LLC', // From document header
  givenAddress: '2401 N Stemmons Fwy, Suite 200, DALLAS, TX 75207', // Payment address
  dateOfService: '03/15/2024', // Service/Purchase Date
  typeOfService: 'Vehicle Finance Payment', // Type of Service
  providerName: 'Auto Finance Solutions LLC', // Provider/Dealer name
  patientAccountNumber: 'VIN-ABC123456789', // Vehicle Identification Number or Account Number
  background: 'Vehicle finance payment returned due to account closure. Original purchase date: 03/15/2024. Vehicle: 2023 Honda Accord. Finance amount: $25,000.00. Monthly payment: $450.00. Returned check amount: $1,250.00. Payment method: Check.',
  complaintDescription: 'Account was closed prior to check processing. Customer claims account should have remained open. Check number 1234567891 was returned unpaid. Account closure date: 02/28/2024. Customer disputes the account closure and claims proper notice was not received.',
  financialImpactOnBuyer: '$1,250.00', // Returned check amount
  // Cash Posting specific fields
  payableTo: 'Auto Finance Solutions LLC', // Payable to
  overPaymentCharge: '$45.75', // Over Payment Charge
  checkAmount: '$1,250.00', // Check Amount
  recoverNumber: 'REC-VH-2024-789', // Recover Number
  recoveryAmount: '$1,250.00', // Recovery Amount
  confidence: {
    claimNumber: 0.95,
    checkNumber: 0.98,
    checkDate: 0.97,
    nameAsPerLetter: 0.97,
    givenAddress: 0.92,
    dateOfService: 0.96,
    typeOfService: 0.94,
    providerName: 0.97,
    patientAccountNumber: 0.93,
    background: 0.90,
    complaintDescription: 0.91,
    financialImpactOnBuyer: 0.98
  }
}

export const mockCustomerData = {
  accountNumber: 'ACC-779545685', // From Patient Account Number/Vendor No. in PDF
  customerName: 'BaylorScott & White HEALTH', // From name as per letter in extracted data
  emailAddress: 'billing@bswhealth.org', // From email from in mockReturnedChecks
  dateOfBirth: '01/15/1985', // Date of Birth
  telephoneNumber: '855-252-8782', // From NOVITAS SOLUTIONS phone in PDF
  address: {
    street: '2401 N Stemmons Fwy',
    addressLine2: 'Suite 200',
    city: 'DALLAS',
    state: 'TX',
    zip: '75207'
  },
  accountStatus: 'Active',
  lastPaymentDate: '10-06-2025', // From Payment Date in PDF
  accountBalance: 24.98 // From Our Payment amount in PDF
}

