# Project Context & History

This file tracks the context, architecture, decisions, and progress of the **Words4Web** Next.js Invoice & Quotation generator project.

---

## 1. Project Overview

- **Company:** Words4Web Limited Liability Partnership (LLP)
- **Entity Type:** Limited Liability Partnership (LLP)
- **Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, ESLint
- **Theme:** Purple, black, and white branding
- **Core Folder Location:** `/home/mazahir/projects/work/Words4Web Project/words4web_invoice`
- **Package Manager:** pnpm (installed via `pnpm i`)
- **Important Workflow Rule:** DO NOT run project builds (`npm run build`) after every small code change. Only run compilation/builds when requested or during the final verification step.

---

## 2. Business Info (Words4Web)

| Field        | Value                                                                              |
| ------------ | ---------------------------------------------------------------------------------- |
| Company Name | Words4Web Limited Liability Partnership (LLP)                                      |
| Entity Type  | Limited Liability Partnership (LLP)                                                |
| Address      | 5037.SSRF, Near City Center Mall Lavate Nagar, Nashik, Maharashtra, India - 422002 |
| Phone        | +91 70202 07611                                                                    |
| Email        | deepali@words4web.com                                                              |
| Website      | https://words4web.com                                                              |
| Bank         | Federal Bank                                                                       |
| Account Name | Words4Web                                                                          |
| Account No   | 12860200038225                                                                     |
| IFSC         | FDRL0001286                                                                        |
| Account Type | Current                                                                            |
| UPI ID       | 9765050101-2@ybl                                                                   |

---

## 3. Document Formats Understood

### 3.1 Invoice Format (Single Page)

The invoice PDF has this structure:

**Header (left):**

- Logo (top-left with house + "LIVE CONSTRUCTIONS LTD" + tagline "YOUR DREAMS, OUR AIMS")
- Company address, phone numbers, email

**Header (right):**

- Blue diagonal/triangle graphic element (top-right decorative)
- Large "INVOICE" title
- Invoice No: (editable)
- Date: (editable)
- UTR No: (editable)

**Client Section:**

- "Client Address:" (editable multi-line address)
- "For: [project description]" (e.g., "Single Story Side Extension") — editable

**Items Table:**
| DESCRIPTION | AMOUNT |
|---|---|
| (line items — editable rows) | £amount |
| VAT @ 20% | £auto-calculated |

**Footer row:**

- AMOUNT PAYABLE | £total

**Bottom:**

- VAT No: (editable)
- Company Registered in England and Wales No: 14326005
- Bank: (editable)
- A/C No: (editable)
- Sort Code: (editable)

---

### 3.2 Quotation Format (Multi-Page)

**Page 1 Header (same as invoice):**

- Logo + company address + phone/email (left)
- Blue decorative graphic + "QUOTATION" title (right)
- Quotation No: (editable)
- Date: (editable)

**Client + Project Section:**

- "Client Address:" (editable)
- "For: [project type]" (e.g., "Double Storey Rear and Front Extension") — editable

**Items Table (spans multiple pages):**
| DESCRIPTION | AMOUNT |
|---|---|
| Numbered items, each with title + detailed sub-text (e.g., "1) Protection: ...") | £amount or blank |
| ... | ... |
| TOTAL COST [project label] | £total |
| N.B Quotation is subject to standard rate of VAT @ 20% | (info row) |

**Payment Terms Section (last page):**

> _The terms of payment are as follows:_
>
> - Initial Payment at start of the project — 20%
> - Second payment due at DPC Level — 20%
> - Third payment due at ground floor wall Plate Level — 15%
> - Fourth payment due at the first-floor wall plate Level — 20%
> - Fourth payment at completion of the roof structure — 20%
> - Final payment due at Completion of our work — 5%

**Footer (every page):**

- VAT No: / Company Registered in England and Wales No: 14326005
- Page X of Y

---

## 4. Goal: PDF / Quotation Generator App

### What We Are Building

A web-based tool inside the Next.js app where the user can:

