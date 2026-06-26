import { DOCUMENT_CSS } from "./documentStyles";
import { COMPANY } from "@/data/company";
import {
  PIN_SVG_STR,
  PHONE_SVG_STR,
  EMAIL_SVG_STR,
  WEBSITE_SVG_STR,
} from "../components/CompanyIcons";
import { InvoiceData } from "@/types/invoice";
import { calcInvoiceTotals } from "@/utils/invoice";

/** Build the self-contained HTML document string for the invoice iframe */
export function buildInvoiceHtml(
  data: InvoiceData,
  logoBase64: string,
): string {
  const { fmtVat, fmtTotal } = calcInvoiceTotals(data.items);

  // Minimum blank rows to keep table looking like the original PDF
  const MIN_ROWS = 8;
  const itemRows = data.items.filter((i) => i.description || i.amount);
  const blankCount = Math.max(0, MIN_ROWS - itemRows.length);

  const itemRowsHtml = itemRows
    .map(
      (item) => `
      <tr>
        <td class="desc-cell">${item.description.replace(/\n/g, "<br>")}</td>
        <td class="amt-cell">${item.amount ? `£${parseFloat(item.amount.replace(/[^0-9.]/g, "")).toLocaleString("en-GB", { minimumFractionDigits: 2 })}` : ""}</td>
      </tr>`,
    )
    .join("");

  const blankRowsHtml = Array.from({ length: blankCount })
    .map(
      () =>
        `<tr style="height:22pt"><td class="desc-cell"></td><td class="amt-cell"></td></tr>`,
    )
    .join("");

  const addressLines = (data.ownerAddress || COMPANY.address)
    .split("\n")
    .join("<br>");
  const rawPhone = data.ownerPhone || COMPANY.phones.join(" / ");
  const phoneLines = rawPhone
    .split(/\s*[\/\n]\s*/)
    .filter(Boolean)
    .join("<br>");
  const emailLine = data.ownerEmail || COMPANY.email;
  const websiteLine = data.ownerWebsite || COMPANY.website;
  const clientLines = data.clientAddress.replace(/\n/g, "<br>");
  const forProjectLines = (data.forProject || "").replace(/\n/g, "<br>");

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const timestamp = `${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}`;

  const clientClean = (data?.clientAddress || "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .slice(0, 10)
    .replace(/\s+/g, "_");

  const docTitle = `Invoice_${data?.invoiceNo || "Draft"}${clientClean ? "_" + clientClean : ""}_${timestamp}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${docTitle}</title>
  <style>${DOCUMENT_CSS}</style>
</head>
<body>
<div class="document">

  <!-- HEADER -->
  <div class="header">
    <div class="header-left">
      <img src="${logoBase64}" alt="Live Constructions Ltd" />
      <div class="company-info">
        <div class="company-info-item">
          <div class="company-info-icon">${PIN_SVG_STR}</div>
          <div class="company-info-text">${addressLines}</div>
        </div>
        <div class="company-info-item">
          <div class="company-info-icon">${PHONE_SVG_STR}</div>
          <div class="company-info-text">${phoneLines}</div>
        </div>
        <div class="company-info-item align-center">
          <div class="company-info-icon">${EMAIL_SVG_STR}</div>
          <div class="company-info-text">${emailLine}</div>
        </div>
        <div class="company-info-item align-center">
          <div class="company-info-icon">${WEBSITE_SVG_STR}</div>
          <div class="company-info-text">${websiteLine}</div>
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="blue-bar" style="width:220pt"></div>
      <div class="doc-title">INVOICE</div>
      <div class="doc-meta">
        <table>
          <tr><td>INVOICE NO.</td><td>${data.invoiceNo}</td></tr>
          <tr><td>DATE:</td><td>${data.date}</td></tr>
          <tr><td>UTR NO.</td><td>${data.utrNo}</td></tr>
        </table>
      </div>
    </div>
  </div>

  <!-- CLIENT -->
  <div class="client-section">
    <div class="client-address">
      <div class="label">Client Address:</div>
      <div class="value">${clientLines}</div>
    </div>
    <div class="for-project">For: ${forProjectLines}</div>
  </div>

  <!-- ITEMS TABLE -->
  <table class="items-table">
    <thead>
      <tr>
        <th class="desc-col">DESCRIPTION</th>
        <th class="amt-col">AMOUNT</th>
      </tr>
    </thead>
    <tbody>
      ${itemRowsHtml}
      ${blankRowsHtml}
      <tr>
        <td class="vat-label">VAT @ 20%</td>
        <td class="amt-cell">${fmtVat}</td>
      </tr>
    </tbody>
  </table>

  <!-- AMOUNT PAYABLE -->
  <table class="items-table" style="margin-top:0; border-top:none">
    <tbody>
      <tr class="amount-payable-row">
        <td style="border-top:none">AMOUNT PAYABLE</td>
        <td style="border-top:none; width:90pt; text-align:right">${fmtTotal}</td>
      </tr>
    </tbody>
  </table>

  <!-- FOOTER -->
  <div class="invoice-footer">
    <p><span class="vat-no">VAT NO:</span> ${data.vatNo}</p>
    <p>Company Registered in England and Wales No: ${COMPANY.regNo}</p>
    <br/>
    <p><strong>BANK:</strong> ${data.bank}</p>
    <p><strong>A/C No:</strong> ${data.accountNo}</p>
    <p><strong>Sort Code:</strong> ${data.sortCode}</p>
  </div>

</div>
</body>
</html>`;
}
