import { COMPANY } from "@/data/company";
import { InvoiceLineItem, InvoiceData } from "@/types/invoice";
import { getTodayStr } from "@/utils/date";

export const DEFAULT_ITEMS: InvoiceLineItem[] = [
  {
    description: "Monthly Digital Marketing Services.",
    gstRate: "0",
    qty: "1",
    rate: "130000",
  },
];

export const DEFAULT_DATA: InvoiceData = {
  invoiceNo: "DSF-2026-005",
  date: getTodayStr(),
  dueDate: getTodayStr(),
  clientAddress: "DSF Food Private\nLimited.\nHaryana,Panipat",
  countryOfSupply: "India",
  items: DEFAULT_ITEMS,
  currency: "INR",
  bank: COMPANY.bank,
  accountName: COMPANY.accountName,
  accountNo: COMPANY.accountNo,
  ifsc: COMPANY.ifsc,
  accountType: COMPANY.accountType,
  upiId: COMPANY.upiId,
  termsAndConditions:
    "1. Please pay within 7 days from the date of invoice.\n2. Please quote invoice number when remitting funds.",
  ownerAddress: COMPANY.address,
  ownerPhone: COMPANY.phones.join(" / "),
  ownerEmail: COMPANY.email,
  ownerWebsite: COMPANY.website,
};
