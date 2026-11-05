import { QuotationLineItem } from "@/types/quotation";

/** Compute subtotal, IGST/VAT, and total from quotation line items, factoring in duration in months */
export function calcQuotationTotal(
  items: QuotationLineItem[],
  currency: "INR" | "EUR" | "GBP" | "MYR" | "USD" = "INR",
  durationMonths: number = 1,
) {
  const months = Math.max(1, Number(durationMonths) || 1);

  let monthlySubtotal = 0;
  let monthlyGst = 0;
  let monthlyTotal = 0;

  const processedItems = (items || [])?.map((item) => {
    const qty = parseFloat(item?.qty) || 0;
    let rate = parseFloat(item?.rate) || 0;
    if (item?.isNegative) {
      rate = -Math.abs(rate);
    }
    const gstRatePercent = parseFloat(item?.gstRate) || 0;

    const amount = qty * rate;
    const igst = amount * (gstRatePercent / 100);
    const itemTotal = amount + igst;

    monthlySubtotal += amount;
    monthlyGst += igst;
    monthlyTotal += itemTotal;

    return {
      amount,
      igst,
      total: itemTotal,
    };
  });

  const subtotal = monthlySubtotal * months;
  const gst = monthlyGst * months;
  const total = monthlyTotal * months;

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

  const fmt = (n: number) => {
    const isNeg = n < 0;
    const absVal = Math.abs(n);
    const formatted =
      absVal % 1 === 0
        ? absVal.toLocaleString(locale, { maximumFractionDigits: 0 })
        : absVal.toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    return isNeg ? `-${symbol} ${formatted}` : `${symbol} ${formatted}`;
  };

  const fmtRaw = (n: number) => {
    const isNeg = n < 0;
    const absVal = Math.abs(n);
    const formatted =
      absVal % 1 === 0
        ? absVal.toLocaleString(locale, { maximumFractionDigits: 0 })
        : absVal.toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    return isNeg ? `-${formatted}` : formatted;
  };

  const cgst = gst / 2;
  const sgst = gst / 2;
  const monthlyCgst = monthlyGst / 2;
  const monthlySgst = monthlyGst / 2;

  return {
    months,
    monthlySubtotal,
    monthlyVat: monthlyGst,
    monthlyTotal,
    fmtMonthlySubtotal: fmt(monthlySubtotal),
    fmtMonthlyVat: fmt(monthlyGst),
    fmtMonthlyTotal: fmt(monthlyTotal),

    subtotal,
    vat: gst,
    cgst,
    sgst,
    monthlyCgst,
    monthlySgst,
    total,
    fmtSubtotal: fmt(subtotal),
    fmtVat: fmtRaw(gst),
    fmtVatWithSym: fmt(gst),
    fmtCgst: fmt(cgst),
    fmtSgst: fmt(sgst),
    fmtTotal: fmt(total),
    processedItems,
  };
}
