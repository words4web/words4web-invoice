export interface QuotationLineItem {
  description: string;
  gstRate: string; // e.g. "0" or "18"
  qty: string;
  rate: string;
  isNegative?: boolean;
}

export interface RateCardItem {
  particular: string;
  rate: string;
}

export interface QuotationData {
  id?: string;
  quotationNo: string;
  date: string;
  validTillDate: string;
  clientAddress: string;
  countryOfSupply: string;
  items: QuotationLineItem[];
  currency?: "INR" | "EUR" | "GBP" | "MYR" | "USD";
  durationMonths?: number;
  gstType?: "IGST" | "CGST_SGST";
  // Toggle to show or hide the summary totals breakdown (Subtotal, GST/Tax, Total)
  showSummaryTotals?: boolean;

  showRateCard?: boolean;
  rateCardTitle?: string;
  rateCardNote?: string;
  rateCardItems?: RateCardItem[];

  // Bank details
  bank: string;
  accountName: string;
  accountNo: string;
  ifsc: string;
  accountType: string;
  upiId: string;
  qrCode?: string;
  paypalId?: string;
  gstNo?: string;
  hsnCode?: string;

  // Terms & Conditions / Additional Notes
  additionalNotes: string;

  // Owner details (editable)
  ownerAddress?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerWebsite?: string;
}

export interface QuotationPreviewProps {
  data: QuotationData;
}

export interface QuotationPreviewTableProps {
  items: QuotationLineItem[];
  currency?: "INR" | "EUR" | "GBP" | "MYR" | "USD";
  gstType?: "IGST" | "CGST_SGST";
}
