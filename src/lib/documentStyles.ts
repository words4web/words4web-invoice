/**
 * Shared document CSS — injected as a <style> block into the hidden iframe.
 * Controls @page size, font, table layout, and print-color-adjust.
 */
export const DOCUMENT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Arial:wght@400;700;900&display=swap');

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
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10pt;
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
    margin-bottom: 18pt;
  }

  .header-left img {
    width: 220pt;
    height: auto;
    display: block;
  }

  .header-left .company-info {
    margin-top: 8pt;
    font-size: 8.5pt;
    line-height: 1.6;
    color: #000;
    display: flex;
    flex-direction: column;
    gap: 6pt;
  }

  .company-info-item {
    display: flex;
    align-items: flex-start;
    gap: 8pt;
  }

  .company-info-item.align-center {
    align-items: center;
  }

  .company-info-item.align-center .company-info-icon {
    margin-top: 0;
  }

  .company-info-icon {
    flex-shrink: 0;
    margin-top: 2.5pt;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .company-info-text {
    font-weight: bold;
    line-height: 1.45;
    color: #000;
  }

  .header-right {
    text-align: right;
    min-width: 200pt;
  }

  .blue-bar {
    background-color: #1a56a0;
    height: 28pt;
    clip-path: polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%);
    margin-bottom: 6pt;
  }

  .doc-title {
    font-size: 26pt;
    font-weight: 900;
    color: #4a4a4a;
    letter-spacing: 1pt;
    margin-bottom: 8pt;
    text-transform: uppercase;
  }

  .doc-meta table {
    margin-left: auto;
    border-collapse: collapse;
    font-size: 9pt;
  }

  .doc-meta td {
    padding: 1.5pt 4pt 1.5pt 0;
    vertical-align: top;
  }

  .doc-meta td:first-child {
    font-weight: bold;
    padding-right: 8pt;
    white-space: nowrap;
  }

  /* ── Client Section ── */
  .client-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 14pt 0 18pt;
    font-size: 9.5pt;
  }

  .client-address .label {
    font-weight: bold;
    margin-bottom: 3pt;
  }

  .client-address .value {
    white-space: pre-wrap;
    line-height: 1.55;
  }

  .for-project {
    text-align: right;
    font-size: 9.5pt;
    max-width: 200pt;
  }

  /* ── Items Table ── */
  .items-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0;
    font-size: 9.5pt;
  }

  .items-table th {
    border: 1pt solid #000;
    padding: 6pt 10pt;
    text-align: center;
    font-weight: bold;
    font-size: 9.5pt;
    background: #fff;
  }

  .items-table th.desc-col { text-align: center; }
  .items-table th.amt-col  { text-align: center; width: 90pt; }

  .items-table td {
    border: 1pt solid #000;
    padding: 5pt 10pt;
    vertical-align: top;
  }

  .items-table td.desc-cell { }
  .items-table td.amt-cell  { text-align: right; width: 90pt; white-space: nowrap; }
  .items-table td.vat-label { text-align: right; font-size: 9pt; border-left: 1pt solid #000; }

  /* Amount payable row */
  .amount-payable-row td {
    border: 1pt solid #000;
    padding: 5pt 10pt;
    font-weight: bold;
  }
  .amount-payable-row td:first-child { text-align: right; }
  .amount-payable-row td:last-child  { text-align: right; width: 90pt; }

  /* ── Quotation total row ── */
  .total-cost-row td {
    border: 1pt solid #000;
    padding: 5pt 10pt;
    font-weight: bold;
    font-size: 9pt;
  }
  .total-cost-row td:first-child { text-align: right; }
  .total-cost-row td:last-child  { text-align: right; width: 90pt; }

  .vat-note-row td {
    border: 1pt solid #000;
    padding: 4pt 10pt;
    font-weight: bold;
    font-size: 8.5pt;
    text-align: right;
  }

  /* ── Invoice Footer ── */
  .invoice-footer {
    margin-top: 16pt;
    font-size: 9pt;
    line-height: 1.7;
  }

  .invoice-footer .vat-no { font-weight: bold; }

  /* ── Quotation page footer (every page) ── */
  .page-footer {
    margin-top: 16pt;
    font-size: 8pt;
    color: #444;
    border-top: 0.5pt solid #ccc;
    padding-top: 4pt;
    display: flex;
    justify-content: space-between;
  }

  /* ── Payment Terms ── */
  .payment-terms {
    margin-top: 24pt;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }

  .payment-terms h3 {
    font-weight: bold;
    margin-bottom: 8pt;
    font-size: 9.5pt;
  }

  .payment-terms-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
    line-height: 1.8;
    margin-top: 4pt;
  }

  .payment-terms-table td {
    padding: 2pt 0;
    vertical-align: top;
  }

  .payment-terms-table td:first-child {
    text-align: left;
  }

  .payment-terms-table td.percentage-col {
    text-align: right;
    width: 60pt;
    font-weight: bold;
  }

  /* ── Quotation item (numbered) ── */
  .q-item {
    margin-bottom: 10pt;
    page-break-inside: avoid;
  }

  .q-item .q-item-title {
    font-weight: bold;
    margin-bottom: 2pt;
  }

  .q-item .q-item-desc {
    font-size: 9pt;
    white-space: pre-wrap;
    line-height: 1.5;
  }

  /* Ensure colors print in non-Chrome too */
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`;
