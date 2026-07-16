export interface QuotationLineItem {
  description: string;
  gstRate: string; // e.g. "0" or "18"
  qty: string;
  rate: string;
  isNegative?: boolean;
}

export interface QuotationData {
  quotationNo: string;
  date: string;
  validTillDate: string;
  clientAddress: string;
  countryOfSupply: string;
  items: QuotationLineItem[];
  currency?: "INR" | "EUR" | "GBP";

  // Bank details
  bank: string;
  accountName: string;
  accountNo: string;
  ifsc: string;
  accountType: string;
  upiId: string;
  qrCode?: string;

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
  currency?: "INR" | "EUR" | "GBP";
}
