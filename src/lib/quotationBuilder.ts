import { DOCUMENT_CSS } from "./documentStyles";
import { COMPANY } from "@/data/company";
import { QuotationData } from "@/types/quotation";
import { calcQuotationTotal } from "@/utils/quotation";
import { RAW_SVG_ICONS } from "@/data/icons";
import { getTodayStr } from "@/utils/date";

/** Build the self-contained HTML document string for the quotation iframe */
export function buildQuotationHtml(
  data: QuotationData,
  logoBase64: string,
): string {
  const totals = calcQuotationTotal(data.items);
  const itemRows = data.items.filter((i) => i.description || i.qty || i.rate);

  const formatVal = (val: number) =>
    val % 1 === 0
      ? val.toLocaleString("en-IN", { maximumFractionDigits: 0 })
      : val.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

  const itemRowsHtml = itemRows
    .map((item) => {
      const qty = parseFloat(item.qty) || 0;
      const rate = parseFloat(item.rate) || 0;
      const gstRate = parseFloat(item.gstRate) || 0;
      const amount = qty * rate;
      const igst = amount * (gstRate / 100);
      const total = amount + igst;

      return `
      <tr>
        <td class="desc-cell">${item.description.replace(/\n/g, "<br>")}</td>
        <td class="center-cell">${item.gstRate}%</td>
        <td class="center-cell">${item.qty}</td>
        <td class="num-cell">₹${formatVal(rate)}</td>
        <td class="num-cell">₹${formatVal(amount)}</td>
        <td class="num-cell">₹${formatVal(igst)}</td>
        <td class="num-cell">₹${formatVal(total)}</td>
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
  const notesLines = data.additionalNotes.replace(/\n/g, "<br>");

  const timestamp = getTodayStr();

  const firstLine = (data?.clientAddress || "")?.split("\n")[0] || "";
  const clientClean = firstLine
    ?.replace(/[^a-zA-Z0-9\s-]/g, "")
    ?.trim()
    ?.replace(/\s+/g, "_");

  const docTitle = `Quotation_${data?.quotationNo || "Draft"}${clientClean ? "_" + clientClean : ""}_${timestamp}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${docTitle}</title>
  <style>${DOCUMENT_CSS}</style>
</head>
<body>
<div class="document quotation-doc">

  <!-- HEADER -->
  <div class="header">
    <div class="header-left">
      <div class="doc-title">QUOTATION</div>
      <div class="doc-meta">
        <table>
          <tr><td>Quotation No</td><td>${data.quotationNo || "—"}</td></tr>
          <tr><td>Quotation Date</td><td>${data.date || "—"}</td></tr>
          <tr><td>Valid Till Date</td><td>${data.validTillDate || "—"}</td></tr>
        </table>
      </div>
    </div>
    <div class="header-right">
      <img src="${logoBase64}" alt="${COMPANY.name}" />
    </div>
  </div>

  <!-- ADDRESSES (Quotation From vs Quotation For) -->
  <div class="address-grid" style="display: block;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div class="address-col left-align">
        <div class="title">Quotation From</div>
        <a class="website-link" href="${ownerWebsite}" target="_blank">${ownerWebsite}</a>
        <div class="content">${ownerAddressLines}</div>
        <div class="content" style="margin-top: 4px;">Email: ${ownerEmail}</div>
        <div class="content">Phone: ${ownerPhone}</div>
      </div>
      <div class="address-col right-align">
        <div class="title">Quotation For</div>
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
        <th class="col-gst">GST</th>
        <th class="col-qty">QTY</th>
        <th class="col-rate">RATE</th>
        <th class="col-amt">AMOUNT</th>
        <th class="col-igst">IGST</th>
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

    <!-- UPI Scan -->
    <div class="summary-upi">
      <div class="upi-title">Scan to pay via UPI</div>
      <div class="upi-note">Maximum of 1 lakh canbe transferred via upi in a single day</div>
      <div class="upi-qr-placeholder">
        ${data.qrCode ? `<img src="${data.qrCode}" alt="UPI QR Code" />` : `<span style="font-size: 7.5pt; color: #999; font-weight: bold; text-transform: uppercase;">Missing</span>`}
      </div>
      <div class="upi-id">${data.upiId || COMPANY.upiId}</div>
    </div>

    <!-- Totals -->
    <div class="summary-totals">
      <table class="totals-table">
        <tr>
          <td>SUBTOTAL</td>
          <td>${totals.fmtSubtotal}</td>
        </tr>
        <tr>
          <td>TAX</td>
          <td>₹ ${totals.fmtVat}</td>
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
    <div class="signatory-box"></div>
    <div class="signatory-label">Authorised Signatory</div>
  </div>

  <!-- ADDITIONAL NOTES -->
  <div class="terms-section">
    <div class="terms-title">ADDITIONAL NOTES</div>
    <div class="terms-content">${notesLines}</div>
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
        5037, SSRF, Near City Center Mall,<br>
        Lavate Nagar, Nashik 422002
      </div>
    </div>
  </div>

</div>
</body>
</html>`;
}
