import React from "react";
import { InvoiceLineItem } from "./invoice";
import { PaymentTerm, QuotationLineItem } from "./quotation";

export type Tab = "form" | "preview";

export interface MobileTabBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export interface BankDetailsFormProps {
  vatNo: string;
  bank: string;
  accountNo: string;
  sortCode: string;
  onChangeField: (
    field: "vatNo" | "bank" | "accountNo" | "sortCode",
    value: string,
  ) => void;
}

export interface ClientDetailsFormProps {
  clientAddress: string;
  forProject: string;
  projectLabel: string;
  projectPlaceholder: string;
  onChangeField: (field: "clientAddress" | "forProject", value: string) => void;
  // Optional field specifically for Quotation page
  totalLabel?: string;
  onChangeTotalLabel?: (value: string) => void;
}

export interface OwnerDetailsFormProps {
  ownerAddress: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerWebsite: string;
  onChangeField: (
    field: "ownerAddress" | "ownerPhone" | "ownerEmail" | "ownerWebsite",
    value: string,
  ) => void;
}

export interface GeneratorHeaderProps {
  title: string;
  onPrint: () => void;
  printing: boolean;
  accentClass?: string;
}

export interface FormInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label: string;
  onChange: (value: string) => void;
}

export interface FormTextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> {
  label: string;
  onChange: (value: string) => void;
}

export interface InvoiceItemRowFormProps {
  idx: number;
  item: InvoiceLineItem;
  showRemove: boolean;
  onRemove: () => void;
  onChangeField: (field: keyof InvoiceLineItem, value: string) => void;
}

export interface PaymentTermRowFormProps {
  idx: number;
  term: PaymentTerm;
  showRemove: boolean;
  onRemove: (idx: number) => void;
  onChangeField: (idx: number, field: keyof PaymentTerm, value: string) => void;
}

export interface QuotationItemRowFormProps {
  idx: number;
  item: QuotationLineItem;
  showRemove: boolean;
  onRemove: (idx: number) => void;
  onChangeField: (
    idx: number,
    field: keyof QuotationLineItem,
    value: string,
  ) => void;
}
