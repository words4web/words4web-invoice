import { DOCUMENT_CSS } from "./documentStyles";
import { COMPANY } from "@/data/company";
import {
  PIN_SVG_STR,
  PHONE_SVG_STR,
  EMAIL_SVG_STR,
  WEBSITE_SVG_STR,
} from "../components/CompanyIcons";
import { QuotationData } from "@/types/quotation";
import { DEFAULT_PAYMENT_TERMS } from "@/data/quotation";
import { calcQuotationTotal } from "@/utils/quotation";

export function buildQuotationHtml(
  data: QuotationData,
  logoBase64: string,
): string {
  const { fmtTotal } = calcQuotationTotal(data.items);

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

  const itemRowsHtml = data.items
    .map(
      (item, idx) => `
      <tr style="page-break-inside: avoid;">
        <td class="desc-cell">
          <div class="q-item">
            <div class="q-item-title">${idx + 1}) ${item.title}</div>
            <div class="q-item-desc">${item.description.replace(/\n/g, "<br>")}</div>
          </div>
        </td>
        <td class="amt-cell">${item.amount ? `£${parseFloat(item.amount.replace(/[^0-9.]/g, "")).toLocaleString("en-GB", { minimumFractionDigits: 2 })}` : ""}</td>
      </tr>`,
    )
    .join("");

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const timestamp = `${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}`;

  const clientClean = (data.clientAddress || "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .slice(0, 10)
    .replace(/\s+/g, "_");

  const docTitle = `Quotation_${data.quotationNo || "Draft"}${clientClean ? "_" + clientClean : ""}_${timestamp}`;

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
      <div class="doc-title">QUOTATION</div>
      <div class="doc-meta">
        <table>
          <tr><td>QUOTATION NO.</td><td>${data.quotationNo}</td></tr>
          <tr><td>DATE:</td><td>${data.date}</td></tr>
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
    <div class="for-project">
      <div>For:</div>
      <div>${forProjectLines}</div>
    </div>
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
      <!-- TOTAL COST -->
      <tr class="total-cost-row">
        <td>TOTAL COST ${data.totalLabel}</td>
        <td style="text-align:right; width:90pt">${fmtTotal}</td>
      </tr>
      <tr class="vat-note-row">
        <td colspan="2">N.B Quotation is subject to standard rate of VAT @ 20%</td>
      </tr>
    </tbody>
  </table>

  <!-- PAYMENT TERMS -->
  <div class="payment-terms">
    <h3>The terms of payment are as follows:</h3>
    <table class="payment-terms-table">
      <tbody>
        ${(data.paymentTerms || DEFAULT_PAYMENT_TERMS)
          .map(
            (term) => `
          <tr>
            <td>${term.description}</td>
            <td class="percentage-col">${term.percentage}</td>
          </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- PAGE FOOTER -->
  <div class="page-footer">
    <div>VAT NO: &nbsp; &nbsp; Company Registered in England and Wales No: ${COMPANY.regNo}</div>
  </div>

</div>
</body>
</html>`;
}
