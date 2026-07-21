/**
 * Shared document CSS — injected as a <style> block into the hidden iframe.
 * Controls @page size, font, table layout, and print-color-adjust.
 */
export const DOCUMENT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&family=Open+Sans:wght@300;400;650;700&display=swap');

  @page {
    size: A4 portrait;
    margin: 12mm 14mm;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 9pt;
    font-weight: 300;
    color: #111;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .document {
    width: 100%;
  }

  /* ── Header ── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6pt;
  }

  .header-left {
    text-align: left;
  }

  .header-right img {
    height: 90pt;
    width: auto;
    display: block;
  }

  .doc-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 24pt;
    font-weight: 700;
    color: #7A0000;
    letter-spacing: 0.5pt;
    margin-bottom: 0;
    text-transform: uppercase;
  }

  .quotation-doc .doc-title {
    color: #000;
  }

  .doc-meta table {
    border-collapse: collapse;
    font-size: 9pt;
    margin-top: 0;
  }

  .doc-meta td {
    padding: 0;
    vertical-align: middle;
    border: none;
    font-weight: 300;
    line-height: 1.5;
  }

  .doc-meta tr td:first-child {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: #555;
    text-align: left;
    width: 90pt;
    background: transparent;
  }

  .doc-meta tr td:last-child {
    text-align: left;
    width: 120pt;
    font-family: monospace;
    font-size: 9.5pt;
    color: #000;
    padding-left: 6pt;
  }

  /* ── Address Grid (Billed By vs Billed To) ── */
  .address-grid {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 8pt 0;
    padding: 6pt 0;
    border-bottom: 2px solid #000;
  }

  .address-col {
    font-size: 8.5pt;
    line-height: 1.45;
  }

  .address-col.left-align {
    text-align: left;
  }

  .address-col.right-align {
    text-align: left;
  }



  .address-col .title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 9pt;
    color: #111;
    margin-bottom: 4pt;
    text-transform: uppercase;
  }

  .address-col .website-link {
    color: #111;
    text-decoration: none;
    display: block;
    margin-bottom: 4pt;
  }

  .address-col .content {
    white-space: pre-wrap;
    color: #333;
    font-weight: 300;
  }

  .country-supply {
    margin-top: 6pt;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: #000;
  }

  /* ── Items Table ── */
  .items-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30pt;
    font-size: 9pt;
  }

  .items-table th {
    font-family: 'Montserrat', sans-serif;
    border: 1px solid #000;
    padding: 6pt 4pt;
    text-align: center;
    font-weight: 700;
    font-size: 8.5pt;
    background: #7A0000;
    color: #fff;
  }

  .quotation-doc .items-table th {
    background: #8C52FF;
  }

  .items-table th.col-desc {
    text-align: left;
  }

  .items-table th.col-gst {
    width: 40pt;
    text-align: center;
  }

  .items-table th.col-qty {
    width: 30pt;
    text-align: center;
  }

  .items-table th.col-rate {
    width: 65pt;
    text-align: right;
  }

  .items-table th.col-amt {
    width: 65pt;
    text-align: right;
  }

  .items-table th.col-igst {
    width: 65pt;
    text-align: right;
  }

  .items-table th.col-tot {
    width: 75pt;
    text-align: right;
  }

  .items-table td {
    border: 1px solid #000;
    padding: 6pt 6pt;
    vertical-align: middle;
    font-weight: normal;
    color: #111;
  }

  .items-table td.desc-cell {
    text-align: left;
    white-space: pre-wrap;
  }

  .items-table td.center-cell {
    text-align: center;
  }

  .items-table td.num-cell {
    text-align: right;
    white-space: nowrap;
  }

  /* ── Summary Section (Bank, Totals, UPI QR) ── */
  .summary-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 15pt;
    gap: 15pt;
  }

  .summary-bank {
    width: 38%;
    font-size: 8pt;
  }

  .summary-bank .title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 8.5pt;
    color: #111;
    margin-bottom: 6pt;
    text-transform: uppercase;
  }

  .bank-table {
    width: 100%;
    border-collapse: collapse;
  }

  .bank-table td {
    padding: 2.5pt 0;
    font-size: 8pt;
    border: none !important;
    font-weight: 300;
  }

  .bank-table tr td:first-child {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: #555;
    width: 75pt;
  }

  .bank-table tr td:last-child {
    color: #000;
  }

  .summary-totals {
    width: 30%;
  }

  .totals-table {
    width: 100%;
    border-collapse: collapse;
  }

  .totals-table td {
    padding: 4pt 0;
    border: none;
    font-size: 8.5pt;
    font-weight: 300;
  }

  .totals-table tr td:first-child {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    text-align: left;
    color: #555;
  }

  .totals-table tr td:last-child {
    text-align: right;
    width: 80pt;
    white-space: nowrap;
    font-weight: bold;
    color: #111;
  }

  .totals-table tr.total-row td {
    border: none;
    border-top: 1px solid #111;
    color: #111;
    font-size: 10pt;
    padding: 6pt 0;
  }

  .summary-upi {
    width: 30%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .upi-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 8pt;
    color: #111;
    margin-bottom: 2pt;
    text-transform: uppercase;
  }

  .upi-qr-placeholder {
    width: 70pt;
    height: 70pt;
    border: 1px solid #ccc;
    background: #fff;
    margin: 4pt 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .upi-qr-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .upi-id {
    font-weight: bold;
    font-size: 7.5pt;
    color: #000;
    margin-top: 1pt;
  }

  .upi-note {
    font-size: 6.5pt;
    color: #666;
    line-height: 1.25;
    margin-top: 3pt;
    max-width: 120pt;
    text-align: center;
  }

  /* ── Signatory Section ── */
  .signatory-section {
    text-align: right;
    margin-top: 20pt;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .signatory-box {
    height: 35pt;
  }

  .signatory-label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 8.5pt;
    color: #333;
    border-top: 1px solid #333;
    padding-top: 4pt;
    width: 180pt;
    text-align: center;
  }

  /* ── Terms Section ── */
  .terms-section {
    margin-top: 18pt;
    font-size: 8pt;
    line-height: 1.45;
    border-top: 2px solid #000;
    padding-top: 8pt;
  }

  .terms-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 8.5pt;
    color: #111;
    margin-bottom: 4pt;
    text-transform: uppercase;
  }

  .terms-content {
    white-space: pre-wrap;
    color: #444;
    font-weight: 300;
  }

  .enquiry-note {
    margin-top: 6pt;
    color: #000;
  }

  /* ── Footer ── */
  .page-footer {
    margin-top: 30pt;
    padding-top: 10pt;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 7.5pt;
    color: #555;
  }

  .footer-col {
    display: flex;
    align-items: center;
    gap: 6pt;
  }

  .footer-col.col-address {
    align-items: flex-start;
    max-width: 180pt;
  }

  .footer-icon {
    width: 18pt;
    height: 18pt;
    background: #7A0000;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .quotation-doc .footer-icon {
    background: #8C52FF;
  }

  .footer-icon svg {
    width: 9pt;
    height: 9pt;
  }

  .footer-text {
    line-height: 1.35;
    font-weight: 600;
    color: #555;
  }
`;
