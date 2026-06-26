"use client";

import { useRef, useState } from "react";
import { COMPANY } from "@/data/company";
import { InvoiceData, InvoiceLineItem } from "@/types/invoice";
import { buildInvoiceHtml } from "@/lib/invoiceBuilder";
import { calcInvoiceTotals } from "@/utils/invoice";
import { GeneratorHeader } from "@/components/GeneratorHeader";
import { FormInput } from "@/components/FormFields";
import { OwnerDetailsForm } from "@/components/OwnerDetailsForm";
import { ClientDetailsForm } from "@/components/ClientDetailsForm";
import { BankDetailsForm } from "@/components/BankDetailsForm";
import { InvoicePreviewHeader } from "@/components/invoice/InvoicePreviewHeader";
import { InvoicePreviewClient } from "@/components/invoice/InvoicePreviewClient";
import { InvoicePreviewTable } from "@/components/invoice/InvoicePreviewTable";
import { InvoicePreviewFooter } from "@/components/invoice/InvoicePreviewFooter";
import { InvoiceItemRowForm } from "@/components/invoice/InvoiceItemRowForm";
import { useDocumentEditor } from "@/hooks/useDocumentEditor";
import { MobileTabBar } from "@/components/MobileTabBar";
import { Tab } from "@/types/forms";

import { DEFAULT_DATA } from "@/data/invoice";

export default function InvoicePage() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("form");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    data,
    printing,
    setField,
    setItem,
    addItem,
    removeItem,
    handlePrint,
  } = useDocumentEditor<InvoiceData, InvoiceLineItem>(
    DEFAULT_DATA,
    () => ({ description: "", amount: "" }),
    buildInvoiceHtml,
  );

  const totals = calcInvoiceTotals(data.items);

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <GeneratorHeader
        title="Invoice Generator"
        onPrint={handlePrint}
        printing={printing}
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
                Invoice Details
              </h2>
              <div className="space-y-3">
                <FormInput
                  label="Invoice No."
                  placeholder="e.g. INV-001"
                  value={data.invoiceNo}
                  onChange={(val) => setField("invoiceNo", val)}
                />
                <FormInput
                  label="Date"
                  type="date"
                  value={data.date}
                  onChange={(val) => setField("date", val)}
                />
                <FormInput
                  label="UTR No."
                  placeholder="Unique Tax Reference"
                  value={data.utrNo}
                  onChange={(val) => setField("utrNo", val)}
                />
              </div>
            </section>

            <ClientDetailsForm
              clientAddress={data.clientAddress}
              forProject={data.forProject}
              projectLabel="For (Project Description)"
              projectPlaceholder="Single Story Side Extension"
              onChangeField={(field, val) => setField(field, val)}
            />

            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">
                Line Items
              </h2>
              <div className="space-y-2">
                {data?.items?.map((item, idx) => (
                  <InvoiceItemRowForm
                    key={idx}
                    idx={idx}
                    item={item}
                    showRemove={(data?.items?.length || 0) > 1}
                    onRemove={() => removeItem(idx)}
                    onChangeField={(field, val) => setItem(idx, field, val)}
                  />
                ))}
                <button
                  onClick={addItem}
                  className="w-full border border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 text-sm py-2 rounded-lg transition-colors font-medium cursor-pointer">
                  + Add Item
                </button>
              </div>
              {/* Running totals */}
              <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1 text-sm text-gray-800">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>
                    £
                    {totals.subtotal.toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-550">VAT @ 20%</span>
                  <span>
                    £
                    {totals.vat.toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between font-bold border-t border-gray-200 pt-1 mt-1 text-gray-900">
                  <span>Amount Payable</span>
                  <span>
                    £
                    {totals.total.toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </section>

            <BankDetailsForm
              vatNo={data?.vatNo}
              bank={data?.bank}
              accountNo={data?.accountNo}
              sortCode={data?.sortCode}
              onChangeField={(field, val) => setField(field, val)}
            />
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
            ref={previewRef}
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
            <InvoicePreviewHeader data={data} />
            <InvoicePreviewClient data={data} />
            <InvoicePreviewTable items={data?.items} />
            <InvoicePreviewFooter data={data} />
          </div>
        </main>
      </div>
    </div>
  );
}
