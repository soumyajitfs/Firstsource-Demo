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
  checkDate: '12/03/2025', // Check Date from document (Stop Payment flow CHK001)
  nameAsPerLetter: 'BaylorScott & White HEALTH', // From document header
  givenAddress: '2401 N Stemmons Fwy, Suite 200, DALLAS, TX 75207', // Payment Made To address
  dateOfService: '04/29/2025', // Date(s) of Service from PDF
  typeOfService: 'OUTPT HSP (Outpatient Hospital)', // Type of Service from PDF
  providerName: 'Baylor Scott & WHITE Health', // Payment Made To provider name from PDF
  patientAccountNumber: 'ACC-779545685', // Patient Account Number from PDF (using vendor number format)
  background: 'Outpatient Hospital Service - Medicare claim processed through NOVITAS SOLUTIONS (Medicare A). Service date: 04/29/2025. Billed charge: $325.00, Medicare approved: $122.89, Our payment: $24.98. Payment method: Automated Clearing House.',
  complaintDescription: 'Explanation of Benefits for OUTPT HSP (Outpatient Hospital) service. Claim processed with Medicare adjustments. Billed Amount: $325.00, Allowed Amount: $325.00, Co-Insurance: $24.98, Other Adjustments: $203.59 and Benefit Amount: $94.85.',
  financialImpactOnBuyer: '$24.98', // Patient Responsibility/Co-Insurance from PDF (updated for Stop Payment flow)
  // Additional fields for Stop Payment flow
  patientName: 'John Michael Smith', // Random patient name
  providerNumber: 'PRV-26337', // Provider Number
  providerAddress: '2401 N Stemmons Fwy, Suite 200, DALLAS, TX 75207', // Provider Address
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
  // Additional fields for Stop Payment flow
  patientName: 'John Smith', // Patient name for CHK002
  providerNumber: 'PRV-VH-2024-789', // Provider Number
  providerAddress: '2401 N Stemmons Fwy, Suite 200, DALLAS, TX 75207', // Provider Address
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

// ==========================================
// CASH POSTING FLOW - 5 PDFs (CHK001-CHK005)
// ==========================================

// Separate returned checks list for Cash Posting flow (5 new PDFs)
export const mockReturnedChecksCashPosting = [
  {
    id: 'CHK001',
    checkNumber: '21210',
    emailFrom: 'billing@brandondentalcare.com',
    accountHolder: 'Brandon Complete Dental Care',
    amount: 385.00,
    returnReason: 'Overpayment - Dental Services',
    receivedDate: '2024-03-28',
    status: 'completed',
    pdfUrl: '/Brandon Complete Dental Care.pdf'
  },
  {
    id: 'CHK002',
    checkNumber: '45566509',
    emailFrom: 'claims@carenow.com',
    accountHolder: 'CareNow Greenwood Village',
    amount: 3.24,
    returnReason: 'Overpayment - Urgent Care Visit',
    receivedDate: '2024-03-28',
    status: 'completed',
    pdfUrl: '/Carenow Greenwood Village.pdf'
  },
  {
    id: 'CHK003',
    checkNumber: '24212',
    emailFrom: 'billing@emergencyambulance.com',
    accountHolder: 'Emergency Ambulance Service Inc',
    amount: 489.48,
    returnReason: 'Overpayment - Ambulance Transport',
    receivedDate: '2024-03-22',
    status: 'new',
    pdfUrl: '/Emergency Ambulance Service Inc.pdf'
  },
  {
    id: 'CHK004',
    checkNumber: '10603004019',
    emailFrom: 'billing@houstoncardio.com',
    accountHolder: 'Houston Cardiovascular Institute',
    amount: 25.42,
    returnReason: 'Overpayment - Cardiovascular Services',
    receivedDate: '2026-01-27',
    status: 'new',
    pdfUrl: '/Houston Cardiovascular Institute.pdf'
  },
  {
    id: 'CHK005',
    checkNumber: '31418',
    emailFrom: 'billing@sightlineophthalmic.com',
    accountHolder: 'Sightline Ophthalmic Associates',
    amount: 13.98,
    returnReason: 'Overpayment - Ophthalmology Services',
    receivedDate: '2026-01-26',
    status: 'completed',
    pdfUrl: '/Sightline Ophthalmic Associates.pdf'
  }
]

