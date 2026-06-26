"use client";

import { useState } from "react";
import { COMPANY } from "@/data/company";
import {
  QuotationData,
  QuotationLineItem,
  PaymentTerm,
} from "@/types/quotation";
import { buildQuotationHtml } from "@/lib/quotationBuilder";
import { calcQuotationTotal } from "@/utils/quotation";
import { DEFAULT_PAYMENT_TERMS, DEFAULT_DATA } from "@/data/quotation";
import { useDocumentEditor } from "@/hooks/useDocumentEditor";
import { GeneratorHeader } from "@/components/GeneratorHeader";
import { FormInput } from "@/components/FormFields";
import { OwnerDetailsForm } from "@/components/OwnerDetailsForm";
import { ClientDetailsForm } from "@/components/ClientDetailsForm";
import { QuotationPreviewHeader } from "@/components/quotation/QuotationPreviewHeader";
import { QuotationPreviewClient } from "@/components/quotation/QuotationPreviewClient";
import { QuotationPreviewTable } from "@/components/quotation/QuotationPreviewTable";
import { QuotationPreviewFooter } from "@/components/quotation/QuotationPreviewFooter";
import { PaymentTermRowForm } from "@/components/quotation/PaymentTermRowForm";
import { QuotationItemRowForm } from "@/components/quotation/QuotationItemRowForm";
import { MobileTabBar } from "@/components/MobileTabBar";
import { Tab } from "@/types/forms";

import { usePaymentTerms } from "@/hooks/usePaymentTerms";

export default function QuotationPage() {
  const {
    data,
    setData,
    printing,
    setField,
    setItem,
    addItem,
    removeItem,
    handlePrint,
  } = useDocumentEditor<QuotationData, QuotationLineItem>(
    DEFAULT_DATA,
    () => ({ title: "", description: "", amount: "" }),
    buildQuotationHtml,
  );

  const { setPaymentTerm, addPaymentTerm, removePaymentTerm } = usePaymentTerms<
    QuotationData,
    PaymentTerm
  >(setData, DEFAULT_PAYMENT_TERMS, () => ({
    description: "",
    percentage: "",
  }));

  const totals = calcQuotationTotal(data?.items);

  const [activeTab, setActiveTab] = useState<Tab>("form");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <GeneratorHeader
        title="Quotation Generator"
        onPrint={handlePrint}
        printing={printing}
        accentClass="bg-gray-900 hover:bg-black"
      />
      <MobileTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-1 overflow-hidden">
        {/* ── FORM PANEL ── */}
        <aside
          className={`bg-white border-r border-gray-200 text-gray-800 sm:shrink-0 w-full transition-[width] duration-300 overflow-hidden ${sidebarOpen ? "sm:w-[260px] md:w-[320px] lg:w-[400px]" : "sm:w-0"} ${activeTab === "form" ? "flex flex-col" : "hidden"} sm:flex sm:flex-col`}>
          <div className="flex-1 overflow-y-auto p-5 space-y-5 min-w-[260px] md:min-w-[320px] lg:min-w-[400px]">
            <OwnerDetailsForm
              ownerAddress={data.ownerAddress || ""}
              ownerPhone={data.ownerPhone || ""}
              ownerEmail={data.ownerEmail || ""}
              ownerWebsite={data.ownerWebsite || COMPANY.website}
              onChangeField={(field, val) => setField(field, val)}
            />

            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">
                Quotation Details
              </h2>
              <div className="space-y-3">
                <FormInput
                  label="Quotation No."
                  placeholder="e.g. QT-001"
                  value={data.quotationNo}
                  onChange={(val) => setField("quotationNo", val)}
                />
                <FormInput
                  label="Date"
                  type="date"
                  value={data.date}
                  onChange={(val) => setField("date", val)}
                />
              </div>
            </section>

            <ClientDetailsForm
              clientAddress={data.clientAddress}
              forProject={data.forProject}
              projectLabel="For (Project Type)"
              projectPlaceholder="Double Storey Rear and Front Extension"
              onChangeField={(field, val) => setField(field, val)}
              totalLabel={data.totalLabel}
              onChangeTotalLabel={(val) => setField("totalLabel", val)}
            />

            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">
                Line Items
              </h2>
              <div className="space-y-3">
                {data?.items?.map((item, idx) => (
                  <QuotationItemRowForm
                    key={idx}
                    idx={idx}
                    item={item}
                    showRemove={data?.items?.length > 1}
                    onRemove={removeItem}
                    onChangeField={setItem}
                  />
                ))}
                <button
                  onClick={addItem}
                  className="w-full border border-dashed border-gray-300 text-gray-600 hover:bg-gray-50 text-sm py-2 rounded-lg transition-colors font-medium cursor-pointer">
                  + Add Item
                </button>
              </div>
              {/* Total */}
              <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-800">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Total Cost</span>
                  <span>
                    {totals?.total > 0
                      ? `£${totals?.total?.toLocaleString("en-GB", {
                          minimumFractionDigits: 2,
                        })}`
                      : "—"}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  N.B. Subject to standard rate of VAT @ 20%
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">
                Payment Terms
              </h2>
              <div className="space-y-2">
                {(data?.paymentTerms || DEFAULT_PAYMENT_TERMS)?.map(
                  (term, idx) => (
                    <PaymentTermRowForm
                      key={idx}
                      idx={idx}
                      term={term}
                      showRemove={
                        (data?.paymentTerms || DEFAULT_PAYMENT_TERMS)?.length >
                        1
                      }
                      onRemove={removePaymentTerm}
                      onChangeField={setPaymentTerm}
                    />
                  ),
                )}
                <button
                  onClick={addPaymentTerm}
                  className="w-full border border-dashed border-gray-300 text-gray-600 hover:bg-gray-50 text-xs py-2 rounded-lg transition-colors font-medium cursor-pointer">
                  + Add Payment Term
                </button>
              </div>
            </section>
          </div>
        </aside>

        {/* ── A4 PREVIEW PANEL ── */}
        <main
          className={`flex-1 overflow-auto bg-gray-150 p-1 sm:p-4 lg:p-8 relative ${activeTab === "preview" ? "block" : "hidden"} sm:block`}
          style={{ touchAction: "pan-x pan-y pinch-zoom" }}>
          {/* Desktop Sidebar Toggle Button */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="hidden sm:flex absolute left-4 top-4 z-20 bg-white border border-gray-200 shadow-md p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all cursor-pointer items-center justify-center"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}>
            {sidebarOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <div
            className="mx-auto"
            style={{
              width: "794px",
              minHeight: "1123px",
              background: "#fff",
              boxShadow: "0 4px 32px rgba(0,0,0,0.12)",
              padding: "45px 53px",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "10pt",
              color: "#111",
              flexShrink: 0,
            }}>
            <QuotationPreviewHeader data={data} />
            <QuotationPreviewClient data={data} />
            <QuotationPreviewTable
              items={data?.items}
              totalLabel={data?.totalLabel}
              totals={totals}
            />
            <QuotationPreviewFooter data={data} />
          </div>
        </main>
      </div>
    </div>
  );
}
