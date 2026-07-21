import { DOCUMENT_CSS } from "./documentStyles";
import { COMPANY } from "@/data/company";
import { InvoiceData } from "@/types/invoice";
import { calcInvoiceTotals } from "@/utils/invoice";
import { RAW_SVG_ICONS } from "@/data/icons";
import { getTodayStr } from "@/utils/date";

/** Build the self-contained HTML document string for the invoice iframe */
export function buildInvoiceHtml(
  data: InvoiceData,
  logoBase64: string,
  signatureBase64: string,
  stampBase64: string,
): string {
  const currency = data?.currency || "INR";
  const totals = calcInvoiceTotals(data?.items, currency);
  const itemRows = data?.items?.filter(
    (i) => i?.description || i?.qty || i?.rate,
  );

  const isVat = currency !== "INR";
  const taxHeader1 = isVat ? "VAT %" : "GST";
  const taxHeader2 = isVat ? "VAT" : "IGST";
  const taxSummaryLabel = isVat ? "VAT" : "TAX";

  const currencySymbols = {
    INR: "₹",
    EUR: "€",
    GBP: "£",
  };
  const currencyLocales = {
    INR: "en-IN",
    EUR: "en-IE",
    GBP: "en-GB",
  };

  const symbol = currencySymbols[currency] || "₹";
  const locale = currencyLocales[currency] || "en-IN";

  const formatVal = (val: number) =>
    val % 1 === 0
      ? val.toLocaleString(locale, { maximumFractionDigits: 0 })
      : val.toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

  const itemRowsHtml = itemRows
    .map((item) => {
      const qty = parseFloat(item.qty) || 0;
      let rate = parseFloat(item.rate) || 0;
      if (item.isNegative) {
        rate = -Math.abs(rate);
      }
      const gstRate = parseFloat(item.gstRate) || 0;
      const amount = qty * rate;
      const igst = amount * (gstRate / 100);
      const total = amount + igst;

      return `
      <tr>
        <td class="desc-cell">${item.description.replace(/\n/g, "<br>")}</td>
        <td class="center-cell">${item.gstRate}%</td>
        <td class="center-cell">${item.qty}</td>
        <td class="num-cell">${symbol}${formatVal(Math.abs(rate))}</td>
        <td class="num-cell">${symbol}${formatVal(Math.abs(amount))}</td>
        <td class="num-cell">${symbol}${formatVal(Math.abs(igst))}</td>
        <td class="num-cell">${symbol}${formatVal(Math.abs(total))}</td>
      </tr>`;
    })
    .join("");

  const ownerAddressLines = (data.ownerAddress || COMPANY.address)
    .split("\n")
    .join("<br>");
  const ownerPhone = data.ownerPhone || COMPANY.phones[0];
  const ownerEmail = data.ownerEmail || COMPANY.email;
  const ownerWebsite = data.ownerWebsite || COMPANY.website;

  const clientLines = data.clientAddress.replace(/\n/g, "<br>");
  const termsLines = data.termsAndConditions.replace(/\n/g, "<br>");

  const timestamp = getTodayStr();

  const firstLine = (data?.clientAddress || "")?.split("\n")?.[0] || "";
  const clientClean = firstLine
    ?.replace(/[^a-zA-Z0-9\s-]/g, "")
    ?.trim()
    ?.replace(/\s+/g, "_");

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
      <div class="doc-title">INVOICE</div>
      <div class="doc-meta">
        <table>
          <tr><td>Invoice No</td><td>${data.invoiceNo || "—"}</td></tr>
          <tr><td>Invoice Date</td><td>${data.date || "—"}</td></tr>
          <tr><td>Due Date</td><td>${data.dueDate || "—"}</td></tr>
        </table>
      </div>
    </div>
    <div class="header-right">
      <img src="${logoBase64}" alt="${COMPANY.name}" />
    </div>
  </div>

  <!-- ADDRESSES (Billed By vs Billed To) -->
  <div class="address-grid" style="display: block;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div class="address-col left-align">
        <div class="title">Billed By</div>
        <a class="website-link" href="${ownerWebsite}" target="_blank">${ownerWebsite}</a>
        <div class="content">${ownerAddressLines}</div>
        <div class="content" style="margin-top: 4px;">Email: ${ownerEmail}</div>
        <div class="content">Phone: ${ownerPhone}</div>
      </div>
      <div class="address-col right-align">
        <div class="title">Billed To</div>
        <div class="content">${clientLines}</div>
      </div>
    </div>
    <div style="text-align: center; margin-top: 10pt; font-size: 8.5pt; font-weight: normal; color: #111;">
      Country of Supply: ${data.countryOfSupply || "India"}
    </div>
  </div>

  <!-- ITEMS TABLE -->
  <table class="items-table">
    <thead>
      <tr>
        <th class="col-desc">ITEMS</th>
        <th class="col-gst">${taxHeader1}</th>
        <th class="col-qty">QTY</th>
        <th class="col-rate">RATE</th>
        <th class="col-amt">AMOUNT</th>
        <th class="col-igst">${taxHeader2}</th>
        <th class="col-tot">TOTAL</th>
      </tr>
    </thead>
    <tbody>
      ${itemRowsHtml}
    </tbody>
  </table>

  <!-- SUMMARY SECTION -->
  <div class="summary-section">
    <!-- Bank Details -->
    <div class="summary-bank">
      <div class="title">Bank Details</div>
      <table class="bank-table">
        <tr><td>Account Name</td><td>${data.accountName || COMPANY.accountName}</td></tr>
        <tr><td>Account Number</td><td>${data.accountNo || COMPANY.accountNo}</td></tr>
        <tr><td>IFSC</td><td>${data.ifsc || COMPANY.ifsc}</td></tr>
        <tr><td>Account Type</td><td>${data.accountType || COMPANY.accountType}</td></tr>
        <tr><td>Bank</td><td>${data.bank || COMPANY.bank}</td></tr>
      </table>
    </div>

    <!-- Totals -->
    <div class="summary-totals">
      <table class="totals-table">
        <tr>
          <td>SUBTOTAL</td>
          <td>${totals.fmtSubtotal}</td>
        </tr>
        <tr>
          <td>${taxSummaryLabel}</td>
          <td>${totals.fmtVatWithSym}</td>
        </tr>
        <tr class="total-row">
          <td>TOTAL</td>
          <td>${totals.fmtTotal}</td>
        </tr>
      </table>
    </div>
  </div>

  <!-- SIGNATORY -->
  <div class="signatory-section">
    <div class="signatory-box" style="height: auto; margin-bottom: 2pt; display: flex; flex-direction: column; align-items: center; width: 180pt;">
      <img src="${signatureBase64}" alt="Signature" style="height: 40pt; width: auto; display: block; margin-bottom: -4pt;" />
      <div class="signatory-label" style="width: 100%;">Accounts and Business Development</div>
      <img src="${stampBase64}" alt="Stamp" style="height: 60pt; width: auto; display: block; margin-top: 4pt;" />
    </div>
  </div>

  <!-- TERMS AND CONDITIONS -->
  <div class="terms-section">
    <div class="terms-title">TERMS AND CONDITIONS</div>
    <div class="terms-content">${termsLines}</div>
    <div class="enquiry-note">For any enquiry, reach out via email to <a href="mailto:${ownerEmail}" style="color: #111; text-decoration: none;">${ownerEmail}</a>, call to <a href="tel:${ownerPhone}" style="color: #111; text-decoration: none;">${ownerPhone}</a></div>
  </div>

  <!-- FIXED FOOTER -->
  <div class="page-footer">
    <!-- Phone -->
    <div class="footer-col">
      <div class="footer-icon">
        ${RAW_SVG_ICONS.phone}
      </div>
      <div class="footer-text">${ownerPhone.replace(/\s+/g, "").replace("+91", "+91 ")}</div>
    </div>
    <!-- Website -->
    <div class="footer-col">
      <div class="footer-icon">
        ${RAW_SVG_ICONS.globe}
      </div>
      <div class="footer-text">
        <a href="${ownerWebsite}" style="color: inherit; text-decoration: none;">${ownerWebsite.replace(/\/$/, "")}</a>
      </div>
    </div>
    <!-- Address -->
    <div class="footer-col col-address">
      <div class="footer-icon">
        ${RAW_SVG_ICONS.mapPin}
      </div>
      <div class="footer-text">
        ${ownerAddressLines}
      </div>
    </div>
  </div>

</div>
</body>
</html>`;
}