// CHK001 - Brandon Complete Dental Care (Check #21210, $385.00) - Cash Posting
export const mockExtractedDataCashPostingCHK001 = {
  claimNumber: '820240310045782', // Claim number from PDF
  checkNumber: '21210', // Check Number from lockbox
  checkDate: '04/08/2024', // Deposit Date from lockbox
  nameAsPerLetter: 'Brandon Complete Dental Care', // Provider name from document
  givenAddress: '724 Lithia Pinecrest Rd, Brandon, FL 33511', // Provider address from PDF
  dateOfService: '03/15/2024', // Date of dental service
  typeOfService: 'Dental - Comprehensive Oral Evaluation & Crown', // Type of dental service
  providerName: 'Brandon Complete Dental Care', // Provider name
  patientAccountNumber: 'ACC-100930260', // From Check Account Number in lockbox
  background: 'Dental services claim - Comprehensive oral evaluation and porcelain crown procedure. Check #21210 received via Humana Lockbox 931655 (ATL). Deposit date: 04/08/2024. Batch: 822, Sequence: 4. Check RTN: 063108680. Check Amount: $385.00. Transaction Type: Regular.',
  complaintDescription: 'Dental claim for comprehensive oral evaluation (D0150) and crown restoration - porcelain/ceramic (D2740). Total billed charges: $650.00, Allowed amount: $520.00, Insurance paid: $385.00, Patient co-insurance: $135.00. Processed through Humana dental plan.',
  financialImpactOnBuyer: '$385.00', // Check Amount / Financial impact
  // Cash Posting specific fields
  payableTo: 'Brandon Complete Dental Care', // Payable to
  overPaymentCharge: '$385.00', // Over Payment Charge
  checkAmount: '$385.00', // Check Amount from lockbox
  recoverNumber: 'REC-21210', // Recovery Number
  recoveryAmount: '$385.00', // Recovery Amount
  // GAS (CAS) data for comparison - MATCH scenario
  gasRecoveryAmount: '$385.00', // Recovery Amount from GAS (matches check amount)
  gasRecoveryNumber: 'REC-21210', // Recovery Number from GAS
  gasCheckNumber: '21210', // Check Number from GAS (matches)
  gasClaimNumber: '820240310045782', // Claim Number from GAS (matches)
  confidence: {
    claimNumber: 0.96,
    checkNumber: 0.99,
    checkDate: 0.98,
    nameAsPerLetter: 0.97,
    givenAddress: 0.93,
    dateOfService: 0.95,
    typeOfService: 0.94,
    providerName: 0.97,
    patientAccountNumber: 0.92,
    background: 0.90,
    complaintDescription: 0.91,
    financialImpactOnBuyer: 0.99
  }
}

// CHK002 - CareNow Greenwood Village (Check #45566509, $3.24) - Cash Posting
export const mockExtractedDataCashPostingCHK002 = {
  claimNumber: '820223221607371', // Claim number from PDF
  checkNumber: '45566509', // Check Number from lockbox
  checkDate: '04/08/2024', // Deposit Date from lockbox
  nameAsPerLetter: 'CareNow Greenwood Village', // Provider name from document
  givenAddress: '2000 Healthpark Drive, Brentwood, TN 37027', // Provider address from PDF
  dateOfService: '03/20/2024', // Date of urgent care visit
  typeOfService: 'Urgent Care - Office Visit (Level 3)', // Type of service
  providerName: 'CareNow Greenwood Village', // Provider name
  patientAccountNumber: 'ACC-7163942209', // From Check Account Number in lockbox
  background: 'Urgent care office visit claim. Check #45566509 received via Humana Lockbox 931655 (ATL). Deposit date: 04/08/2024. Batch: 822, Sequence: 6. Check RTN: 072413298. Check Amount: $3.24. Transaction Type: Regular.',
  complaintDescription: 'Urgent care claim for established patient office visit (CPT 99213 - Level 3). Billed charges: $175.00, Allowed amount: $125.00, Insurance paid: $121.76, Patient co-pay balance: $3.24. Processed through Humana medical plan.',
  financialImpactOnBuyer: '$3.24', // Check Amount / Financial impact
  // Cash Posting specific fields
  payableTo: 'CareNow Greenwood Village', // Payable to
  overPaymentCharge: '$3.24', // Over Payment Charge
  checkAmount: '$3.24', // Check Amount from lockbox
  recoverNumber: 'REC-45566509', // Recovery Number
  recoveryAmount: '$3.24', // Recovery Amount
  // GAS (CAS) data for comparison - MATCH scenario
  gasRecoveryAmount: '$3.24', // Recovery Amount from GAS (matches)
  gasRecoveryNumber: 'REC-45566509', // Recovery Number from GAS
  gasCheckNumber: '45566509', // Check Number from GAS (matches)
  gasClaimNumber: '820223221607371', // Claim Number from GAS (matches)
  confidence: {
    claimNumber: 0.95,
    checkNumber: 0.99,
    checkDate: 0.98,
    nameAsPerLetter: 0.96,
    givenAddress: 0.91,
    dateOfService: 0.94,
    typeOfService: 0.93,
    providerName: 0.96,
    patientAccountNumber: 0.91,
    background: 0.89,
    complaintDescription: 0.90,
    financialImpactOnBuyer: 0.99
  }
}

