import { COMPANY } from "@/data/company";
import {
  PaymentTerm,
  QuotationLineItem,
  QuotationData,
} from "@/types/quotation";

export const DEFAULT_PAYMENT_TERMS: PaymentTerm[] = [
  { description: "Initial Payment at start of the project", percentage: "20%" },
  { description: "Second payment due at DPC Level", percentage: "20%" },
  {
    description: "Third payment due at ground floor wall Plate Level",
    percentage: "15%",
  },
  {
    description: "Fourth payment due at the first-floor wall plate Level",
    percentage: "20%",
  },
  {
    description: "Fourth payment at completion of the roof structure",
    percentage: "20%",
  },
  {
    description: "Final payment due at Completion of our work",
    percentage: "5%",
  },
];

export const DEFAULT_ITEMS: QuotationLineItem[] = [
  {
    title: "Protection",
    description:
      "Shuttering will be done wherever required around the area of extension. Please remove all the fragile and valuable items from the area of work.",
    amount: "",
  },
];

export const DEFAULT_DATA: QuotationData = {
  quotationNo: "",
  date: "",
  clientAddress: "",
  forProject: "Double Storey Rear and Front Extension",
  items: DEFAULT_ITEMS,
  totalLabel: "Side Double Story Extension",
  ownerAddress: COMPANY.address,
  ownerPhone: COMPANY.phones.join(" / "),
  ownerEmail: COMPANY.email,
  ownerWebsite: COMPANY.website,
  paymentTerms: DEFAULT_PAYMENT_TERMS,
};
