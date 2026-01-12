# Humana - Returned Check Resolution

A frontend-only enterprise web application demo for healthcare insurance returned check resolution workflow.

## Overview

This application demonstrates an automated workflow for processing returned checks, from initial upload through validation, decision-making, and final resolution. The UI is designed with an enterprise-grade look and feel, optimized for demonstration purposes.

## Features

- **My Work Dashboard**: View and filter returned checks by status
- **PDF Upload**: Upload and preview returned check PDFs
- **Data Extraction**: Simulated extraction of check details, account information, and addresses
- **Validation & Matching**: Automated validation checks with visual indicators (Green/Amber/Red)
- **Resolution Decision**: Make final decisions with FCA reporting capability
- **Audit Trail**: Complete audit log for compliance tracking

## Technical Stack

- **React** 18.2.0
- **React Router DOM** 6.20.0
- **Vite** 5.0.8
- **CSS3** for styling

## Important Constraints

### Frontend-Only Demo
- All data is mock/simulated
- No backend, APIs, or database
- PDF upload is local only
- No mailbox integration
- No OCR or external extraction services
- Data extraction is simulated using static mappings

### UI Design Constraint
**Fixed Zoom Strategy**: The UI is designed and optimized **exclusively for 100% browser zoom**.

- All layouts, spacing, and font sizes are calibrated for 100% zoom
- Not designed to support zoom-in or zoom-out
- No responsive scaling for different zoom levels
- Manual adjustments ensure clean readability at default zoom

This constraint ensures a stable, predictable demo experience across environments.

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Main layout with navigation
│   └── Layout.css
├── pages/
│   ├── MyWork.jsx          # Dashboard with returned checks list
│   ├── UploadReturnedCheck.jsx  # PDF upload and preview
│   ├── CheckAnalysis.jsx   # Extracted data review and editing
│   ├── ResolutionDecision.jsx   # Validation and decision making
│   ├── ConfirmationAudit.jsx    # Resolution summary and audit trail
│   ├── Guidelines.jsx      # Process guidelines
│   └── DemoNotes.jsx       # Technical documentation
├── data/
│   └── mockData.js         # Mock data for demonstration
├── App.jsx                 # Main app component with routing
├── main.jsx               # Application entry point
└── index.css              # Global styles
```

## Workflow

1. **My Work**: View list of returned checks with status filtering
2. **Upload Returned Check**: Upload PDF and simulate extraction
3. **Check Analysis**: Review and edit extracted information
4. **Resolution Decision**: Validate data and make resolution decision
5. **Confirmation & Audit**: View resolution summary and audit trail

## Mock Data

Mock data is defined in `src/data/mockData.js` and includes:
- Sample returned checks
- Extracted check information
- Customer data from system
- Validation results

All data can be modified to demonstrate different scenarios.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Ensure browser zoom is set to 100% for optimal display.

## License

This is a demonstration application for internal use only.