// CHK003 - Emergency Ambulance Service Inc (Check #24212, $489.48) - Cash Posting
export const mockExtractedDataCashPostingCHK003 = {
  claimNumber: '820240700067296', // Claim number from PDF
  checkNumber: '24212', // Check Number from lockbox
  checkDate: '04/11/2024', // Deposit Date from lockbox
  nameAsPerLetter: 'Emergency Ambulance Service Inc', // Provider name from document
  givenAddress: '3200 E. Birch St, #A, Brea, CA 92821', // Provider address from PDF
  dateOfService: '03/28/2024', // Date of ambulance transport
  typeOfService: 'Emergency Ambulance Transport - BLS (Basic Life Support)', // Type of service
  providerName: 'Emergency Ambulance Service Inc', // Provider name
  patientAccountNumber: 'ACC-94100976', // From Check Account Number in lockbox
  background: 'Emergency ambulance transport claim - Basic Life Support (BLS). Check #24212 received via Humana Lockbox 931655 (ATL). Deposit date: 04/11/2024. Batch: 825, Sequence: 3. Check RTN: 122238200. Check Amount: $489.48. Transaction Type: Regular.',
  complaintDescription: 'Emergency ambulance service claim for BLS emergency transport (HCPCS A0427) and mileage (A0425). Billed charges: $1,200.00, Allowed amount: $850.00, Insurance paid: $489.48, Patient responsibility: $360.52. Includes base rate and per-mile charges.',
  financialImpactOnBuyer: '$489.48', // Check Amount / Financial impact
  // Cash Posting specific fields
  payableTo: 'Emergency Ambulance Service Inc', // Payable to
  overPaymentCharge: '$489.48', // Over Payment Charge
  checkAmount: '$489.48', // Check Amount from lockbox
  recoverNumber: 'REC-24212', // Recovery Number
  recoveryAmount: '$489.48', // Recovery Amount
  // GAS (CAS) data for comparison - MISMATCH scenario (to show different amounts)
  gasRecoveryAmount: '$525.00', // Recovery Amount from GAS (MISMATCH - different from check amount)
  gasRecoveryNumber: 'REC-24212', // Recovery Number from GAS
  gasCheckNumber: '24212', // Check Number from GAS (matches)
  gasClaimNumber: 'CLM-240411-099', // Claim Number from GAS (MISMATCH)
  confidence: {
    claimNumber: 0.94,
    checkNumber: 0.99,
    checkDate: 0.97,
    nameAsPerLetter: 0.96,
    givenAddress: 0.90,
    dateOfService: 0.93,
    typeOfService: 0.92,
    providerName: 0.96,
    patientAccountNumber: 0.90,
    background: 0.88,
    complaintDescription: 0.89,
    financialImpactOnBuyer: 0.99
  }
}

