"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-10">
      <Image
        src="/logo.png"
        alt="Live Constructions Ltd"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "450px", height: "auto" }}
        priority
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          id="btn-generate-invoice"
          onClick={() => router.push("/invoice")}
          className="px-8 py-3 bg-[#0052cc] hover:bg-[#0747a6] text-white font-bold rounded-lg text-sm tracking-wide transition-colors shadow">
          Generate Invoice
        </button>
        <button
          id="btn-generate-quotation"
          onClick={() => router.push("/quotation")}
          className="px-8 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-lg text-sm tracking-wide transition-colors shadow">
          Generate Quotation
        </button>
      </div>
    </div>
  );
}