1. Choose document type: **Invoice** or **Quotation**
2. Fill in editable fields: client address, project name, invoice/quotation number, date, UTR No, line items, amounts, bank details, VAT No, etc.
3. Add/remove line items dynamically
4. Preview the document in an A4-formatted layout matching the original PDF design exactly
5. Click **"Generate PDF"** → the browser prints it as a pixel-perfect A4 PDF using the **Hidden Iframe + Browser Print** method (no backend, no Puppeteer)

### Approach: Frontend-Only PDF Generation (Hidden Iframe + Browser Print)

From `new uk client/implementation_plan.md`:

- The compiled HTML is injected into a hidden `<iframe>`
- `iframe.contentWindow.print()` is called — the browser's native PDF print engine renders it
- Uses `@media print { @page { size: A4; } }` to control print layout
- No server needed, no Puppeteer, no extra dependencies beyond browser APIs

### Key Architecture Points

- **Template Engine:** The document layout will be built as a React component with a print-specific CSS class applied
- **Print Styles:** `@media print` will hide all UI chrome and render only the A4 document
- **Fields:** All editable fields are controlled React state — no backend storage needed
- **Line Items:** Dynamic array of `{ description, amount }` pairs, add/remove rows supported
- **Totals:** VAT (20%) and Amount Payable auto-calculated from line item amounts
- **Multi-page Quotations:** CSS `page-break-inside: avoid` ensures items don't split awkwardly across pages

### Planned App Routes

| Route        | Purpose                                              |
| ------------ | ---------------------------------------------------- |
| `/`          | Dashboard & Document List (Words4Web)                |
| `/invoice`   | Invoice generator tool                               |
| `/quotation` | Quotation generator tool                             |

---

## 5. Work Completed

### Phase 1: Project Setup (June 22, 2026)