// CHK004 - Houston Cardiovascular Institute (Check #10603004019, $25.42) - Cash Posting
export const mockExtractedDataCashPostingCHK004 = {
  claimNumber: '820253250308893', // Claim number from PDF
  checkNumber: '10603004019', // Check Number from lockbox
  checkDate: '02/02/2026', // Deposit Date from lockbox
  nameAsPerLetter: 'Houston Cardiovascular Institute', // Provider name from document
  givenAddress: '6051 Garth Rd, Ste 300, Baytown, TX 77521', // Provider address from PDF
  dateOfService: '01/15/2026', // Date of cardiovascular service
  typeOfService: 'Cardiovascular - Echocardiogram (Transthoracic)', // Type of service
  providerName: 'Houston Cardiovascular Institute', // Provider name
  patientAccountNumber: 'ACC-829169728', // From Check Account Number in lockbox
  background: 'Cardiovascular diagnostic services claim - Transthoracic echocardiogram. Check #10603004019 received via Humana Lockbox 931655 (ATL). Deposit date: 02/02/2026. Batch: 3767, Sequence: 19. Check RTN: 111000614. Check Amount: $25.42. Transaction Type: Regular.',
  complaintDescription: 'Cardiovascular diagnostic claim for transthoracic echocardiogram (CPT 93306) with Doppler and color flow. Billed charges: $450.00, Allowed amount: $325.00, Insurance paid: $299.58, Patient co-insurance: $25.42. Processed through Humana medical plan.',
  financialImpactOnBuyer: '$25.42', // Check Amount / Financial impact
  // Cash Posting specific fields
  payableTo: 'Houston Cardiovascular Institute', // Payable to
  overPaymentCharge: '$25.42', // Over Payment Charge
  checkAmount: '$25.42', // Check Amount from lockbox
  recoverNumber: 'REC-10603004019', // Recovery Number
  recoveryAmount: '$25.42', // Recovery Amount
  // GAS (CAS) data for comparison - MISMATCH scenario
  gasRecoveryAmount: '$32.75', // Recovery Amount from GAS (MISMATCH - different from check amount)
  gasRecoveryNumber: 'REC-10603004019', // Recovery Number from GAS
  gasCheckNumber: '10603004019', // Check Number from GAS (matches)
  gasClaimNumber: 'CLM-260202-088', // Claim Number from GAS (MISMATCH)
  confidence: {
    claimNumber: 0.97,
    checkNumber: 0.99,
    checkDate: 0.98,
    nameAsPerLetter: 0.96,
    givenAddress: 0.92,
    dateOfService: 0.96,
    typeOfService: 0.95,
    providerName: 0.97,
    patientAccountNumber: 0.93,
    background: 0.91,
    complaintDescription: 0.92,
    financialImpactOnBuyer: 0.99
  }
}

// CHK005 - Sightline Ophthalmic Associates (Check #31418, $13.98) - Cash Posting
export const mockExtractedDataCashPostingCHK005 = {
  claimNumber: '820253512511202', // Claim number from PPI Overpayment Chart in PDF
  checkNumber: '31418', // Check Number from lockbox
  checkDate: '02/02/2026', // Deposit Date from lockbox
  nameAsPerLetter: 'Sightline Ophthalmic Associates', // Provider name from document
  givenAddress: '2100 Corporate Dr, Suite 400, Wexford, PA 15090', // Provider address from PDF
  dateOfService: '01/22/2026', // Date of ophthalmology service
  typeOfService: 'Ophthalmology - Comprehensive Eye Examination', // Type of service
  providerName: 'Sightline Ophthalmic Associates', // Provider name
  patientAccountNumber: 'ACC-1064478219', // From Check Account Number in lockbox
  background: 'Ophthalmology services claim - Comprehensive eye examination. Check #31418 received via Humana Lockbox 931655 (ATL). Deposit date: 02/02/2026. Batch: 3756, Sequence: 10. Check RTN: 043000096. Check Amount: $13.98. Transaction Type: Regular.',
  complaintDescription: 'Ophthalmology claim for comprehensive eye examination - new patient (CPT 92004). Billed charges: $250.00, Allowed amount: $175.00, Insurance paid: $161.02, Patient co-pay: $13.98. Includes refraction and dilation. Processed through Humana vision plan.',
  financialImpactOnBuyer: '$13.98', // Check Amount / Financial impact
  // Cash Posting specific fields
  payableTo: 'Sightline Ophthalmic Associates', // Payable to
  overPaymentCharge: '$13.98', // Over Payment Charge
  checkAmount: '$13.98', // Check Amount from lockbox
  recoverNumber: 'REC-31418', // Recovery Number
  recoveryAmount: '$13.98', // Recovery Amount
  // GAS (CAS) data for comparison - MATCH scenario
  gasRecoveryAmount: '$13.98', // Recovery Amount from GAS (matches check amount)
  gasRecoveryNumber: 'REC-31418', // Recovery Number from GAS
  gasCheckNumber: '31418', // Check Number from GAS (matches)
  gasClaimNumber: '820253512511202', // Claim Number from GAS (matches)
  confidence: {
    claimNumber: 0.93,
    checkNumber: 0.99,
    checkDate: 0.97,
    nameAsPerLetter: 0.95,
    givenAddress: 0.89,
    dateOfService: 0.94,
    typeOfService: 0.93,
    providerName: 0.95,
    patientAccountNumber: 0.91,
    background: 0.87,
    complaintDescription: 0.88,
    financialImpactOnBuyer: 0.99
  }
}

// Lookup map for Cash Posting extracted data by check ID
export const cashPostingExtractedDataMap = {
  'CHK001': mockExtractedDataCashPostingCHK001,
  'CHK002': mockExtractedDataCashPostingCHK002,
  'CHK003': mockExtractedDataCashPostingCHK003,
  'CHK004': mockExtractedDataCashPostingCHK004,
  'CHK005': mockExtractedDataCashPostingCHK005,
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

