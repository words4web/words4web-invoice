import { useRouter } from "next/navigation";
import { GeneratorHeaderProps } from "@/types/forms";

export function GeneratorHeader({
  title,
  onPrint,
  printing,
  accentClass = "bg-[#0052cc] hover:bg-[#0747a6]",
}: GeneratorHeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <button
          onClick={() => router.push("/")}
          className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer shrink-0">
          ← Back
        </button>
        <span className="text-sm font-bold text-gray-800 truncate">
          {title}
        </span>
        <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
          💡 Tip: Disable &quot;Headers and footers&quot; in browser print
          settings for a clean PDF.
        </span>
      </div>
      <button
        onClick={onPrint}
        disabled={printing}
        className={`shrink-0 px-3 sm:px-5 py-2 disabled:opacity-60 text-white text-sm font-bold rounded-lg transition-colors shadow cursor-pointer ${accentClass}`}>
        <span className="hidden sm:inline">
          {printing ? "Opening Print..." : "Generate PDF"}
        </span>
        <span className="sm:hidden">{printing ? "⏳" : "🖨️ PDF"}</span>
      </button>
    </header>
  );
}
