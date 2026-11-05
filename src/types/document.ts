import { InvoiceData } from "./invoice";
import { QuotationData } from "./quotation";

export interface SavedDocument {
  id: string;
  type: "invoice" | "quotation";
  number: string;
  clientAddress: string;
  date: string;
  amount: string;
  currency: "INR" | "EUR" | "GBP" | "MYR" | "USD";
  data: InvoiceData | QuotationData;
  updatedAt: number;
}

export interface DocumentListProps {
  documents: SavedDocument[];
  onDelete: (id: string, name: string) => void;
  onDuplicate: (id: string) => void;
}
