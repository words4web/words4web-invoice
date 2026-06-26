import { QuotationLineItem } from "@/types/quotation";

export function calcQuotationTotal(items: QuotationLineItem[]) {
  const total = items.reduce((acc, item) => {
    const v = parseFloat(item.amount.replace(/[^0-9.]/g, ""));
    return acc + (isNaN(v) ? 0 : v);
  }, 0);
  const fmt = (n: number) =>
    n === 0
      ? ""
      : `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return { total, fmtTotal: fmt(total) };
}
