import { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentListProps } from "@/types/document";

export function DocumentList({
  documents,
  onDelete,
  onDuplicate,
}: DocumentListProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "invoice" | "quotation">(
    "all",
  );

  const getFirstLine = (text: string) => {
    if (!text) return "No Client Info";
    const line = text.split("\n")[0].trim();
    return line.length > 30 ? line.substring(0, 30) + "..." : line;
  };

  const filteredDocs = documents?.filter((doc) => {
    const matchesSearch =
      (doc?.number || "").toLowerCase().includes(search?.toLowerCase()) ||
      (doc?.clientAddress || "").toLowerCase().includes(search?.toLowerCase());

    const matchesType = filterType === "all" ? true : doc?.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      {/* Filters and Search Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        {/* Type Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto">
          <button
            onClick={() => setFilterType("all")}
            className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${filterType === "all" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>
            All Docs
          </button>
          <button
            onClick={() => setFilterType("invoice")}
            className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${filterType === "invoice" ? "bg-white text-[#7A0000] shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>
            Invoices
          </button>
          <button
            onClick={() => setFilterType("quotation")}
            className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${filterType === "quotation" ? "bg-white text-[#8C52FF] shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>
            Quotations
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by doc no, client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Document Listing Card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-gray-850">
            <thead>
              <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider font-bold border-b border-gray-150">
                <th className="py-4 px-6">Document</th>
                <th className="py-4 px-4">Client</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4 text-right">Amount</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150">
              {filteredDocs?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-gray-500 text-sm">
                    No matching documents found.
                  </td>
                </tr>
              ) : (
                filteredDocs?.map((doc) => (
                  <tr
                    key={doc?.id}
                    className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        {doc?.type === "invoice" ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-red-50 text-[#7A0000] border border-red-150 uppercase">
                            Invoice
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-purple-50 text-[#8C52FF] border border-purple-150 uppercase">
                            Quotation
                          </span>
                        )}
                        <span className="font-bold text-gray-900 text-sm">
                          {doc?.number}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400">
                        ID: {doc?.id.substring(0, 8)}... • Updated{" "}
                        {new Date(doc?.updatedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 font-medium">
                      {getFirstLine(doc?.clientAddress)}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {doc?.date || "N/A"}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-gray-900 text-sm">
                      {doc?.amount}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() =>
                            router.push(`/${doc?.type}?id=${doc?.id}`)
                          }
                          className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1"
                          title="Edit Document">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => onDuplicate(doc?.id)}
                          className="text-gray-600 hover:text-gray-800 text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1"
                          title="Duplicate Document">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                            />
                          </svg>
                          <span>Duplicate</span>
                        </button>

                        <button
                          onClick={() => onDelete(doc?.id, doc?.number)}
                          className="text-red-600 hover:text-red-800 text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1"
                          title="Delete Document">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
