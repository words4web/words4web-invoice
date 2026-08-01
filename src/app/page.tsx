"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  getSavedDocuments,
  deleteDocument,
  duplicateDocument,
} from "@/utils/storage";
import { SavedDocument } from "@/types/document";
import { DocumentList } from "@/components/DocumentList";

export default function Home() {
  const router = useRouter();
  const [documents, setDocuments] = useState<SavedDocument[]>([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setDocuments(getSavedDocuments());
    });
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const updated = deleteDocument(id);
      setDocuments(updated);
    }
  };

  const handleDuplicate = (id: string) => {
    const updated = duplicateDocument(id);
    setDocuments(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* ── HEADER ── */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Words4Web"
            width={180}
            height={45}
            priority
            className="h-auto w-[150px] md:w-[180px]"
          />
          <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
          <span className="text-gray-500 font-medium text-sm hidden md:block">
            Document Management Dashboard
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/invoice")}
            className="px-5 py-2.5 bg-[#7A0000] hover:bg-[#5c0000] text-white text-sm font-bold rounded-lg tracking-wide transition-colors shadow cursor-pointer flex items-center gap-1.5">
            <span>+</span> New Invoice
          </button>
          <button
            onClick={() => router.push("/quotation")}
            className="px-5 py-2.5 bg-[#8C52FF] hover:bg-[#723df7] text-white text-sm font-bold rounded-lg tracking-wide transition-colors shadow cursor-pointer flex items-center gap-1.5">
            <span>+</span> New Quotation
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        {/* Quick Creator / Welcome Banner */}
        {documents?.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center flex flex-col items-center justify-center shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4 font-bold">
              📄
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Create your first document
            </h2>
            <p className="text-gray-500 text-sm max-w-md mb-6">
              Generate custom professional invoices and quotations. They will
              automatically be saved here to your browser storage.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/invoice")}
                className="px-5 py-2.5 bg-[#7A0000] hover:bg-[#5c0000] text-white text-sm font-bold rounded-lg transition-colors cursor-pointer">
                Create Invoice
              </button>
              <button
                onClick={() => router.push("/quotation")}
                className="px-5 py-2.5 bg-[#8C52FF] hover:bg-[#723df7] text-white text-sm font-bold rounded-lg transition-colors cursor-pointer">
                Create Quotation
              </button>
            </div>
          </div>
        )}

        {documents?.length > 0 && (
          <DocumentList
            documents={documents}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />
        )}
      </main>
    </div>
  );
}
