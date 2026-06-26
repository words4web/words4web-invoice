export interface InvoiceLineItem {
  description: string;
  amount: string;
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  utrNo: string;
  clientAddress: string;
  forProject: string;
  items: InvoiceLineItem[];
  vatNo: string;
  bank: string;
  accountNo: string;
  sortCode: string;
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
}
