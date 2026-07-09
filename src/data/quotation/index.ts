import { COMPANY } from "@/data/company";
import { QuotationLineItem, QuotationData } from "@/types/quotation";
import { getTodayStr } from "@/utils/date";

export const DEFAULT_ITEMS: QuotationLineItem[] = [
  { description: "Website Creation", gstRate: "0", qty: "1", rate: "45000" },
];

export const DEFAULT_DATA: QuotationData = {
  quotationNo: "LC-May-05",
  date: getTodayStr(),
  validTillDate: getTodayStr(),
  clientAddress:
    "Live Construction\n106 Valley Drive Gravesend,Kent DA12,SRX\nUnited Kingdom",
  countryOfSupply: "United Kingdom",
  items: DEFAULT_ITEMS,
  currency: "INR",
  bank: COMPANY.bank,
  accountName: COMPANY.accountName,
  accountNo: COMPANY.accountNo,
  ifsc: COMPANY.ifsc,
  accountType: COMPANY.accountType,
  upiId: COMPANY.upiId,
  additionalNotes:
    "If you agree with this quotation kindly send a signed acceptance on the shared attachment and the date of commencement of the services, which is from May 2026.",
  ownerAddress: COMPANY.address,
  ownerPhone: COMPANY.phones.join(" / "),
  ownerEmail: COMPANY.email,
  ownerWebsite: COMPANY.website,
};