- Initialized Next.js 16 project directly in the workspace root using `create-next-app` (TypeScript, Tailwind v4, App Router, Src Layout).
- Transferred the company logo from `new uk client/logo.png` to [`public/logo.png`](file:///home/mazahir/projects/work/constructions_work/public/logo.png).
- Created a high-fidelity home page in [`src/app/page.tsx`](file:///home/mazahir/projects/work/constructions_work/src/app/page.tsx) with the business info (address, phone numbers, email) and services matching the client's PDFs.
- Defined the styling rules and variables in [`src/app/globals.css`](file:///home/mazahir/projects/work/constructions_work/src/app/globals.css) to support the black, blue, and white theme.
- Fixed React 19 / Next.js 16 build warnings:
  - JSX text escaping (`Let's` → `Let&apos;s`)
  - Added `"use client"` directive for event handler usage
- Removed CLI-generated `AGENTS.md` and `CLAUDE.md` and replaced with this `context.md` file.
- Verified successful builds (`npm run build`). ✅
- Installed dependencies with `pnpm i`. ✅

### Phase 2: Invoice & Quotation Generator (June 22, 2026) ✅

- [x] `src/lib/print.ts` — Hidden iframe print utility (matches implementation_plan.md Component 5)
- [x] `src/lib/documentStyles.ts` — Shared CSS string + company constants injected into iframe HTML
- [x] `src/lib/invoiceBuilder.ts` — Invoice data types + `buildInvoiceHtml()` + `calcInvoiceTotals()`
- [x] `src/lib/quotationBuilder.ts` — Quotation data types + `buildQuotationHtml()` + `calcQuotationTotal()`
- [x] `src/app/invoice/page.tsx` — Invoice generator (form + A4 live preview + Generate PDF button)
- [x] `src/app/quotation/page.tsx` — Quotation generator (form + A4 live preview + Generate PDF button)
- [x] Build verified: `npm run build` passes with all 4 routes (`/`, `/_not-found`, `/invoice`, `/quotation`)

**How PDF generation works:**

1. Logo is fetched and converted to base64 (so it renders inside the detached iframe)
2. `buildInvoiceHtml()` / `buildQuotationHtml()` produces a self-contained HTML string with inline CSS, A4 `@page` rules, and company branding
3. `printHtml()` injects the HTML into a HTML iframe and calls print()
4. User selects "Save as PDF" in the browser's print dialog → pixel-perfect A4 PDF

### Phase 3: Owner Details Edit, Numeric Amounts, and Print Adjustments (June 22, 2026) ✅

- [x] Made company details (address, phone, email) dynamic and editable on both the Invoice and Quotation page forms.
- [x] Restructured print layout and style builders (`invoiceBuilder.ts` and `quotationBuilder.ts`) to inject dynamic owner details.
- [x] Changed all line item amount inputs to use HTML5 `type="number"` (only permitting numeric digits and decimal points).
- [x] Darkened printed company text style by changing color style inside A4 previews and document stylesheets to solid `#000` (pure black) for maximum clarity.
- [x] Preserved white/light sidebar form layouts as requested by the user.
- [x] Added a helpful print tips banner in the generator header suggesting users disable the browser's default "Headers and footers" printing setting.
- [x] Changed the "For (Project Description)" and "For (Project Type)" fields to textareas to allow entering newlines, and ensured newlines are preserved in both the A4 preview (via `white-space: pre-wrap`) and printed outputs (via HTML `<br>` replacements).
- [x] Isolated scrolling between the form sidebar and main A4 preview panels by locking the parent container height to `h-screen overflow-hidden` instead of `min-h-screen`.
- [x] Designed custom elegant, thin scrollbars globally styled with a translucent soft blue color theme that darkens on hover, configured for both Webkit and Firefox.
- [x] Confirmed successful typescript compilation (`npm run build`).

### Phase 4: Modular Component Refactoring & Code Cleanup (June 22, 2026) ✅

- [x] Created `src/lib/logo.ts` static utility to fetch and cache logo base64 conversion.
- [x] Created `src/components/FormFields.tsx` exporting styled `FormInput` and `FormTextarea` elements to unify styling.
- [x] Created `src/components/GeneratorHeader.tsx` for shared page header top-bars.
- [x] Created `src/components/OwnerDetailsForm.tsx`, `src/components/ClientDetailsForm.tsx`, and `src/components/BankDetailsForm.tsx` to modularize form layout blocks.
- [x] Refactored `src/app/invoice/page.tsx` and `src/app/quotation/page.tsx` to use the new shared components, reducing their lines of code by over 50% and simplifying maintenance.
- [x] Confirmed successful compilation (`npm run build`).

### Phase 5: Website Support & Alignment Adjustments (June 23, 2026) ✅

- [x] Added website (`https://liveconstructionsltd.co.uk`) to hardcoded company data and invoice/quotation details.
- [x] Added Website input field dynamically populated with the default company website.
- [x] Center-aligned email and website rows vertically with their respective icons in both live previews and generated PDFs.
- [x] Updated project rule to avoid rebuilding after every change to save time.

### Phase 6: Types Folder Refactoring (June 23, 2026) ✅

- [x] Created `src/types/invoice/index.ts` and `src/types/quotation/index.ts` to separate core data interfaces.
- [x] Created `src/types/forms.ts` for UI form component prop interfaces.
- [x] Moved `InvoiceLineItem` and `InvoiceData` to the nested `types/invoice` folder.
- [x] Moved `QuotationLineItem`, `PaymentTerm`, and `QuotationData` to the nested `types/quotation` folder.
- [x] Relocated `BankDetailsFormProps`, `ClientDetailsFormProps`, `OwnerDetailsFormProps`, `GeneratorHeaderProps`, `FormInputProps`, and `FormTextareaProps` interfaces to `src/types/forms.ts`.
- [x] Moved `InvoicePreviewProps` and `InvoicePreviewTableProps` to `src/types/invoice/index.ts`.
- [x] Updated builders, forms, header, preview components, and page routes to import all interfaces from the new `types` location.

### Phase 7: Data Folder Refactoring (June 23, 2026) ✅

- [x] Created `src/data/quotation/index.ts` to manage static/default business values.
- [x] Created `src/data/invoice/index.ts` to manage default invoice configurations.
- [x] Created `src/data/company.ts` to store hardcoded/default company details.
- [x] Moved `DEFAULT_PAYMENT_TERMS` configuration to the quotation data file.
- [x] Moved the shared `COMPANY` details constant out of document styles and into the company data file.
- [x] Relocated `DEFAULT_ITEMS` and `DEFAULT_DATA` configurations out of `/invoice` and `/quotation` page files and into their respective data directories.
- [x] Updated builders and components to load all default static configurations from `@/data/quotation`, `@/data/invoice`, and `@/data/company`.

### Phase 8: Utils Folder Refactoring (June 23, 2026) ✅

- [x] Created nested utility folders `src/utils/invoice` and `src/utils/quotation`.
- [x] Relocated mathematical helpers `calcInvoiceTotals` and `calcQuotationTotal` into their respective utils directories.
- [x] Updated invoice and quotation builders and client pages to import calculation helpers from the new `utils` location.

### Phase 9: Invoice Preview & Form Component Refactoring (June 23, 2026) ✅

- [x] Created `src/components/invoice/` folder for modular sub-components.
- [x] Extracted invoice A4 live preview panel layout into distinct visual components: `InvoicePreviewHeader.tsx`, `InvoicePreviewClient.tsx`, `InvoicePreviewTable.tsx`, and `InvoicePreviewFooter.tsx`.
- [x] Extracted the invoice sidebar line item editor form block into a modular component `InvoiceItemRowForm.tsx`.
- [x] Simplified `src/app/invoice/page.tsx` page layout by mounting modular subcomponents.

### Phase 10: Multi-Currency & Dynamic Tax Support (July 9, 2026) ✅

- [x] Added `currency` selection field to `InvoiceData` and `QuotationData` models defaulting to `'INR'`.
- [x] Refactored `calcInvoiceTotals` and `calcQuotationTotal` to dynamically format currency values and symbols based on the selected currency (INR/`₹`, EUR/`€`, GBP/`£`, MYR/`RM`) and locale formatting guidelines.
- [x] Implemented a Document Currency dropdown selector positioned at the very top of the sidebar forms for both invoice and quotation generators.
- [x] Configured forms, interactive previews, and printed HTML templates to dynamically swap column headers and rows between **GST/IGST/TAX**, **VAT**, and **SST** when Malaysian Ringgit (`MYR`) or European currencies are selected.

### Phase 11: Revision & Additional Scope Rate Card (November 2, 2026) ✅

- [x] Added `RateCardItem` interface and optional rate card fields (`showRateCard`, `rateCardTitle`, `rateCardNote`, `rateCardItems`) to `QuotationData`.
- [x] Created `src/components/quotation/RateCardFormSection.tsx` with toggle switch, editable section title, policy description note, dynamic row add/delete, and custom rate inputs.
- [x] Created `src/components/quotation/QuotationPreviewRateCard.tsx` rendering an elegant, purple-accented rate card table and scope notes without impacting the primary quotation mathematical totals.
- [x] Updated `src/lib/quotationBuilder.ts` to output the rate card section seamlessly into browser print & PDF downloads.
- [x] Verified zero TypeScript compilation errors (`pnpm tsc --noEmit`).

### Phase 12: GST Mode Toggle (IGST vs CGST + SGST) (November 2, 2026) ✅

- [x] Added `gstType?: "IGST" | "CGST_SGST"` to `InvoiceData` and `QuotationData` models defaulting to `'IGST'`.
- [x] Updated `calcInvoiceTotals` and `calcQuotationTotal` to compute 50/50 split for `cgst` and `sgst` alongside formatted currency values (`fmtCgst`, `fmtSgst`).
- [x] Added interactive segmented toggle button in sidebar forms (`/invoice` and `/quotation`) visible when currency is `INR` (or default).
- [x] Updated `InvoicePreviewSummary.tsx` and `QuotationPreviewSummary.tsx` to render dedicated `CGST` and `SGST` summary rows when `gstType === "CGST_SGST"`.
- [x] Updated print & PDF builders (`invoiceBuilder.ts` and `quotationBuilder.ts`) to output `CGST` and `SGST` lines in the printed summary tables.
- [x] Verified zero TypeScript compilation errors (`pnpm tsc --noEmit`).

### Phase 13: Quotation Summary Totals Toggle (November 3, 2026) ✅

- [x] Added `showSummaryTotals?: boolean` to `QuotationData` interface, defaulting to `true`.
- [x] Added an interactive toggle switch in `src/app/quotation/page.tsx` under the Currency & Duration settings section.
- [x] Updated `src/components/quotation/QuotationPreviewSummary.tsx` to conditionally render the summary totals box (Subtotal, Tax/GST, and Total) according to `data.showSummaryTotals !== false`.
- [x] Updated `src/lib/quotationBuilder.ts` to reflect the same toggle in printed/exported PDF HTML output.
- [x] Verified zero TypeScript compilation errors (`pnpm tsc --noEmit`).

### Phase 14: USD ($) Currency Support with Tax Mode (November 5, 2026) ✅

- [x] Added `"USD"` to currency union types in `src/types/document.ts`, `src/types/invoice/index.ts`, `src/types/quotation/index.ts`, and `src/types/forms.ts`.
- [x] Updated `calcInvoiceTotals` and `calcQuotationTotal` to format with `$` symbol and `en-US` locale.
- [x] Added `<option value="USD">USD ($) / Tax Mode</option>` to document currency selector on both `/invoice` and `/quotation` pages.
- [x] Configured table headers to display `Tax %` and `Tax`, and summary to display `TAX` when `currency === "USD"`.
- [x] Updated `InvoicePreviewTable`, `QuotationPreviewTable`, `InvoiceItemRowForm`, `QuotationItemRowForm`, and `QuotationPreviewRateCard` with USD support.
- [x] Updated print & PDF builders (`invoiceBuilder.ts` and `quotationBuilder.ts`) with USD symbols, locale, and tax labels.
- [x] Verified zero TypeScript compilation errors (`pnpm tsc --noEmit`).

### Phase 15: GST Number & HSN in Bank Details (November 5, 2026) ✅

- [x] Added optional `gstNo?: string` and `hsnCode?: string` to `InvoiceData` and `QuotationData`.
- [x] Updated `BankDetailsForm` to include editable inputs for **GST Number** and **HSN**.
- [x] Standardized label to **HSN** across forms, previews, and PDF builders.
- [x] Updated `InvoicePreviewSummary.tsx` and `QuotationPreviewSummary.tsx` to conditionally render `GST No` and `HSN` rows inside the Bank Details table when provided.
- [x] Updated print builders (`invoiceBuilder.ts` and `quotationBuilder.ts`) to output `GST No` and `HSN` in printed/exported PDF HTML when provided.
- [x] Fixed loading of saved documents in `invoice/page.tsx` and `quotation/page.tsx` to safely merge `DEFAULT_DATA` and initialize missing `gstNo` and `hsnCode` keys with `""` so existing storage documents remain editable without controlled input lock.
- [x] Verified zero TypeScript compilation errors and production build passes cleanly (`pnpm build`).

### Phase 16: LLP Entity & Company Name Display (November 6, 2026) ✅

- [x] Updated default company legal entity name to `Words4Web LLP` in `src/data/company.ts` and `accountName` to `Words4Web LLP`.
- [x] Added `ownerName?: string;` to `InvoiceData`, `QuotationData`, and `OwnerDetailsFormProps`.
- [x] Added editable "Company / Entity Name" field to `OwnerDetailsForm` in invoice and quotation sidebar forms.
- [x] Updated "Billed By" (Invoice) and "Quotation From" (Quotation) preview and print builders to prominently render `ownerName` above website and address.
- [x] Updated Signatory section across live previews and PDF print builders to render `For ${ownerName}` and `Authorised Signatory`.
- [x] Reverted sample client address in `src/data/invoice/index.ts` to `"DSF Food Private\nLimited.\nHaryana,Panipat"`.
- [x] Verified zero TypeScript compilation errors (`pnpm tsc --noEmit`).

---

## 6. Assets Reference

| File                                     | Description                                                                               |
| ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| `public/logo.png`                        | Company logo (used in document header)                                                    |
| `new uk client/invoice pdf image.png`    | Screenshot of invoice PDF template                                                        |
| `new uk client/quotation pdf part 1.png` | Screenshot of quotation PDF page 1                                                        |
| `new uk client/quotation pdf part 2.png` | Screenshot of quotation PDF last page                                                     |
| `new uk client/invoice.pdf`              | Original invoice PDF                                                                      |
| `new uk client/quotation.pdf`            | Original quotation PDF                                                                    |
| `new uk client/WhatsApp Image*.jpg`      | Real printed invoice and quotation photos (show filled-in examples with real client data) |
