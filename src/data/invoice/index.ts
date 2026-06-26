import { COMPANY } from "@/data/company";
import { InvoiceLineItem, InvoiceData } from "@/types/invoice";

export const DEFAULT_ITEMS: InvoiceLineItem[] = [
  { description: "", amount: "" },
];

export const DEFAULT_DATA: InvoiceData = {
  invoiceNo: "",
  date: "",
  utrNo: "",
  clientAddress: "",
  forProject: "Single Story Side Extension",
  items: DEFAULT_ITEMS,
  vatNo: "",
  bank: "",
  accountNo: "",
  sortCode: "",
  ownerAddress: COMPANY.address,
  ownerPhone: COMPANY.phones.join(" / "),
  ownerEmail: COMPANY.email,
  ownerWebsite: COMPANY.website,
};
