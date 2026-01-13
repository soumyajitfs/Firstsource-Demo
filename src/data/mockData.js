export const mockReturnedChecks = [
  {
    id: 'CHK001',
    checkNumber: '9901585',
    emailFrom: 'billing@bswhealth.org',
    accountHolder: 'Baylor Scott and White Health',
    amount: 24.98,
    returnReason: 'Overpayment by Secondary Payor',
    receivedDate: '2 hours ago',
    status: 'pending',
    pdfUrl: '/check-document.pdf' // PDF present
  },
  {
    id: 'CHK002',
    checkNumber: '1234567891',
    emailFrom: 'sarah.johnson@email.com',
    accountHolder: 'Sarah Johnson',
    amount: 850.50,
    returnReason: 'Account Closed',
    receivedDate: '1 day ago',
    status: 'extracted',
    pdfUrl: null // No PDF
  },
  {
    id: 'CHK003',
    checkNumber: '1234567892',
    emailFrom: 'michael.brown@email.com',
    accountHolder: 'Michael Brown',
    amount: 2100.00,
    returnReason: 'Stop Payment',
    receivedDate: '3 days ago',
    status: 'validated',
    pdfUrl: '/check-document.pdf' // PDF present
  },
  {
    id: 'CHK004',
    checkNumber: '1234567893',
    emailFrom: 'emily.davis@email.com',
    accountHolder: 'Emily Davis',
    amount: 450.75,
    returnReason: 'Insufficient Funds',
    receivedDate: '5 days ago',
    status: 'resolved',
    pdfUrl: null // No PDF
  },
  {
    id: 'CHK005',
    checkNumber: '1234567894',
    emailFrom: 'robert.wilson@email.com',
    accountHolder: 'Robert Wilson',
    amount: 3200.00,
    returnReason: 'Unauthorized Signature',
    receivedDate: '1 week ago',
    status: 'escalated',
    pdfUrl: '/check-document.pdf' // PDF present
  }
]

export const mockExtractedData = {
  claimNumber: '26337', // 5-digit claim number (truncated from Check/EFT Number in PDF)
  checkNumber: '9901585', // From Check No. in PDF remittance section
  nameAsPerLetter: 'BaylorScott & White HEALTH', // From document header
  givenAddress: 'PO BOX 844658, DALLAS, TX 752844658', // Payment Made To address
  dateOfService: '04/29/2025', // Date(s) of Service from PDF
  typeOfService: 'OUTPT HSP (Outpatient Hospital)', // Type of Service from PDF
  providerName: 'SCOTT & WHITE HOSPITAL - ROUND ROCK', // Payment Made To provider name from PDF
  patientAccountNumber: 'ACC-779545685', // Patient Account Number from PDF (using vendor number format)
  background: 'Outpatient Hospital Service - Medicare claim processed through NOVITAS SOLUTIONS (Medicare A). Service date: 04/29/2025. Billed charge: $325.00, Medicare approved: $122.89, Our payment: $24.98. Payment method: Automated Clearing House.',
  complaintDescription: 'Explanation of Benefits for OUTPT HSP (Outpatient Hospital) service. Claim processed with Medicare adjustments. Billed Amount: $325.00, Allowed Amount: $325.00, Co-Insurance: $24.21, Other Adjustments: $203.59 and $1.24, Benefit Amount: $94.85.',
  financialImpactOnBuyer: '$24.21', // Patient Responsibility/Co-Insurance from PDF (General Claim Adjustments shows Patient Responsibility: 24.21)
  confidence: {
    claimNumber: 0.98,
    checkNumber: 0.98,
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

export const mockValidationResults = {
  accountExists: { status: 'pass', message: 'Account found in system' },
  accountMatch: { status: 'pass', message: 'Account holder name matches' },
  addressMatch: { status: 'warning', message: 'Address partially matches' },
  checkAmountValid: { status: 'pass', message: 'Check amount is valid' },
  returnReasonValid: { status: 'pass', message: 'Return reason is recognized' },
  pastReturns: { status: 'warning', message: '2 previous returns in last 6 months' },
  accountStatus: { status: 'pass', message: 'Account is active' }
}

export const mockCustomerData = {
  accountNumber: 'ACC-779545685', // From Patient Account Number/Vendor No. in PDF
  customerName: 'BaylorScott & White HEALTH', // From name as per letter in extracted data
  emailAddress: 'billing@bswhealth.org', // From email from in mockReturnedChecks
  dateOfBirth: 'N/A', // Not available in PDF
  telephoneNumber: '855-252-8782', // From NOVITAS SOLUTIONS phone in PDF
  address: {
    street: 'PO BOX 844658',
    addressLine2: '',
    city: 'DALLAS',
    state: 'TX',
    zip: '752844658'
  },
  accountStatus: 'Active',
  lastPaymentDate: '10-06-2025', // From Payment Date in PDF
  accountBalance: 24.98 // From Our Payment amount in PDF
}

