"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { COMPANY } from "@/data/company";
import { QuotationData, QuotationLineItem } from "@/types/quotation";
import { buildQuotationHtml } from "@/lib/quotationBuilder";
import { calcQuotationTotal } from "@/utils/quotation";
import { GeneratorHeader } from "@/components/GeneratorHeader";
import { FormInput, FormTextarea } from "@/components/FormFields";
import { OwnerDetailsForm } from "@/components/OwnerDetailsForm";
import { ClientDetailsForm } from "@/components/ClientDetailsForm";
import { BankDetailsForm } from "@/components/BankDetailsForm";
import { QuotationPreviewHeader } from "@/components/quotation/QuotationPreviewHeader";
import { QuotationPreviewClient } from "@/components/quotation/QuotationPreviewClient";
import { QuotationPreviewTable } from "@/components/quotation/QuotationPreviewTable";
import { QuotationPreviewFooter } from "@/components/quotation/QuotationPreviewFooter";
import { QuotationPreviewSummary } from "@/components/quotation/QuotationPreviewSummary";
import { QuotationItemRowForm } from "@/components/quotation/QuotationItemRowForm";
import { useDocumentEditor } from "@/hooks/useDocumentEditor";
import { MobileTabBar } from "@/components/MobileTabBar";
import { Tab } from "@/types/forms";

import { DEFAULT_DATA } from "@/data/quotation";

function QuotationPageClient() {
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
  } = useDocumentEditor<QuotationData, QuotationLineItem>(
    DEFAULT_DATA,
    () => ({ description: "", gstRate: "0", qty: "1", rate: "0" }),
    buildQuotationHtml,
  );

  const totals = calcQuotationTotal(data.items, data.currency);

  const currencySymbols: Record<string, string> = {
    INR: "₹",
    EUR: "€",
    GBP: "£",
  };
  const currentSymbol = currencySymbols[data.currency || "INR"] || "₹";

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <GeneratorHeader
        title="Quotation Generator"
        onPrint={handlePrint}
        printing={printing}
        accentClass="bg-[#7A0000] hover:bg-[#5c0000]"
      />
      <MobileTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-1 overflow-hidden">
        {/* ── FORM PANEL ── */}
        <aside
          className={`bg-white border-r border-gray-200 text-gray-800 sm:shrink-0 w-full transition-[width] duration-300 overflow-hidden ${sidebarOpen ? "sm:w-[260px] md:w-[320px] lg:w-[400px]" : "sm:w-0"} ${activeTab === "form" ? "flex flex-col" : "hidden"} sm:flex sm:flex-col`}>
          <div className="flex-1 overflow-y-auto p-5 space-y-5 min-w-[260px] md:min-w-[320px] lg:min-w-[400px]">
            <section className="bg-gray-50 border border-gray-150 rounded-lg p-3">
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Document Currency
                </label>
                <select
                  value={data.currency || "INR"}
                  onChange={(e) =>
                    setField(
                      "currency",
                      e.target.value as "INR" | "EUR" | "GBP",
                    )
                  }
                  className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#7A0000] text-gray-800 cursor-pointer font-medium mt-1.5">
                  <option value="INR">INR (₹) / GST Mode</option>
                  <option value="EUR">EUR (€) / VAT Mode</option>
                  <option value="GBP">GBP (£) / VAT Mode</option>
                </select>
              </div>
            </section>

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
                  placeholder="e.g. LC-May-05"
                  value={data.quotationNo}
                  onChange={(val) => setField("quotationNo", val)}
                />
                <FormInput
                  label="Quotation Date"
                  type="date"
                  value={data.date}
                  onChange={(val) => setField("date", val)}
                />
                <FormInput
                  label="Valid Till Date"
                  type="date"
                  value={data.validTillDate}
                  onChange={(val) => setField("validTillDate", val)}
                />
              </div>
            </section>

            <ClientDetailsForm
              clientAddress={data.clientAddress}
              onChangeField={(field, val) => setField(field, val)}
            />

            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">
                Supply Details
              </h2>
              <FormInput
                label="Country of Supply"
                placeholder="India"
                value={data.countryOfSupply}
                onChange={(val) => setField("countryOfSupply", val)}
              />
            </section>

            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">
                Line Items
              </h2>
              <div className="space-y-2">
                {data?.items?.map((item, idx) => (
                  <QuotationItemRowForm
                    key={idx}
                    idx={idx}
                    item={item}
                    showRemove={(data?.items?.length || 0) > 1}
                    onRemove={removeItem}
                    onChangeField={setItem}
                    currency={data.currency}
                  />
                ))}
                <button
                  onClick={addItem}
                  className="w-full border border-dashed border-[#7A0000] text-[#7A0000] hover:bg-[#7A0000]/5 text-sm py-2 rounded-lg transition-colors font-medium cursor-pointer">
                  + Add Item
                </button>
              </div>
              {/* Running totals */}
              <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1 text-sm text-gray-800">
                <div className="flex justify-between">
                  <span className="text-gray-550">Subtotal</span>
                  <span>{totals.fmtSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-550">
                    {data.currency === "INR" || !data.currency
                      ? "IGST Tax"
                      : "VAT Tax"}
                  </span>
                  <span>
                    {currentSymbol} {totals.fmtVat}
                  </span>
                </div>
                <div className="flex justify-between font-bold border-t border-gray-200 pt-1 mt-1 text-[#7A0000]">
                  <span>Total Amount</span>
                  <span>{totals.fmtTotal}</span>
                </div>
              </div>
            </section>

            <BankDetailsForm
              bank={data.bank}
              accountName={data.accountName}
              accountNo={data.accountNo}
              ifsc={data.ifsc}
              accountType={data.accountType}
              upiId={data.upiId}
              qrCode={data.qrCode}
              onChangeField={(field, val) => setField(field, val)}
            />

            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">
                Additional Notes
              </h2>
              <FormTextarea
                label="Notes text"
                rows={3}
                value={data.additionalNotes}
                onChange={(val) => setField("additionalNotes", val)}
              />
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
            className="hidden sm:flex absolute left-4 top-4 z-20 bg-white border border-gray-200 shadow-md p-2 rounded-lg text-gray-650 hover:text-gray-900 hover:bg-gray-50 transition-all cursor-pointer items-center justify-center"
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
              fontFamily: "'Open Sans', Arial, Helvetica, sans-serif",
              fontWeight: 300,
              fontSize: "9.5pt",
              color: "#111",
              flexShrink: 0,
            }}>
            <QuotationPreviewHeader data={data} />
            <QuotationPreviewClient data={data} />
            <QuotationPreviewTable
              items={data?.items}
              currency={data.currency}
            />
            <QuotationPreviewSummary data={data} />
            <QuotationPreviewFooter data={data} />
          </div>
        </main>
      </div>
    </div>
  );
}

const QuotationPage = dynamic(() => Promise.resolve(QuotationPageClient), {
  ssr: false,
});

export default QuotationPage;
