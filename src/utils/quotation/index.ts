import { QuotationLineItem } from "@/types/quotation";

/** Compute subtotal, IGST/VAT, and total from quotation line items */
export function calcQuotationTotal(items: QuotationLineItem[], currency: 'INR' | 'EUR' | 'GBP' = 'INR') {
  let subtotal = 0;
  let gst = 0;
  let total = 0;

  const processedItems = (items || [])?.map((item) => {
    const qty = parseFloat(item?.qty) || 0;
    const rate = parseFloat(item?.rate) || 0;
    const gstRatePercent = parseFloat(item?.gstRate) || 0;

    const amount = qty * rate;
    const igst = amount * (gstRatePercent / 100);
    const itemTotal = amount + igst;

    subtotal += amount;
    gst += igst;
    total += itemTotal;

    return {
      amount,
      igst,
      total: itemTotal,
    };
  });

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

  const fmt = (n: number) => {
    const formatted =
      n % 1 === 0
        ? n.toLocaleString(locale, { maximumFractionDigits: 0 })
        : n.toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    return `${symbol} ${formatted}`;
  };

  const fmtRaw = (n: number) =>
    n % 1 === 0
      ? n.toLocaleString(locale, { maximumFractionDigits: 0 })
      : n.toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
         });

  return {
    subtotal,
    vat: gst,
    total,
    fmtSubtotal: fmt(subtotal),
    fmtVat: fmtRaw(gst),
    fmtVatWithSym: fmt(gst),
    fmtTotal: fmt(total),
    processedItems,
  };
}
