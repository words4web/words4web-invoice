import { InvoiceLineItem } from "@/types/invoice";

/** Compute subtotal, VAT (20%), and total from line items */
export function calcInvoiceTotals(items: InvoiceLineItem[]) {
  const subtotal = items?.reduce((acc, item) => {
    const v = parseFloat(item?.amount?.replace(/[^0-9.]/g, ""));
    return acc + (isNaN(v) ? 0 : v);
  }, 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;
  const fmt = (n: number) =>
    n === 0
      ? ""
      : `£${n?.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return { subtotal, vat, total, fmtVat: fmt(vat), fmtTotal: fmt(total) };
}
