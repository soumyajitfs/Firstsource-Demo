export const checkDocumentHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Returned Check Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      background: white;
      padding: 20px;
      color: #000;
    }
    .document {
      max-width: 8.5in;
      margin: 0 auto;
      background: white;
    }
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #000;
    }
    .company-info {
      flex: 1;
    }
    .company-name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .address {
      font-size: 12px;
      line-height: 1.4;
    }
    .check-info {
      text-align: right;
      font-size: 12px;
    }
    .check-info div {
      margin-bottom: 5px;
    }
    .remittance-section {
      margin-bottom: 30px;
      padding: 15px;
      border: 1px solid #ccc;
    }
    .remittance-title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      margin-bottom: 15px;
    }
    table th, table td {
      border: 1px solid #000;
      padding: 5px;
      text-align: left;
    }
    table th {
      background-color: #f0f0f0;
      font-weight: bold;
    }
    .check-section {
      border: 2px solid #000;
      padding: 20px;
      position: relative;
      margin-top: 30px;
    }
    .void-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 72px;
      color: rgba(255, 0, 0, 0.3);
      font-weight: bold;
      pointer-events: none;
      z-index: 1;
    }
    .check-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    .bank-info {
      text-align: right;
      font-size: 14px;
      font-weight: bold;
    }
    .check-date-box, .check-number-box {
      border: 1px solid #000;
      padding: 5px 10px;
      margin-top: 10px;
      display: inline-block;
      font-size: 11px;
    }
    .payee-line {
      margin: 20px 0;
      font-size: 14px;
    }
    .amount-box {
      border: 1px solid #000;
      padding: 10px;
      text-align: right;
      font-size: 16px;
      font-weight: bold;
      margin: 20px 0;
      width: 200px;
      margin-left: auto;
    }
    .signature-line {
      margin-top: 60px;
      border-top: 1px solid #000;
      padding-top: 5px;
      font-size: 11px;
    }
    .non-negotiable {
      position: absolute;
      bottom: 10px;
      right: 10px;
      font-size: 24px;
      font-weight: bold;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="document">
    <!-- Remittance Advice Section -->
    <div class="remittance-section">
      <div class="header">
        <div class="company-info">
          <div class="company-name">Baylor Scott and White Health</div>
          <div class="address">3500 Gaston Avenue - Dallas, TX 75246</div>
        </div>
        <div class="check-info">
          <div>Check No.: 9901585</div>
          <div>Check Date: 12/3/25</div>
          <div>Vendor No. 779545685</div>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Invoice#</th>
            <th>Date</th>
            <th>Gross</th>
            <th>Discount</th>
            <th>Net Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              5130-BSW HOSPITAL-ROUND ROCK<br>
              ADM DATE: 05232025<br>
              DSC DATE: 05232025<br>
              COMMENTS: 528560888
            </td>
            <td>12/02/25</td>
            <td>24.98</td>
            <td>0.00</td>
            <td>24.98</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><strong>TOTALS:</strong></td>
            <td></td>
            <td><strong>24.98</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>24.98</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Check Section -->
    <div class="check-section">
      <div class="void-overlay">VOID</div>
      
      <div class="check-header">
        <div class="company-info">
          <div class="company-name">BaylorScott & White HEALTH</div>
          <div class="address">2401 S. 31st St. MS-AR-M200<br>Temple, TX 76508</div>
        </div>
        <div class="bank-info">
          BANK OF AMERICA, N.A.<br>
          <div class="check-date-box">Check Date: 12/03/2025</div><br>
          <div class="check-number-box">Check No.: 9901585</div>
        </div>
      </div>

      <div class="payee-line">
        PAY Twenty Four and 98/100 Dollars<br>
        PAY TO THE ORDER OF<br>
        <div style="border-bottom: 1px solid #000; min-height: 30px; margin-top: 10px;"></div>
      </div>

      <div class="amount-box">
        $*****24.98
      </div>

      <div class="signature-line">
        Authorized Signatures
      </div>

      <div class="non-negotiable">NON-NEGOTIABLE</div>
    </div>
  </div>
</body>
</html>`

