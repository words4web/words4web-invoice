"use client";

import { useRef, useState, useEffect } from "react";
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
import { QuotationPreviewRateCard } from "@/components/quotation/QuotationPreviewRateCard";
import { RateCardFormSection } from "@/components/quotation/RateCardFormSection";
import { useDocumentEditor } from "@/hooks/useDocumentEditor";
import { MobileTabBar } from "@/components/MobileTabBar";
import { Tab } from "@/types/forms";
import { getDocumentById, saveDocument } from "@/utils/storage";

import { DEFAULT_DATA } from "@/data/quotation";

function QuotationPageClient() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("form");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");

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
    () => ({ description: "", gstRate: "0", qty: "1", rate: "0" }),
    buildQuotationHtml,
    "/Words4Web-logo.png",
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      const doc = getDocumentById(id);
      if (doc && doc?.type === "quotation") {
        requestAnimationFrame(() => {
          setData(doc?.data as QuotationData);
        });
      }
    }
  }, [setData]);

  const handleSave = () => {
    const totals = calcQuotationTotal(data?.items, data?.currency);
    const numericTotal = totals?.total;

    const docId = data?.id || crypto.randomUUID();
    const updatedData = { ...data, id: docId };

    setData(updatedData);

    saveDocument({
      id: docId,
      type: "quotation",
      number: updatedData?.quotationNo || "Untitled Quotation",
      clientAddress: updatedData?.clientAddress || "",
      date: updatedData?.date || "",
      amount: totals?.fmtTotal,
      currency: updatedData?.currency || "INR",
      data: updatedData,
    });

    const newUrl = `${window.location.pathname}?id=${docId}`;
    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl,
    );

    setSaveStatus("saved");
    setTimeout(() => {
      setSaveStatus("idle");
    }, 2000);
  };

  const totals = calcQuotationTotal(
    data.items,
    data.currency,
    data.durationMonths,
  );

  const currencySymbols: Record<string, string> = {
    INR: "₹",
    EUR: "€",
    GBP: "£",
    MYR: "RM",
    USD: "$",
  };
  const currentSymbol = currencySymbols[data.currency || "INR"] || "₹";

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <GeneratorHeader
        title="Quotation Generator"
        onPrint={handlePrint}
        printing={printing}
        accentClass="bg-[#8C52FF] hover:bg-[#723df7]"
        onSave={handleSave}
        saveStatus={saveStatus}
      />
      <MobileTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-1 overflow-hidden">
        {/* ── FORM PANEL ── */}
        <aside
          className={`bg-white border-r border-gray-200 text-gray-800 sm:shrink-0 w-full transition-[width] duration-300 overflow-hidden ${sidebarOpen ? "sm:w-[260px] md:w-[320px] lg:w-[400px]" : "sm:w-0"} ${activeTab === "form" ? "flex flex-col" : "hidden"} sm:flex sm:flex-col`}>
          <div className="flex-1 overflow-y-auto p-5 space-y-5 min-w-[260px] md:min-w-[320px] lg:min-w-[400px]">
            <section className="bg-gray-50 border border-gray-150 rounded-lg p-3 space-y-3">
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Document Currency
                </label>
                <select
                  value={data.currency || "INR"}
                  onChange={(e) =>
                    setField(
                      "currency",
                      e.target.value as "INR" | "EUR" | "GBP" | "MYR" | "USD",
                    )
                  }
                  className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8C52FF] text-gray-800 cursor-pointer font-medium mt-1">
                  <option value="INR">INR (₹) / GST Mode</option>
                  <option value="EUR">EUR (€) / VAT Mode</option>
                  <option value="GBP">GBP (£) / VAT Mode</option>
                  <option value="MYR">MYR (RM) / SST Mode</option>
                  <option value="USD">USD ($) / Tax Mode</option>
                </select>
              </div>

              {(!data.currency || data.currency === "INR") && (
                <div className="flex flex-col space-y-1 pt-1 border-t border-gray-200/60">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      GST Type
                    </label>
                    <span className="text-[11px] font-semibold text-[#8C52FF] bg-purple-50 px-2 py-0.5 rounded">
                      {data.gstType === "CGST_SGST"
                        ? "CGST + SGST (Intra-State)"
                        : "IGST (Inter-State)"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 mt-1 bg-gray-200/70 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setField("gstType", "IGST")}
                      className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-all cursor-pointer text-center ${
                        !data.gstType || data.gstType === "IGST"
                          ? "bg-white text-[#8C52FF] shadow-sm font-bold"
                          : "text-gray-600 hover:text-gray-900"
                      }`}>
                      IGST (Inter-State)
                    </button>
                    <button
                      type="button"
                      onClick={() => setField("gstType", "CGST_SGST")}
                      className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-all cursor-pointer text-center ${
                        data.gstType === "CGST_SGST"
                          ? "bg-white text-[#8C52FF] shadow-sm font-bold"
                          : "text-gray-600 hover:text-gray-900"
                      }`}>
                      CGST + SGST
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {data.gstType === "CGST_SGST"
                      ? "Splits calculated GST 50/50 into CGST and SGST rows in summary."
                      : "Shows unified IGST row in summary."}
                  </p>
                </div>
              )}

              <div className="flex flex-col space-y-1 pt-1 border-t border-gray-200/60">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    Contract Duration (Months)
                  </label>
                  <span className="text-[11px] font-semibold text-[#8C52FF] bg-purple-50 px-2 py-0.5 rounded">
                    ×{data.durationMonths || 1}{" "}
                    {Number(data.durationMonths || 1) === 1
                      ? "month"
                      : "months"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="1"
                    value={data.durationMonths ?? 1}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setField(
                        "durationMonths",
                        isNaN(val) || val < 1 ? 1 : val,
                      );
                    }}
                    className="w-24 bg-white border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8C52FF] text-gray-900 font-semibold"
                  />
                  <div className="flex gap-1">
                    {[1, 3, 6, 12].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setField("durationMonths", preset)}
                        className={`px-2.5 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                          (data.durationMonths || 1) === preset
                            ? "bg-[#8C52FF] text-white border-[#8C52FF]"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}>
                        {preset}M
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Multiplies monthly rates by any custom number of months (1, 2,
                  3, 4, 5, 6...).
                </p>
              </div>

              {/* Summary Totals Visibility Toggle */}
              <div className="flex flex-col space-y-1 pt-1 border-t border-gray-200/60">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Summary Totals
                    </label>
                    <p className="text-[11px] text-gray-400">
                      Show or hide Subtotal, Tax/GST, and Total in quotation.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={data.showSummaryTotals !== false}
                    onClick={() =>
                      setField(
                        "showSummaryTotals",
                        data.showSummaryTotals === false ? true : false,
                      )
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#8C52FF] focus:ring-offset-2 ${
                      data.showSummaryTotals !== false
                        ? "bg-[#8C52FF]"
                        : "bg-gray-300"
                    }`}>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        data.showSummaryTotals !== false
                          ? "translate-x-5"
                          : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
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
                {(!data.currency || data.currency === "INR") &&
                data.gstType === "CGST_SGST" ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-550">CGST</span>
                      <span>{totals.fmtCgst}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-550">SGST</span>
                      <span>{totals.fmtSgst}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-gray-550">
                      {data.currency === "INR" || !data.currency
                        ? "IGST Tax"
                        : data.currency === "MYR"
                          ? "SST Tax"
                          : data.currency === "USD"
                            ? "Sales Tax"
                            : "VAT Tax"}
                    </span>
                    <span>
                      {currentSymbol} {totals.fmtVat}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t border-gray-200 pt-1 mt-1 text-[#7A0000]">
                  <span>Total Amount</span>
                  <span>{totals.fmtTotal}</span>
                </div>
              </div>
            </section>

            <RateCardFormSection
              showRateCard={data.showRateCard ?? false}
              rateCardTitle={
                data.rateCardTitle ?? "REVISION & ADDITIONAL SCOPE RATE CARD"
              }
              rateCardNote={data.rateCardNote ?? ""}
              rateCardItems={data.rateCardItems ?? []}
              currencySymbol={currentSymbol}
              onToggle={(show) => setField("showRateCard", show)}
              onTitleChange={(title) => setField("rateCardTitle", title)}
              onNoteChange={(note) => setField("rateCardNote", note)}
              onItemsChange={(items) => setField("rateCardItems", items)}
            />

            <BankDetailsForm
              bank={data.bank}
              accountName={data.accountName}
              accountNo={data.accountNo}
              ifsc={data.ifsc}
              accountType={data.accountType}
              upiId={data.upiId}
              qrCode={data.qrCode}
              paypalId={data.paypalId}
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
              gstType={data.gstType}
            />
            <QuotationPreviewRateCard
              showRateCard={data.showRateCard}
              rateCardTitle={data.rateCardTitle}
              rateCardNote={data.rateCardNote}
              rateCardItems={data.rateCardItems}
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
