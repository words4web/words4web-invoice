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
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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

      {/* Document Listing Wrapper */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible">
        {/* ── MOBILE CARD VIEW (xs, sm viewports) ── */}
        <div className="sm:hidden divide-y divide-gray-150">
          {filteredDocs?.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-sm">
              No matching documents found.
            </div>
          ) : (
            filteredDocs?.map((doc) => (
              <div
                key={doc?.id}
                className="p-4 flex flex-col gap-3 hover:bg-gray-50/50 transition-colors relative">
                {/* Header (Badge + Number + Options Button) */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
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

                  {/* Options Menu Button (Mobile) */}
                  <div className="relative shrink-0 overflow-visible">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === doc?.id ? null : doc?.id)
                      }
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-800 cursor-pointer"
                      title="Document Options">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>

                    {openMenuId === doc?.id && (
                      <>
                        <div
                          className="fixed inset-0 z-20 cursor-default"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 z-30 text-left">
                          <button
                            onClick={() => {
                              setOpenMenuId(null);
                              router.push(`/${doc?.type}?id=${doc?.id}`);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-blue-600 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setOpenMenuId(null);
                              onDuplicate(doc?.id);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
                            Duplicate
                          </button>
                          <button
                            onClick={() => {
                              setOpenMenuId(null);
                              onDelete(doc?.id, doc?.number);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-red-650 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Details (Client, Date, ID metadata) */}
                <div className="text-xs text-gray-500 font-medium flex flex-col gap-1">
                  <div>
                    <span className="text-gray-400">Client:</span>{" "}
                    {getFirstLine(doc?.clientAddress)}
                  </div>
                  <div>
                    <span className="text-gray-400">Date:</span>{" "}
                    {doc?.date || "N/A"}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">
                    ID: {doc?.id.substring(0, 8)}... • Updated{" "}
                    {new Date(doc?.updatedAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Footer (Amount) */}
                <div className="flex justify-between items-center border-t border-gray-100 pt-2.5 mt-1">
                  <span className="text-xs text-gray-400 font-bold">
                    Amount
                  </span>
                  <span className="font-extrabold text-gray-900 text-sm">
                    {doc?.amount}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── TABLE VIEW (sm and up viewports) ── */}
        <div className="hidden sm:block overflow-visible">
          <table className="w-full text-left border-collapse text-gray-850">
            <thead>
              <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider font-bold border-b border-gray-150">
                <th className="py-4 px-6">Document</th>
                <th className="py-4 px-4 hidden md:table-cell">Client</th>
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
                    className="hover:bg-gray-50/50 transition-colors align-middle">
                    <td className="py-4 px-6 flex flex-col gap-1 justify-center min-h-[60px]">
                      <div className="flex items-center gap-2 flex-wrap">
                        {doc?.type === "invoice" ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-red-50 text-[#7A0000] border border-red-150 uppercase shrink-0">
                            Invoice
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-purple-50 text-[#8C52FF] border border-purple-150 uppercase shrink-0">
                            Quotation
                          </span>
                        )}
                        <span className="font-bold text-gray-900 text-sm truncate max-w-[150px] lg:max-w-[250px]">
                          {doc?.number}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        ID: {doc?.id.substring(0, 8)}... • Updated{" "}
                        {new Date(doc?.updatedAt).toLocaleDateString()}
                      </span>

                      {/* Tablet detail row (shown only on sm to md screens where client column is hidden) */}
                      <div className="hidden sm:block md:hidden mt-1 text-xs text-gray-500 font-medium truncate max-w-[220px]">
                        <span>
                          <span className="text-gray-400 font-semibold">
                            Client:
                          </span>{" "}
                          {getFirstLine(doc?.clientAddress)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 font-medium hidden md:table-cell align-middle">
                      <div
                        className="truncate max-w-[250px]"
                        title={doc?.clientAddress}>
                        {getFirstLine(doc?.clientAddress)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500 align-middle">
                      {doc?.date || "N/A"}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-gray-900 text-sm whitespace-nowrap align-middle">
                      {doc?.amount}
                    </td>
                    <td className="py-4 px-6 text-center relative overflow-visible align-middle">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === doc?.id ? null : doc?.id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-gray-500 hover:text-gray-800"
                        title="Document Options">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>

                      {/* Dropdown Menu (Desktop) */}
                      {openMenuId === doc?.id && (
                        <>
                          {/* Close backdrop click overlay */}
                          <div
                            className="fixed inset-0 z-20 cursor-default"
                            onClick={() => setOpenMenuId(null)}
                          />
                          <div className="absolute right-6 top-12 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 z-30 text-left">
                            <button
                              onClick={() => {
                                setOpenMenuId(null);
                                router.push(`/${doc?.type}?id=${doc?.id}`);
                              }}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-blue-600 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setOpenMenuId(null);
                                onDuplicate(doc?.id);
                              }}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                />
                              </svg>
                              Duplicate
                            </button>
                            <button
                              onClick={() => {
                                setOpenMenuId(null);
                                onDelete(doc?.id, doc?.number);
                              }}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-red-650 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </>
                      )}
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
