import React from "react";
import { InvoiceLineItem } from "./invoice";
import { QuotationLineItem } from "./quotation";

export type Tab = "form" | "preview";

export interface MobileTabBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export interface BankDetailsFormProps {
  bank: string;
  accountName: string;
  accountNo: string;
  ifsc: string;
  accountType: string;
  upiId: string;
  qrCode?: string;
  onChangeField: (
    field:
      | "bank"
      | "accountName"
      | "accountNo"
      | "ifsc"
      | "accountType"
      | "upiId"
      | "qrCode",
    value: string,
  ) => void;
}

export interface ClientDetailsFormProps {
  clientAddress: string;
  onChangeField: (field: "clientAddress", value: string) => void;
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
