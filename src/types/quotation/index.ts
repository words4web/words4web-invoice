export interface QuotationLineItem {
  title: string;
  description: string;
  amount: string;
}

export interface PaymentTerm {
  description: string;
  percentage: string;
}

export interface QuotationData {
  quotationNo: string;
  date: string;
  clientAddress: string;
  forProject: string;
  items: QuotationLineItem[];
  totalLabel: string; // e.g. "Side Double Story Extension"
  ownerAddress?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerWebsite?: string;
  paymentTerms?: PaymentTerm[];
}

export interface QuotationPreviewProps {
  data: QuotationData;
}

export interface QuotationPreviewTableProps {
  items: QuotationLineItem[];
  totalLabel: string;
  totals: {
    total: number;
  };
}
