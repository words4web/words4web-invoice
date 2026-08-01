import { SavedDocument } from "@/types/document";
import { InvoiceData } from "@/types/invoice";
import { QuotationData } from "@/types/quotation";

const STORAGE_KEY = "words4web_saved_docs";

export function getSavedDocuments(): SavedDocument[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed?.sort((a, b) => b?.updatedAt - a?.updatedAt);
  } catch (e) {
    console.error("Failed to parse saved documents", e);
    return [];
  }
}

export function saveDocument(
  doc: Omit<SavedDocument, "updatedAt">,
): SavedDocument[] {
  const docs = getSavedDocuments();
  const existingIndex = docs?.findIndex((d) => d?.id === doc?.id);
  const updatedDoc: SavedDocument = {
    ...doc,
    updatedAt: Date.now(),
  };

  if (existingIndex > -1) {
    docs[existingIndex] = updatedDoc;
  } else {
    docs.unshift(updatedDoc);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  return docs;
}

export function deleteDocument(id: string): SavedDocument[] {
  const docs = getSavedDocuments();
  const filtered = docs?.filter((d) => d?.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
}

export function getDocumentById(id: string): SavedDocument | undefined {
  return getSavedDocuments().find((d) => d.id === id);
}

export function duplicateDocument(id: string): SavedDocument[] {
  const docs = getSavedDocuments();
  const doc = docs?.find((d) => d?.id === id);
  if (!doc) return docs;

  const newId = crypto.randomUUID();
  const newNumber = `${doc?.number} (Copy)`;

  // Clone internal data and adjust copy numbers safely
  let newData: InvoiceData | QuotationData;
  if (doc?.type === "invoice") {
    const invoiceData = doc?.data as InvoiceData;
    newData = {
      ...invoiceData,
      id: newId,
      invoiceNo: `${invoiceData?.invoiceNo || ""} (Copy)`?.trim(),
    };
  } else {
    const quotationData = doc?.data as QuotationData;
    newData = {
      ...quotationData,
      id: newId,
      quotationNo: `${quotationData?.quotationNo || ""} (Copy)`?.trim(),
    };
  }

  const newDoc: SavedDocument = {
    ...doc,
    id: newId,
    number: newNumber,
    data: newData,
    updatedAt: Date.now(),
  };

  docs.unshift(newDoc);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  return docs;
}
