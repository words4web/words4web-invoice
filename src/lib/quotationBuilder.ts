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
  signatureBase64: string,
  stampBase64: string,
): string {
  const currency = data?.currency || "INR";
  const totals = calcQuotationTotal(
    data?.items,
    currency,
    data?.durationMonths,
  );
  const itemRows = data?.items?.filter(
    (i) => i?.description || i?.qty || i?.rate,
  );

  const isVat = currency === "EUR" || currency === "GBP";
  const isSst = currency === "MYR";
  const isUsd = currency === "USD";
  const isCgstSgst =
    (!currency || currency === "INR") && data.gstType === "CGST_SGST";
  const taxHeader1 = isSst ? "SST %" : isVat ? "VAT %" : isUsd ? "Tax %" : "GST";
  const taxHeader2 = isSst
    ? "SST"
    : isVat
      ? "VAT"
      : isUsd
        ? "Tax"
        : isCgstSgst
          ? "CGST+SGST"
          : "IGST";
  const taxSummaryLabel = isSst ? "SST" : isVat ? "VAT" : isUsd ? "TAX" : "TAX";

  const currencySymbols = {
    INR: "₹",
    EUR: "€",
    GBP: "£",
    MYR: "RM",
    USD: "$",
  };
  const currencyLocales = {
    INR: "en-IN",
    EUR: "en-IE",
    GBP: "en-GB",
    MYR: "en-MY",
    USD: "en-US",
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
  const notesLines = data.additionalNotes.replace(/\n/g, "<br>");

  const timestamp = getTodayStr();

  const firstLine = (data?.clientAddress || "")?.split("\n")[0] || "";
  const clientClean = firstLine
    ?.replace(/[^a-zA-Z0-9\s-]/g, "")
    ?.trim()
    ?.replace(/\s+/g, "_");

  const docTitle = `Quotation_${data?.quotationNo || "Draft"}${clientClean ? "_" + clientClean : ""}_${timestamp}`;

  const rateCardItems =
    data.rateCardItems?.filter((item) => item.particular || item.rate) || [];

  const formatRateItem = (raw: string) => {
    const num = parseFloat(raw);
    if (isNaN(num)) return raw;
    return num % 1 === 0
      ? `${symbol} ${num.toLocaleString(locale, { maximumFractionDigits: 0 })}`
      : `${symbol} ${num.toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
  };

  const rateCardHtml =
    data.showRateCard && (rateCardItems.length > 0 || data.rateCardNote)
      ? `
  <!-- REVISION & SCOPE RATE CARD -->
  <div class="rate-card-section" style="margin-top: 18pt; margin-bottom: 16pt; max-width: 100%; box-sizing: border-box;">
    <div style="font-family: 'Montserrat', sans-serif; font-size: 8.5pt; font-weight: 700; color: #8C52FF; letter-spacing: 0.5px; text-transform: uppercase; border-bottom: 1.5px solid #8C52FF; padding-bottom: 3pt; margin-bottom: 6pt; word-break: break-word; overflow-wrap: anywhere; box-sizing: border-box; max-width: 100%;">
      ${data.rateCardTitle || "REVISION & ADDITIONAL SCOPE RATE CARD"}
    </div>
    ${
      data.rateCardNote
        ? `<div style="font-size: 7.5pt; color: #444; line-height: 1.4; margin-bottom: 6pt; font-style: italic; background-color: #fcfaff; border-left: 2.5pt solid #8C52FF; padding: 4pt 6pt; word-break: break-word; overflow-wrap: anywhere; box-sizing: border-box; max-width: 100%;">${data.rateCardNote.trim().replace(/\n/g, "<br>")}</div>`
        : ""
    }
    ${
      rateCardItems.length > 0
        ? `<table class="rate-card-table" style="width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 8pt;">
        <thead>
          <tr style="background: #f3ebff; border-bottom: 1px solid #8C52FF;">
            <th style="border: 1px solid #ddd; padding: 4pt 6pt; text-align: left; font-weight: bold; color: #333; font-size: 7.5pt;">PARTICULARS / SCOPE ITEM</th>
            <th style="border: 1px solid #ddd; padding: 4pt 6pt; text-align: right; font-weight: bold; color: #333; width: 120pt; font-size: 7.5pt;">RATE (${symbol})</th>
          </tr>
        </thead>
        <tbody>
          ${rateCardItems
            .map(
              (item, idx) => `
          <tr style="background: ${idx % 2 === 0 ? "#ffffff" : "#fafafa"};">
            <td style="border: 1px solid #ddd; padding: 4pt 6pt; text-align: left; color: #222; white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere;">${item.particular.replace(/\n/g, "<br>")}</td>
            <td style="border: 1px solid #ddd; padding: 4pt 6pt; text-align: right; font-weight: bold; color: #111; width: 120pt; word-break: break-word; overflow-wrap: anywhere; box-sizing: border-box;">${formatRateItem(item.rate)}</td>
          </tr>`,
            )
            .join("")}
        </tbody>
      </table>`
        : ""
    }
  </div>`
      : "";

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
          ${
            data.durationMonths && data.durationMonths > 1
              ? `<tr><td style="color: #8C52FF; font-weight: bold;">Duration</td><td style="color: #8C52FF; font-weight: bold;">${data.durationMonths} Months</td></tr>`
              : ""
          }
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

  ${rateCardHtml}

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
        ${data.gstNo ? `<tr><td>GST No</td><td>${data.gstNo}</td></tr>` : ""}
        ${data.hsnCode ? `<tr><td>HSN</td><td>${data.hsnCode}</td></tr>` : ""}
      </table>
      ${
        data.paypalId
          ? `
      <div style="margin-top: 12px; padding: 4px 8px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; display: flex; align-items: center; gap: 8px; width: 240px;">
        ${RAW_SVG_ICONS.paypal}
        <span style="color: #111; font-weight: 600; word-break: break-all;">${data.paypalId}</span>
      </div>
      `
          : ""
      }
    </div>

    <!-- Totals -->
    ${
      data.showSummaryTotals !== false
        ? `
    <div class="summary-totals">
      <table class="totals-table">
        ${
          totals.months > 1
            ? `
        <tr>
          <td style="color: #6b7280; font-size: 8pt;">MONTHLY TOTAL</td>
          <td style="color: #4b5563; font-size: 8pt;">${totals.fmtMonthlyTotal} / mo</td>
        </tr>
        <tr>
          <td style="color: #8C52FF; font-size: 8pt; border-bottom: 1px dashed #e5e7eb; padding-bottom: 4px;">DURATION</td>
          <td style="color: #8C52FF; font-size: 8pt; border-bottom: 1px dashed #e5e7eb; padding-bottom: 4px;">${totals.months} Months (×${totals.months})</td>
        </tr>
        `
            : ""
        }
        <tr>
          <td>${totals.months > 1 ? `SUBTOTAL (${totals.months}M)` : "SUBTOTAL"}</td>
          <td>${totals.fmtSubtotal}</td>
        </tr>
        ${
          (!data.currency || data.currency === "INR") &&
          data.gstType === "CGST_SGST"
            ? `
        <tr>
          <td>CGST</td>
          <td>${totals.fmtCgst}</td>
        </tr>
        <tr>
          <td>SGST</td>
          <td>${totals.fmtSgst}</td>
        </tr>
        `
            : `
        <tr>
          <td>${taxSummaryLabel}</td>
          <td>${totals.fmtVatWithSym}</td>
        </tr>
        `
        }
        <tr class="total-row">
          <td>${totals.months > 1 ? "CONTRACT TOTAL" : "TOTAL"}</td>
          <td>${totals.fmtTotal}</td>
        </tr>
      </table>
    </div>
    `
        : ""
    }
  </div>

  <!-- SIGNATORY -->
  <div class="signatory-section">
    <div class="signatory-box" style="height: auto; margin-bottom: 2pt; display: flex; flex-direction: column; align-items: center; width: 180pt;">
      <img src="${signatureBase64}" alt="Signature" style="height: 40pt; width: auto; display: block; margin-bottom: -4pt;" />
      <div class="signatory-label" style="width: 100%;">Accounts and Business Development</div>
      <img src="${stampBase64}" alt="Stamp" style="height: 60pt; width: auto; display: block; margin-top: 4pt;" />
    </div>
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
        ${ownerAddressLines}
      </div>
    </div>
  </div>

</div>
</body>
</html>`;
}
