import { useState, useCallback } from "react";
import { getLogoBase64, getSignatureBase64, getStampBase64 } from "@/lib/logo";
import { printHtml } from "@/lib/print";
import { getTodayStr } from "@/utils/date";

export function useDocumentEditor<
  TData extends { items: TItem[]; currency?: string },
  TItem,
>(
  initialData: TData,
  createEmptyItem: () => TItem,
  buildHtml: (
    data: TData,
    logoBase64: string,
    signatureBase64: string,
    stampBase64: string,
  ) => string,
  logoPath: string = "/logo.png",
) {
  const [data, setData] = useState<TData>(() => {
    const today = getTodayStr();
    const nextData = { ...initialData };

    if ("date" in nextData && typeof nextData.date === "string") {
      nextData.date = today;
    }
    if ("dueDate" in nextData && typeof nextData.dueDate === "string") {
      nextData.dueDate = today;
    }
    if (
      "validTillDate" in nextData &&
      typeof nextData.validTillDate === "string"
    ) {
      nextData.validTillDate = today;
    }

    return nextData;
  });
  const [printing, setPrinting] = useState(false);

  const setField = useCallback(
    <K extends keyof TData>(field: K, value: TData[K]) => {
      setData((d) => ({ ...d, [field]: value }));
    },
    [],
  );

  const setItem = useCallback(
    <K extends keyof TItem>(idx: number, field: K, value: TItem[K]) => {
      setData((d) => ({
        ...d,
        items: d?.items?.map((it, i) =>
          i === idx ? { ...it, [field]: value } : it,
        ) as TItem[],
      }));
    },
    [],
  );

  const addItem = useCallback(() => {
    setData((d) => ({
      ...d,
      items: [...d.items, createEmptyItem()],
    }));
  }, [createEmptyItem]);

  const removeItem = useCallback((idx: number) => {
    setData((d) => ({
      ...d,
      items:
        d?.items?.length > 1 ? d?.items?.filter((_, i) => i !== idx) : d?.items,
    }));
  }, []);

  const handlePrint = useCallback(async () => {
    setPrinting(true);
    try {
      const currency = data?.currency || "INR";
      const stampPath = currency === "INR" ? "/stamp.png" : "/uk_stamp.png";
      const [logoBase64, signatureBase64, stampBase64] = await Promise.all([
        getLogoBase64(logoPath),
        getSignatureBase64(),
        getStampBase64(stampPath),
      ]);
      const html = buildHtml(data, logoBase64, signatureBase64, stampBase64);
      printHtml(html);
    } finally {
      setTimeout(() => setPrinting(false), 1500);
    }
  }, [data, buildHtml, logoPath]);

  return {
    data,
    setData,
    printing,
    setField,
    setItem,
    addItem,
    removeItem,
    handlePrint,
  };
}
