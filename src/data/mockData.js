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
  checkNumber: '9901585',
  accountNumber: 'ACC-779545685',
  accountHolder: 'Baylor Scott and White Health',
  amount: 24.98,
  checkDate: '2025-12-03',
  returnReason: 'Overpayment by Secondary Payor',
  bankName: 'BANK OF AMERICA, N.A.',
  bankRouting: '021000021',
  address: {
    street: '2401 S. 31st St. MS-AR-M200',
    city: 'Temple',
    state: 'TX',
    zip: '76508'
  },
  confidence: {
    checkNumber: 0.95,
    accountHolder: 0.92,
    amount: 0.98,
    address: 0.88
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
  accountNumber: 'ACC-1121212',
  customerName: 'John Smith',
  emailAddress: 'john.smith@email.com',
  dateOfBirth: '8/14/1996',
  telephoneNumber: '+44 20 7123 4567',
  address: {
    street: 'Flat 2E,10 High Street',
    city: 'Oxford',
    state: 'OX',
    zip: 'OX1 1DE'
  },
  accountStatus: 'Active',
  lastPaymentDate: '2025-01-10',
  accountBalance: 1250.00
}

