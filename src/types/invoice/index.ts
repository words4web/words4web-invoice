export interface InvoiceLineItem {
  description: string;
  gstRate: string; // e.g. "0" or "18"
  qty: string;
  rate: string;
  isNegative?: boolean;
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  dueDate: string;
  clientAddress: string;
  countryOfSupply: string;
  items: InvoiceLineItem[];
  currency?: "INR" | "EUR" | "GBP";

  // Bank details
  bank: string;
  accountName: string;
  accountNo: string;
  ifsc: string;
  accountType: string;
  upiId: string;
  qrCode?: string;

  // Terms & Conditions
  termsAndConditions: string;

  // Owner details (editable)
  ownerAddress?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerWebsite?: string;
}

export interface InvoicePreviewProps {
  data: InvoiceData;
}

export interface InvoicePreviewTableProps {
  items: InvoiceLineItem[];
  currency?: "INR" | "EUR" | "GBP";
}
