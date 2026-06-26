import { useState, useCallback } from "react";
import { getLogoBase64 } from "@/lib/logo";
import { printHtml } from "@/lib/print";

export function useDocumentEditor<TData extends { items: TItem[] }, TItem>(
  initialData: TData,
  createEmptyItem: () => TItem,
  buildHtml: (data: TData, logoBase64: string) => string,
) {
  const [data, setData] = useState<TData>(initialData);
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
      const logoBase64 = await getLogoBase64();
      const html = buildHtml(data, logoBase64);
      printHtml(html);
    } finally {
      setTimeout(() => setPrinting(false), 1500);
    }
  }, [data, buildHtml]);

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
